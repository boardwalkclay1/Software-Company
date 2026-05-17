let db;

const req = indexedDB.open("voiceDB", 1);

req.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("recordings", { keyPath: "id", autoIncrement: true });
};

req.onsuccess = e => db = e.target.result;

export function saveRecording(blob) {
  const tx = db.transaction("recordings", "readwrite");
  tx.objectStore("recordings").add({ blob, created: Date.now() });
}

export function getRecordings(cb) {
  const tx = db.transaction("recordings", "readonly");
  const store = tx.objectStore("recordings");
  const req = store.getAll();
  req.onsuccess = () => cb(req.result);
}
