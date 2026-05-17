let db;

const request = indexedDB.open("contactsDB", 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
};

request.onsuccess = e => db = e.target.result;

export function addContact(name, phone, email) {
  const tx = db.transaction("contacts", "readwrite");
  tx.objectStore("contacts").add({ name, phone, email });
}

export function getContacts(cb) {
  const tx = db.transaction("contacts", "readonly");
  const store = tx.objectStore("contacts");
  const req = store.getAll();
  req.onsuccess = () => cb(req.result);
}
