// automation.js — Go-Time Edition

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: false });

const videoInput = document.getElementById("videoInput");
const convertBtn = document.getElementById("convertBtn");
const statusBox = document.getElementById("status");
const progressBar = document.getElementById("progress");
const downloadLink = document.getElementById("downloadLink");

function setStatus(msg) {
  statusBox.textContent = msg;
}

function setProgress(value) {
  progressBar.style.width = value + "%";
}

convertBtn.onclick = async () => {
  if (!videoInput.files.length) {
    setStatus("Please upload a video file first.");
    return;
  }

  convertBtn.disabled = true;
  setStatus("Loading FFmpeg engine...");
  setProgress(10);

  await ffmpeg.load();

  const file = videoInput.files[0];
  ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));

  setStatus("Converting video → GIF...");
  setProgress(40);

  await ffmpeg.run(
    "-i", "input.mp4",
    "-vf", "fps=12,scale=480:-1:flags=lanczos",
    "-loop", "0",
    "output.gif"
  );

  setStatus("Finalizing...");
  setProgress(80);

  const data = ffmpeg.FS("readFile", "output.gif");
  const blob = new Blob([data.buffer], { type: "image/gif" });
  const url = URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = "converted.gif";
  downloadLink.style.display = "inline-block";

  setProgress(100);
  setStatus("Done! Your GIF is ready.");
  convertBtn.disabled = false;
};
