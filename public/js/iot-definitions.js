// DEFINITIONS FOR RIGHT-SIDE PANEL
const definitions = {
  "smart-home": "Go Time builds full smart home systems: lighting control, door sensors, motion detection, temperature monitoring, and custom dashboards that show everything in real time.",
  "security": "Security systems include motion alerts, presence detection, vibration sensors, door/window triggers, and silent notifications sent directly to your phone or dashboard.",
  "automation": "Automation systems trigger actions based on conditions: lights turning on when you enter, fans activating at certain temperatures, or alerts firing when something changes.",
  "environment": "Environmental monitoring tracks temperature, humidity, air quality, sound levels, and more — perfect for homes, shops, warehouses, and vehicles.",
  "remote-control": "Remote control systems let you activate devices from anywhere: motors, pumps, lights, relays, fans, and custom hardware.",
  
  "touch-panels": "Touchscreen control panels allow you to manage your entire system from one interface — custom UI, animations, and real-time data.",
  "portable-devices": "Portable devices include handheld scanners, mini dashboards, pocket tools, and custom electronics built for mobility.",
  "wireless-cams": "Wireless camera systems stream video to your dashboard, phone, or control panel — perfect for security, vehicles, and robotics.",
  "vehicle-security": "Vehicle security systems detect presence, motion, vibration, and unauthorized access — with instant alerts and remote control.",
  "wearables": "Wearable electronics include trackers, sensors, and custom devices that monitor movement, environment, or user activity.",
  
  "prototype": "Go Time helps inventors turn ideas into real working prototypes — from planning to hardware to software to testing.",
  "custom-sensors": "Custom sensor builds include laser trip lines, radar presence detection, vibration sensors, sound sensors, and more.",
  "logic-systems": "Automation logic systems allow your invention to react intelligently to inputs, conditions, and triggers.",
  "dashboards": "Dashboard interfaces show live data, controls, alerts, and system status — fully custom and cinematic.",
  "hardware-design": "Hardware design includes enclosures, mounts, housings, and custom-built physical components for your invention."
};

// DROPDOWN TOGGLE
document.querySelectorAll(".dropdown-header").forEach(header => {
  header.addEventListener("click", () => {
    header.parentElement.classList.toggle("open");
  });
});

// RIGHT-SIDE DEFINITION SWITCHER
document.querySelectorAll("[data-item]").forEach(item => {
  item.addEventListener("click", () => {
    const key = item.getAttribute("data-item");
    const panel = document.getElementById("definition-text");
    panel.textContent = definitions[key] || "No definition available.";
  });
});
