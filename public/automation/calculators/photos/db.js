let db;

const req = indexedDB.open("photoDB", 1);

req.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("photos", { keyPath: "id", autoIncrement: true });
};

req.onsuccess = e => db = e.target.result;

export function savePhoto(blob) {
  const tx = db.transaction("photos", "readwrite");
  tx.objectStore("photos").add({ blob, created: Date.now() });
}

export function getPhotos(cb) {
  const tx = db.transaction("photos", "readonly");
  const store = tx.objectStore("photos");
  const req = store.getAll();
  req.onsuccess = () => cb(req.result);
}
