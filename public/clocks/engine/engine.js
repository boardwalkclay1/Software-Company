// GO TIME CLOCK ENGINE — shared by all clocks

function startClock(onTick) {
  function update() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secDeg = seconds * 6;
    const minDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours % 12) * 30 + minutes * 0.5;

    onTick({
      hourDeg,
      minDeg,
      secDeg,
      raw: now
    });
  }

  update();
  setInterval(update, 1000);
}
