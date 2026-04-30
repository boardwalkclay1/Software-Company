import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Path to your JSON "database"
const DB_PATH = path.join(__dirname, "data.json");

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, "[]");
}

// Submit route (form sends data here)
app.post("/submit", (req, res) => {
  const incoming = req.body;

  const existing = JSON.parse(fs.readFileSync(DB_PATH));
  existing.push({
    ...incoming,
    timestamp: Date.now()
  });

  fs.writeFileSync(DB_PATH, JSON.stringify(existing, null, 2));

  res.json({ success: true });
});

// Dashboard route (frontend dashboard fetches this)
app.get("/dashboard", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  res.json(data);
});

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// REQUIRED for Railway
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
