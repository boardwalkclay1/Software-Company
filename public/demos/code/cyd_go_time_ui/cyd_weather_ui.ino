#include <TFT_eSPI.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();

float tempC = 22.4;
String weatherMain = "Clouds";
String weatherDesc = "broken clouds";

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
  tft.drawString("Weather", 160, 20);
}

void drawScreen() {
  tft.fillScreen(COL_BG);
  drawTopBar();

  tft.setTextColor(COL_YELLOW, COL_BG);
  tft.setTextDatum(MC_DATUM);
  tft.setTextSize(5);
  char buf[16];
  sprintf(buf, "%.1fC", tempC);
  tft.drawString(buf, 160, 110);

  tft.setTextColor(COL_TEXT, COL_BG);
  tft.setTextSize(2);
  tft.drawString(weatherMain, 160, 160);

  tft.setTextSize(1);
  tft.drawString(weatherDesc, 160, 180);
}

void setup() {
  tft.init();
  tft.setRotation(1);
  drawScreen();
}

void loop() {
  // Animate temp slightly
  static float dir = 1;
  tempC += 0.01 * dir;
  if (tempC > 23) dir = -1;
  if (tempC < 22) dir = 1;

  drawScreen();
  delay(60);
}
