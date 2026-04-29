import fs from "fs";
import path from "path";

const BASE = "/mnt/data/json";

const files = [
  path.join(BASE, "forms.json")
];

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(BASE, { recursive: true });
}

files.forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
});

console.log("Storage initialized.");
