// automation.js — Go‑Time MAX Edition

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: false });

const fileInput = document.getElementById("videoInput");
const dropZone = document.getElementById("dropZone");
const convertGIF = document.getElementById("convertGIF");
const convertMP3 = document.getElementById("convertMP3");
const statusBox = document.getElementById("status");
const progressBar = document.getElementById("progress");
const downloadLink = document.getElementById("downloadLink");

function setStatus(msg) {
  statusBox.textContent = msg;
}

function setProgress(value) {
  progressBar.style.width = value + "%";
}

function getFile() {
  return fileInput.files[0] || dropZone.file;
}

// Drag & Drop
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  dropZone.classList.add("hover");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("hover");
});

dropZone.addEventListener("drop", e => {
  e.preventDefault();
  dropZone.classList.remove("hover");
  dropZone.file = e.dataTransfer.files[0];
  setStatus("File loaded: " + dropZone.file.name);
});

// Load FFmpeg once
async function loadFFmpeg() {
  if (!ffmpeg.isLoaded()) {
    setStatus("Loading FFmpeg engine...");
    setProgress(10);
    await ffmpeg.load();
  }
}

// Convert to GIF
convertGIF.onclick = async () => {
  const file = getFile();
  if (!file) return setStatus("Upload or drop a video first.");

  convertGIF.disabled = true;
  convertMP3.disabled = true;

  await loadFFmpeg();

  ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));
  setStatus("Converting to GIF...");
  setProgress(40);

  await ffmpeg.run(
    "-i", "input.mp4",
    "-vf", "fps=12,scale=480:-1:flags=lanczos",
    "-loop", "0",
    "output.gif"
  );

  setStatus("Compressing GIF...");
  setProgress(70);

  await ffmpeg.run(
    "-i", "output.gif",
    "-filter_complex", "split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
    "compressed.gif"
  );

  const data = ffmpeg.FS("readFile", "compressed.gif");
  const blob = new Blob([data.buffer], { type: "image/gif" });
  const url = URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = "converted.gif";
  downloadLink.style.display = "inline-block";

  setProgress(100);
  setStatus("GIF ready!");
  convertGIF.disabled = false;
  convertMP3.disabled = false;
};

// Convert to MP3
convertMP3.onclick = async () => {
  const file = getFile();
  if (!file) return setStatus("Upload or drop a video first.");

  convertGIF.disabled = true;
  convertMP3.disabled = true;

  await loadFFmpeg();

  ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));
  setStatus("Extracting audio...");
  setProgress(50);

  await ffmpeg.run("-i", "input.mp4", "-q:a", "0", "-map", "a", "audio.mp3");

  const data = ffmpeg.FS("readFile", "audio.mp3");
  const blob = new Blob([data.buffer], { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = "audio.mp3";
  downloadLink.style.display = "inline-block";

  setProgress(100);
  setStatus("MP3 ready!");
  convertGIF.disabled = false;
  convertMP3.disabled = false;
};
