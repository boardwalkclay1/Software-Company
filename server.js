// server.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------
// API: Click Tracking
// -----------------------------
const LOG_DIR = path.join(__dirname, "logs");
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

app.post("/api/track", (req, res) => {
  const event = req.body || {};
  const date = new Date().toISOString().slice(0, 10);
  const logFile = path.join(LOG_DIR, `events-${date}.log`);

  const line = JSON.stringify({
    ...event,
    receivedAt: new Date().toISOString()
  }) + "\n";

  fs.appendFile(logFile, line, (err) => {
    if (err) {
      console.error("Error writing log:", err);
      return res.status(500).json({ ok: false });
    }
    res.json({ ok: true });
  });
});

// -----------------------------
// API: IoT Modules (from JSON)
// -----------------------------
app.get("/api/iot-modules", (req, res) => {
  const filePath = path.join(__dirname, "public", "data", "iot-modules.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading iot-modules.json:", err);
      return res.status(500).json({ error: "Failed to load IoT modules" });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (parseErr) {
      console.error("Error parsing iot-modules.json:", parseErr);
      res.status(500).json({ error: "Invalid IoT modules JSON" });
    }
  });
});

// Fallback: send index.html for root
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Go Time Software server running on port ${PORT}`);
});
