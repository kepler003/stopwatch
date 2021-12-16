
class Stopwatch {
  constructor(elem) {
    this.stopwatch = elem;
  }

  renderTime({ minutes, seconds, centiseconds }) {
    const para = this.stopwatch.querySelector('.stopwatch__time--current');
    if (centiseconds < 10) centiseconds = '0' + centiseconds;
    if (seconds < 10)      seconds = '0' + seconds;
    if (minutes < 10)      minutes = '0' + minutes;
    para.textContent = `${minutes}:${seconds}:${centiseconds}`
  }
  
  getTimeFromMS(ms) {
    const centiseconds = Math.floor(Math.floor(ms / 10) % 100);
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(ms / 60000);
    return {
      centiseconds,
      seconds,
      minutes
    }
  }
}

const stopwatchElem = document.querySelector('.stopwatch');
new Stopwatch(stopwatchElem);