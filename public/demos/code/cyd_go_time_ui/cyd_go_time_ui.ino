/*
  Go Time Software – ESP32 CYD UI
  MAIN / WEATHER / NAVIGATION screens
  Board: ESP32-2432S028 / CYD with TFT_eSPI configured for 320x240

  Requirements:
  - Library: TFT_eSPI (configured for your CYD board in User_Setup)
  - Optional: real GPS, sensors, WiFi, etc. (currently mocked)
*/

#include <TFT_eSPI.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();

// --------- UI STATE ----------
enum ScreenMode {
  SCREEN_MAIN,
  SCREEN_WEATHER,
  SCREEN_NAV
};

ScreenMode currentScreen = SCREEN_MAIN;
unsigned long lastSwitch = 0;
const unsigned long SCREEN_INTERVAL = 8000; // auto-rotate every 8s

// --------- DEMO DATA (REPLACE WITH REAL SENSORS LATER) ----------
float demoTempC = 22.4;
String demoWeatherMain = "Clouds";
String demoWeatherDesc = "broken clouds";

float demoLat = 42.123456;
float demoLon = -83.123456;
float demoDistToTarget = 120.0;

float headingDeg = 0.0;

// --------- COLORS ----------
#define COL_BG      TFT_BLACK
#define COL_PANEL   0x2104  // dark gray
#define COL_RED     TFT_RED
#define COL_TEXT    TFT_WHITE
#define COL_YELLOW  TFT_YELLOW

// --------- LAYOUT HELPERS ----------
void drawTopBar(const String &title) {
  tft.fillRect(0, 0, 320, 40, COL_PANEL);
  tft.drawLine(0, 40, 320, 40, COL_RED);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextDatum(ML_DATUM);
  tft.setFreeFont(NULL);
  tft.setTextSize(2);
  tft.drawString(title, 10, 20);
}

void drawPanel(int x, int y, int w, int h) {
  tft.fillRoundRect(x, y, w, h, 8, COL_PANEL);
  tft.drawRoundRect(x, y, w, h, 8, COL_RED);
}

// --------- MAIN SCREEN ----------
void drawMainScreen() {
  tft.fillScreen(COL_BG);
  drawTopBar("Go Time Device");

  // Weather panel
  drawPanel(10, 50, 300, 60);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextSize(2);
  tft.setCursor(18, 58);
  tft.print("Weather");
  tft.setTextSize(1);
  tft.setCursor(18, 80);
  tft.printf("Condition: %s", demoWeatherMain.c_str());
  tft.setCursor(18, 94);
  tft.printf("Details: %s", demoWeatherDesc.c_str());
  tft.setCursor(18, 108);
  tft.printf("Temp: %.1f C", demoTempC);

  // Location panel
  drawPanel(10, 120, 300, 60);
  tft.setTextSize(2);
  tft.setCursor(18, 128);
  tft.print("Location");
  tft.setTextSize(1);
  tft.setCursor(18, 150);
  tft.printf("Lat: %.6f", demoLat);
  tft.setCursor(18, 164);
  tft.printf("Lon: %.6f", demoLon);
  tft.setCursor(18, 178);
  tft.print("Source: PHONE");

  // Compass panel
  drawPanel(10, 190, 300, 40);
  tft.setTextSize(2);
  tft.setCursor(18, 196);
  tft.print("Compass");
  tft.setTextSize(1);
  tft.setCursor(200, 196);
  tft.printf("Heading: %.0f", headingDeg);
  tft.print((char)247); // degree symbol
}

// --------- WEATHER SCREEN ----------
void drawWeatherScreen() {
  tft.fillScreen(COL_BG);
  drawTopBar("Weather");

  tft.setTextColor(COL_YELLOW, COL_BG);
  tft.setTextDatum(MC_DATUM);
  tft.setTextSize(4);
  char buf[16];
  sprintf(buf, "%.1fC", demoTempC);
  tft.drawString(buf, 160, 110);

  tft.setTextColor(COL_TEXT, COL_BG);
  tft.setTextSize(2);
  tft.drawString(demoWeatherMain, 160, 150);
  tft.setTextSize(1);
  tft.drawString(demoWeatherDesc, 160, 170);
}

// --------- NAVIGATION SCREEN ----------
void drawCompassNeedle(int cx, int cy, int len, float angleDeg) {
  float rad = angleDeg * 3.14159265 / 180.0;
  int ex = cx + len * sin(rad);
  int ey = cy - len * cos(rad);

  tft.drawLine(cx, cy, ex, ey, COL_YELLOW);
}

void drawNavScreen() {
  tft.fillScreen(COL_BG);
  drawTopBar("Navigation");

  // Compass panel
  drawPanel(10, 50, 300, 90);
  int cx = 160;
  int cy = 95;
  int radius = 35;

  // Compass circle
  tft.drawCircle(cx, cy, radius, COL_TEXT);
  tft.drawCentreString("N", cx, cy - radius - 10, 1);
  tft.drawCentreString("S", cx, cy + radius + 2, 1);
  tft.drawString("W", cx - radius - 10, cy, 1);
  tft.drawString("E", cx + radius + 4, cy, 1);

  // Needle
  drawCompassNeedle(cx, cy, radius - 5, headingDeg);

  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextSize(1);
  tft.setCursor(20, 120);
  tft.printf("Heading: %.0f", headingDeg);
  tft.print((char)247);

  // GPS panel
  drawPanel(10, 150, 300, 70);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextSize(2);
  tft.setCursor(18, 158);
  tft.print("GPS Info");
  tft.setTextSize(1);
  tft.setCursor(18, 178);
  tft.printf("Lat: %.6f", demoLat);
  tft.setCursor(18, 192);
  tft.printf("Lon: %.6f", demoLon);
  tft.setCursor(18, 206);
  tft.printf("Dist to Target: %.1f m", demoDistToTarget);
}

// --------- UPDATE / ANIMATION ----------
void updateDemoData() {
  // Simple demo motion
  headingDeg += 1.5;
  if (headingDeg >= 360.0) headingDeg -= 360.0;

  // Slight temp oscillation
  static float dir = 1.0;
  demoTempC += 0.01 * dir;
  if (demoTempC > 23.0) dir = -1.0;
  if (demoTempC < 22.0) dir = 1.0;
}

// Redraw current screen
void renderScreen() {
  switch (currentScreen) {
    case SCREEN_MAIN:    drawMainScreen();    break;
    case SCREEN_WEATHER: drawWeatherScreen(); break;
    case SCREEN_NAV:     drawNavScreen();     break;
  }
}

// --------- OPTIONAL: BUTTON TO SWITCH SCREENS ----------
const int BTN_PIN = 0; // adjust to your CYD button pin if available
bool lastBtnState = HIGH;

void checkButton() {
  int state = digitalRead(BTN_PIN);
  if (state == LOW && lastBtnState == HIGH) {
    // simple debounce delay
    delay(50);
    if (digitalRead(BTN_PIN) == LOW) {
      // cycle screen
      if (currentScreen == SCREEN_NAV) currentScreen = SCREEN_MAIN;
      else currentScreen = (ScreenMode)((int)currentScreen + 1);
      renderScreen();
    }
  }
  lastBtnState = state;
}

// --------- SETUP / LOOP ----------
void setup() {
  pinMode(BTN_PIN, INPUT_PULLUP);

  tft.init();
  tft.setRotation(1); // landscape 320x240
  tft.fillScreen(COL_BG);

  renderScreen();
  lastSwitch = millis();
}

void loop() {
  updateDemoData();

  // auto-rotate screens
  unsigned long now = millis();
  if (now - lastSwitch > SCREEN_INTERVAL) {
    if (currentScreen == SCREEN_NAV) currentScreen = SCREEN_MAIN;
    else currentScreen = (ScreenMode)((int)currentScreen + 1);
    renderScreen();
    lastSwitch = now;
  }

  checkButton();

  // small delay to reduce flicker / CPU
  delay(30);
}
