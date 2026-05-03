#include <WiFi.h>
#include <WebServer.h>
#include <TFT_eSPI.h>
#include <SPI.h>
#include <Preferences.h>

TFT_eSPI tft = TFT_eSPI();
WebServer server(80);
Preferences prefs;

// --------- STATE ---------
float tempC = 22.4;
String weatherMain = "Clouds";
String weatherDesc = "broken clouds";

float latVal = 0.0;
float lonVal = 0.0;
float headingDeg = 0.0;

bool hasFix = false;

// --------- COLORS ---------
#define COL_BG      TFT_BLACK
#define COL_PANEL   0x2104
#define COL_RED     TFT_RED
#define COL_TEXT    TFT_WHITE
#define COL_YELLOW  TFT_YELLOW

// --------- WIFI CONFIG ---------
const char *AP_SSID = "GoTime-CYD";
const char *AP_PASS = "12345678";

String homeSSID;
String homePASS;
bool homeWifiEnabled = false;

// --------- UI HELPERS ---------
void drawTopBar(const String &title) {
  tft.fillRect(0, 0, 320, 40, COL_PANEL);
  tft.drawLine(0, 40, 320, 40, COL_RED);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextDatum(ML_DATUM);
  tft.setTextSize(2);
  tft.drawString(title, 10, 20);
}

void drawPanel(int x, int y, int w, int h) {
  tft.fillRoundRect(x, y, w, h, 8, COL_PANEL);
  tft.drawRoundRect(x, y, w, h, 8, COL_RED);
}

void drawCompassNeedle(int cx, int cy, int len, float angleDeg) {
  float rad = angleDeg * 0.0174533;
  int ex = cx + len * sin(rad);
  int ey = cy - len * cos(rad);
  tft.drawLine(cx, cy, ex, ey, COL_YELLOW);
}

// --------- MAIN UI ---------
void drawMainUI() {
  tft.fillScreen(COL_BG);
  drawTopBar("Go Time Device");

  // Weather
  drawPanel(10, 50, 300, 60);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextSize(2);
  tft.drawString("Weather", 18, 58);
  tft.setTextSize(1);
  tft.setCursor(18, 80);
  tft.printf("Condition: %s", weatherMain.c_str());
  tft.setCursor(18, 94);
  tft.printf("Details: %s", weatherDesc.c_str());
  tft.setCursor(18, 108);
  tft.printf("Temp: %.1f C", tempC);

  // Location
  drawPanel(10, 120, 300, 60);
  tft.setTextSize(2);
  tft.drawString("Location", 18, 128);
  tft.setTextSize(1);
  if (hasFix) {
    tft.setCursor(18, 150);
    tft.printf("Lat: %.6f", latVal);
    tft.setCursor(18, 164);
    tft.printf("Lon: %.6f", lonVal);
  } else {
    tft.setCursor(18, 158);
    tft.print("Waiting for phone sync...");
  }

  // Compass
  drawPanel(10, 190, 300, 40);
  int cx = 160;
  int cy = 210;
  drawCompassNeedle(cx, cy, 20, headingDeg);
  tft.setCursor(200, 196);
  tft.printf("Heading: %.0f", headingDeg);
  tft.print((char)247);
}

// --------- HTTP HANDLERS ---------
void handleRoot() {
  String html = "<html><body style='font-family:sans-serif;background:#000;color:#fff;'>"
                "<h2>Go Time CYD</h2>"
                "<p>Device is running. Use the phone UI to send data.</p>"
                "</body></html>";
  server.send(200, "text/html", html);
}

void handleUpdate() {
  if (server.hasArg("lat"))     latVal = server.arg("lat").toFloat();
  if (server.hasArg("lon"))     lonVal = server.arg("lon").toFloat();
  if (server.hasArg("heading")) headingDeg = server.arg("heading").toFloat();
  if (server.hasArg("temp"))    tempC = server.arg("temp").toFloat();
  if (server.hasArg("main"))    weatherMain = server.arg("main");
  if (server.hasArg("desc"))    weatherDesc = server.arg("desc");

  hasFix = true;
  drawMainUI();

  server.send(200, "text/plain", "OK");
}

void handleSetWifi() {
  if (server.hasArg("ssid") && server.hasArg("pass")) {
    homeSSID = server.arg("ssid");
    homePASS = server.arg("pass");
    homeWifiEnabled = true;

    prefs.begin("wifi", false);
    prefs.putString("ssid", homeSSID);
    prefs.putString("pass", homePASS);
    prefs.putBool("enabled", true);
    prefs.end();

    server.send(200, "text/plain", "WiFi saved. Will connect next boot.");
  } else {
    server.send(400, "text/plain", "Missing ssid or pass");
  }
}

// --------- WIFI SETUP ---------
void startAP() {
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP(AP_SSID, AP_PASS);
}

void tryConnectHomeWifi() {
  prefs.begin("wifi", true);
  homeSSID = prefs.getString("ssid", "");
  homePASS = prefs.getString("pass", "");
  homeWifiEnabled = prefs.getBool("enabled", false);
  prefs.end();

  if (homeWifiEnabled && homeSSID.length() > 0) {
    WiFi.begin(homeSSID.c_str(), homePASS.c_str());
    unsigned long start = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - start < 8000) {
      delay(200);
    }
  }
}

// --------- SETUP / LOOP ---------
void setup() {
  Serial.begin(115200);

  tft.init();
  tft.setRotation(1);
  tft.fillScreen(COL_BG);

  startAP();
  tryConnectHomeWifi();

  server.on("/", handleRoot);
  server.on("/update", handleUpdate);
  server.on("/setWifi", handleSetWifi);
  server.begin();

  drawMainUI();
}

void loop() {
  server.handleClient();
  delay(10);
}
