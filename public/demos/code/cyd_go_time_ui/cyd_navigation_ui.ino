#include <TFT_eSPI.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();

float headingDeg = 0;
float latVal = 42.123456;
float lonVal = -83.123456;
float distToTarget = 120.0;

#define COL_BG      TFT_BLACK
#define COL_PANEL   0x2104
#define COL_RED     TFT_RED
#define COL_TEXT    TFT_WHITE
#define COL_YELLOW  TFT_YELLOW

void drawTopBar() {
  tft.fillRect(0, 0, 320, 40, COL_PANEL);
  tft.drawLine(0, 40, 320, 40, COL_RED);
  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setTextDatum(MC_DATUM);
  tft.setTextSize(2);
  tft.drawString("Navigation", 160, 20);
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

  // Compass panel
  drawPanel(10, 50, 300, 90);
  int cx = 160;
  int cy = 95;
  int radius = 35;

  tft.drawCircle(cx, cy, radius, COL_TEXT);
  tft.drawCentreString("N", cx, cy - radius - 10, 1);
  tft.drawCentreString("S", cx, cy + radius + 10, 1);
  tft.drawString("W", cx - radius - 15, cy, 1);
  tft.drawString("E", cx + radius + 5, cy, 1);

  drawCompassNeedle(cx, cy, radius - 5, headingDeg);

  tft.setTextColor(COL_TEXT, COL_PANEL);
  tft.setCursor(20, 120);
  tft.printf("Heading: %.0f", headingDeg);
  tft.print((char)247);

  // GPS panel
  drawPanel(10, 150, 300, 70);
  tft.setTextSize(2);
  tft.setCursor(18, 158);
  tft.print("GPS Info");

  tft.setTextSize(1);
  tft.setCursor(18, 178);
  tft.printf("Lat: %.6f", latVal);
  tft.setCursor(18, 192);
  tft.printf("Lon: %.6f", lonVal);
  tft.setCursor(18, 206);
  tft.printf("Dist to Target: %.1f m", distToTarget);
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
