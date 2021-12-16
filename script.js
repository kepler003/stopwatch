
class Stopwatch {
  constructor(elem) {
    this.stopwatch = elem;
    this.clock = this.stopwatch.querySelector('.stopwatch__time--current');
    this.startTime = null;
    this.curentTime = null;
    this.interval = null;
    // this.start();
  }

  // start() {
  //   this.startTime = Date.now();
  //   setInterval(() => {
  //     this.currentTime = Date.now();
  //     this.renderTime(this.getTimeFromMS(this.currentTime - this.startTime));
  //   }, 10);
  // }

  renderTime({ minutes, seconds, centiseconds }) {
    if (centiseconds < 10) centiseconds = '0' + centiseconds;
    if (seconds < 10)      seconds = '0' + seconds;
    if (minutes < 10)      minutes = '0' + minutes;
    this.clock.textContent = `${minutes}:${seconds}:${centiseconds}`
  }
  
  getTimeFromMS(ms) {
    const centiseconds = Math.floor(Math.floor(ms / 10) % 100);
    const seconds = Math.floor(Math.floor(ms / 1000) % 60);
    const minutes = Math.floor(Math.floor(ms / 60000) % 60);
    return {
      centiseconds,
      seconds,
      minutes
    }
  }
}

const stopwatchElem = document.querySelector('.stopwatch');
new Stopwatch(stopwatchElem);