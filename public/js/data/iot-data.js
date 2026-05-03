/* ============================================================
   GO TIME SOFTWARE — IoT Definitions Engine
   Powers the right‑side definition panel on /pages/iot.html
   Every item is fully detailed, cinematic, and client‑ready.
============================================================ */

const IOT_DEFINITIONS = {
  /* ============================
     COMMON SMART BUILDS
  ============================ */
  "smart-home": {
    title: "Smart Home Systems",
    text: `
      Go Time smart home systems give you full control over your environment —
      lights, outlets, doors, sensors, and routines — all from a clean,
      cinematic dashboard. These systems are built with reliability in mind,
      using relays, sensors, and automation logic that respond instantly.
      <br><br>
      Perfect for homes, apartments, Airbnbs, and rental properties.
    `
  },

  "security": {
    title: "Security & Alerts",
    text: `
      Real‑time alerts for motion, doors, windows, vibration, sound, and
      presence detection. Go Time security systems use laser trip sensors,
      microwave radar, PIR motion, and door contacts to detect activity
      instantly. Alerts can be sent to your phone, dashboard, or email.
      <br><br>
      Ideal for homes, garages, shops, and warehouses.
    `
  },

  "automation": {
    title: "Automation & Triggers",
    text: `
      Automation logic that reacts to the world around you — lights that turn
      on when you enter a room, fans that activate when temperature rises,
      pumps that run on schedule, or alarms that trigger when thresholds are
      crossed. Everything is programmable and customizable.
    `
  },

  "environment": {
    title: "Environmental Monitoring",
    text: `
      Temperature, humidity, air quality, CO₂, VOCs, light levels, and more.
      Go Time environmental systems track your environment in real time and
      push data to a live dashboard. Alerts notify you when conditions become
      unsafe or unusual.
      <br><br>
      Great for greenhouses, server rooms, storage units, and workshops.
    `
  },

  "remote-control": {
    title: "Remote Device Control",
    text: `
      Control motors, relays, pumps, fans, heaters, and appliances from
      anywhere in the world. Go Time remote control systems use secure
      cloud‑linked commands with instant response times.
      <br><br>
      Perfect for automation, agriculture, HVAC, and equipment management.
    `
  },

  /* ============================
     ADVANCED CUSTOM BUILDS
  ============================ */
  "touch-panels": {
    title: "Touchscreen Panels",
    text: `
      Custom touchscreen interfaces built on ESP32, CYD, or Raspberry Pi.
      These panels can control entire systems — lighting, security, motors,
      sensors, and automation logic — all through a cinematic Go Time UI.
      <br><br>
      Includes animations, icons, pages, and real‑time data feeds.
    `
  },

  "portable-devices": {
    title: "Portable Devices",
    text: `
      Battery‑powered handheld devices with sensors, displays, GPS, Bluetooth,
      WiFi, and custom firmware. Built like real products — rugged, compact,
      and reliable.
      <br><br>
      Ideal for field tools, scanners, testers, and custom inventions.
    `
  },

  "wireless-cams": {
    title: "Wireless Camera Systems",
    text: `
      WiFi or RF‑based camera modules with live streaming, motion detection,
      cloud storage, and dashboard integration. Can be used for security,
      robotics, drones, or remote monitoring.
    `
  },

  "vehicle-security": {
    title: "Vehicle Security Systems",
    text: `
      GPS tracking, motion detection, tow‑away alerts, remote lockout relays,
      and real‑time map dashboards. Works for cars, trucks, bikes, trailers,
      and heavy equipment.
      <br><br>
      Built with anti‑tamper logic and backup power options.
    `
  },

  "wearables": {
    title: "Wearable Electronics",
    text: `
      Compact, lightweight electronics designed to be worn — fitness sensors,
      motion trackers, gesture controllers, and personal alert devices.
      <br><br>
      Includes Bluetooth, vibration motors, LEDs, and custom enclosures.
    `
  },

  /* ============================
     INVENTION & PROTOTYPE BUILDS
  ============================ */
  "prototype": {
    title: "Prototype Development",
    text: `
      Bring your idea to life. Go Time builds invention‑grade prototypes with
      sensors, displays, microcontrollers, enclosures, and full firmware.
      <br><br>
      Whether you have a sketch, a concept, or a full plan — we turn it into
      a working device.
    `
  },

  "custom-sensors": {
    title: "Custom Sensor Builds",
    text: `
      Need a sensor that doesn’t exist? Go Time can build it. From laser trip
      modules to vibration analyzers, radar presence sensors, and multi‑sensor
      fusion systems — everything is engineered to your exact needs.
    `
  },

  "logic-systems": {
    title: "Automation Logic Systems",
    text: `
      Custom logic engines that react to sensors, timers, schedules, and
      triggers. These systems can run entire workflows automatically without
      needing a server or cloud connection.
    `
  },

  "dashboards": {
    title: "Dashboard Interfaces",
    text: `
      Real‑time dashboards for phones, tablets, PCs, or wall‑mounted panels.
      Displays live sensor data, alerts, maps, charts, and device controls.
      <br><br>
      Built with cinematic Go Time UI styling.
    `
  },

  "hardware-design": {
    title: "Hardware & Enclosure Design",
    text: `
      Custom PCB design, 3D‑printed enclosures, laser‑cut housings, and
      product‑ready hardware layouts. Your device will look and feel like a
      real product — not a breadboard prototype.
    `
  }
};

/* ============================================================
   CLICK HANDLER — Updates the definition panel
============================================================ */

document.querySelectorAll("[data-item]").forEach(item => {
  item.addEventListener("click", () => {
    const key = item.getAttribute("data-item");
    const def = IOT_DEFINITIONS[key];

    const panel = document.getElementById("definition-text");
    const titleEl = document.querySelector(".definition-panel h3");

    if (def) {
      titleEl.innerHTML = def.title;
      panel.innerHTML = def.text;
    } else {
      titleEl.innerHTML = "Unknown Item";
      panel.innerHTML = "No information available.";
    }
  });
});

/* ============================================================
   DROPDOWN TOGGLE LOGIC
============================================================ */

document.querySelectorAll(".dropdown-header").forEach(header => {
  header.addEventListener("click", () => {
    header.parentElement.classList.toggle("open");
  });
});
