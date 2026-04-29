import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const DATA_DIR = "/mnt/data/json";
const FORMS_FILE = path.join(DATA_DIR, "forms.json");

// Ensure file exists
function load(file) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, "[]");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function save(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// FORM SUBMISSION → STORE IN JSON
app.post("/api/form", (req, res) => {
  const forms = load(FORMS_FILE);
  forms.push({
    ...req.body,
    timestamp: new Date().toISOString()
  });
  save(FORMS_FILE, forms);
  res.json({ ok: true });
});

// DASHBOARD → GET ALL FORM DATA
app.get("/api/dashboard", (req, res) => {
  const forms = load(FORMS_FILE);
  res.json(forms);
});

// STATIC FRONTEND
app.use(express.static("public"));

app.listen(process.env.PORT || 3000);
