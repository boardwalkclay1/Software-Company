const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

document.getElementById("convertBtn").onclick = async () => {
  const fileInput = document.getElementById("videoInput");
  const status = document.getElementById("status");
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput.files.length) {
    status.textContent = "Please upload a video file.";
    return;
  }

  status.textContent = "Loading FFmpeg...";
  await ffmpeg.load();

  const videoFile = fileInput.files[0];
  ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));

  status.textContent = "Converting to GIF...";
  await ffmpeg.run("-i", "input.mp4", "output.gif");

  const data = ffmpeg.FS("readFile", "output.gif");
  const blob = new Blob([data.buffer], { type: "image/gif" });
  const url = URL.createObjectURL(blob);

  downloadLink.href = url;
  downloadLink.download = "converted.gif";
  downloadLink.style.display = "block";
  downloadLink.textContent = "Download GIF";

  status.textContent = "Conversion complete!";
};
