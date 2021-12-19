
class Stopwatch {
  constructor(elem) {
    this.stopwatch = elem;
    this.clock = this.stopwatch.querySelector('.stopwatch__time--current');
    this.startBtn = this.stopwatch.querySelector('.stopwatch__btn--start');
    this.pauseBtn = this.stopwatch.querySelector('.stopwatch__btn--pause');
    this.markBtn = this.stopwatch.querySelector('.stopwatch__btn--mark');
    this.resetBtn = this.stopwatch.querySelector('.stopwatch__btn--reset');

    this.elapsedTime = null;
    this.interval = null;

    this.startBtn.addEventListener('click', () => this.start());
    this.resetBtn.addEventListener('click', () => this.reset())
  }

  start() {
    if (this.elapsedTime) return;
    const startTime = Date.now();
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      this.elapsedTime = currentTime - startTime;
      this.renderTime(this.getTimeFromMS(this.elapsedTime));
    }, 10);
  }

  reset() {
    this.elapsedTime = null;
    clearInterval(this.interval);
    this.renderTime();
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

  renderTime({ minutes = 0, seconds = 0, centiseconds = 0 } = {}) {
    if (centiseconds < 10) centiseconds = '0' + centiseconds;
    if (seconds < 10)      seconds = '0' + seconds;
    if (minutes < 10)      minutes = '0' + minutes;
    this.clock.textContent = `${minutes}:${seconds}:${centiseconds}`
  }
}

new Stopwatch(document.querySelector('.stopwatch'));