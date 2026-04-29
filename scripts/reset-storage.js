import fs from "fs";
import path from "path";

const BASE = "/mnt/data/json";

const targets = [
  path.join(BASE, "forms.json")
];

targets.forEach(file => {
  fs.writeFileSync(file, "[]");
});

console.log("Storage reset.");
