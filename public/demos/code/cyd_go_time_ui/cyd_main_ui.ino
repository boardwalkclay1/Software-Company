#include <TFT_eSPI.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();

// Demo data (replace with real sensors later)
float tempC = 22.4;
String weatherMain = "Clouds";
String weatherDesc = "broken clouds";

float latVal = 42.123456;
float lonVal = -83.123456;

float headingDeg = 0;

// Colors
#define COL_BG      TFT_BLACK
#define COL_PANEL   0x2104
#define COL_RED     TFT_RED
#define COL_TEXT    TFT_WHITE
#define COL_YELLOW  TFT_YELLOW

void drawTopBar() {
  tft.fillRect(0, 0, 320, 40, COL_PANEL);
  tft.drawLine(0, 40, 320, 40, COL_RED);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextDatum(ML_DATUM);
  tft.setTextSize(2);
  tft.drawString("Go Time Device", 10, 20);
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

void drawScreen() {
  tft.fillScreen(COL_BG);
  drawTopBar();

  // Weather panel
  drawPanel(10, 50, 300, 60);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextSize(2);
  tft.drawString("Weather", 18, 58);
  tft.setTextSize(1);
  tft.drawString("Condition: " + weatherMain, 18, 80);
  tft.drawString("Details: " + weatherDesc, 18, 94);
  tft.printf("Temp: %.1f C", tempC);

  // Location panel
  drawPanel(10, 120, 300, 60);
  tft.setTextSize(2);
  tft.drawString("Location", 18, 128);
  tft.setTextSize(1);
  tft.setCursor(18, 150);
  tft.printf("Lat: %.6f", latVal);
  tft.setCursor(18, 164);
  tft.printf("Lon: %.6f", lonVal);

  // Compass panel
  drawPanel(10, 190, 300, 40);
  int cx = 160;
  int cy = 210;
  drawCompassNeedle(cx, cy, 20, headingDeg);
  tft.setCursor(200, 196);
  tft.printf("Heading: %.0f", headingDeg);
  tft.print((char)247);
}

void setup() {
  tft.init();
  tft.setRotation(1);
  drawScreen();
}

void loop() {
  headingDeg += 1.5;
  if (headingDeg >= 360) headingDeg = 0;
  drawScreen();
  delay(60);
}
