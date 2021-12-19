
class Stopwatch {
  constructor(elem) {
    this.stopwatch = elem;
    this.clock = this.stopwatch.querySelector('.stopwatch__time--current');
    this.startBtn = this.stopwatch.querySelector('.stopwatch__btn--start');
    this.stopBtn = this.stopwatch.querySelector('.stopwatch__btn--stop');
    this.resetBtn = this.stopwatch.querySelector('.stopwatch__btn--reset');
    this.markBtn = this.stopwatch.querySelector('.stopwatch__btn--mark');
    this.marks = this.stopwatch.querySelector('.stopwatch__marks');

    this.elapsedTime = null;
    this.interval = null;

    this.startBtn.addEventListener('click', () => this.start());
    this.stopBtn.addEventListener('click', () => this.stop());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.markBtn.addEventListener('click', () => this.mark());
  }

  start() {
    if (this.interval) return;
    const startTime = this.elapsedTime ? Date.now() - this.elapsedTime : Date.now();
    this.interval = setInterval(() => {
      const currentTime = Date.now();
      this.elapsedTime = currentTime - startTime;
      this.renderTime(this.getTimeFromMS(this.elapsedTime));
    }, 10);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.elapsedTime = null;
    clearInterval(this.interval);
    this.interval = null;
    this.renderTime();
    this.removeAllMarks();
  }

  mark() {
    let { minutes, seconds, centiseconds } = this.getTimeFromMS(this.elapsedTime);
    if (centiseconds < 10) centiseconds = '0' + centiseconds;
    if (seconds < 10)      seconds = '0' + seconds;
    if (minutes < 10)      minutes = '0' + minutes;
    const li = `<li class="stopwatch__time stopwatch__time--mark">${minutes}:${seconds}:${centiseconds}</li>`;
    this.marks.insertAdjacentHTML('afterbegin', li);
  }

  removeAllMarks() {
    this.marks.innerHTML = '';
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