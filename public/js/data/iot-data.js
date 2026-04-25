export const IOT_SHOWCASES = [
  {
    id: "esp32-cam",
    name: "ESP32 Camera Stream",
    description: "Live MJPEG stream with motion detection and event hooks.",
    stack: ["ESP32", "WebSocket", "JS Viewer"],
    preview: "../assets/iot/esp32-cam.png"
  },
  {
    id: "sensor-hub",
    name: "Sensor Hub",
    description: "Temp, humidity, door sensors, and MQTT dashboard.",
    stack: ["ESP32", "MQTT", "Workers"],
    preview: "../assets/iot/sensor-hub.png"
  },
  {
    id: "rfid-access",
    name: "RFID Access Control",
    description: "RFID reader + relay lock + cloud event logging.",
    stack: ["ESP32", "RFID", "Cloudflare"],
    preview: "../assets/iot/rfid.png"
  }
];
