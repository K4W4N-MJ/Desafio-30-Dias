class Stopwatch {
  constructor() {
    this.startTime = 0;
    this.elapsed = 0;
    this.running = false;
    this.laps = [];
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.startTime = performance.now() - this.elapsed;
  }

  pause() {
    if (!this.running) return;
    this.running = false;
    this.elapsed = performance.now() - this.startTime;
  }

  resume() {
    if (this.running) return;
    this.running = true;
    this.startTime = performance.now() - this.elapsed;
  }

  reset() {
    this.running = false;
    this.elapsed = 0;
    this.laps = [];
  }

  lap() {
    if (!this.running) return;
    this.laps.push(this.getTime());
  }

  getTime() {
    if (this.running) {
      this.elapsed = performance.now() - this.startTime;
    }
    return this.elapsed;
  }
}

class UIController {
  constructor() {
    this.timeEl = document.getElementById("time");
    this.statusEl = document.getElementById("status");
    this.lapsEl = document.getElementById("laps");
  }

  format(ms) {
    const milliseconds = Math.floor(ms % 1000).toString().padStart(3, "0");
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const minutes = (Math.floor(totalSeconds / 60) % 60).toString().padStart(2, "0");
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  update(time) {
    this.timeEl.textContent = this.format(time);
  }

  setStatus(text) {
    this.statusEl.textContent = text;
  }

  renderLaps(laps) {
    this.lapsEl.innerHTML = laps
      .map((lap, i) => `<li>#${i + 1} - ${this.format(lap)}</li>`)
      .join("");
  }
}

class Storage {
  static save(data) {
    localStorage.setItem("stopwatch", JSON.stringify(data));
  }

  static load() {
    return JSON.parse(localStorage.getItem("stopwatch")) || null;
  }
}

class App {
  constructor() {
    this.stopwatch = new Stopwatch();
    this.ui = new UIController();

    this.bindEvents();
    this.loadState();
    this.loop();
  }

  bindEvents() {
    document.querySelector(".controls").addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (!action) return;

      this.handleAction(action);
    });

    // atalhos teclado
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.handleAction(this.stopwatch.running ? "pause" : "start");
      }
      if (e.code === "KeyR") this.handleAction("reset");
      if (e.code === "KeyL") this.handleAction("lap");
    });
  }

  handleAction(action) {
    switch (action) {
      case "start":
        this.stopwatch.start();
        this.ui.setStatus("Rodando");
        break;
      case "pause":
        this.stopwatch.pause();
        this.ui.setStatus("Pausado");
        break;
      case "resume":
        this.stopwatch.resume();
        this.ui.setStatus("Rodando");
        break;
      case "reset":
        this.stopwatch.reset();
        this.ui.setStatus("Resetado");
        break;
      case "lap":
        this.stopwatch.lap();
        break;
    }

    this.persist();
  }

  persist() {
    Storage.save({
      elapsed: this.stopwatch.elapsed,
      laps: this.stopwatch.laps,
      running: this.stopwatch.running
    });
  }

  loadState() {
    const data = Storage.load();
    if (!data) return;

    this.stopwatch.elapsed = data.elapsed;
    this.stopwatch.laps = data.laps;
    this.stopwatch.running = data.running;

    if (data.running) {
      this.stopwatch.startTime = performance.now() - data.elapsed;
      this.ui.setStatus("Restaurado (rodando)");
    }

    this.ui.renderLaps(this.stopwatch.laps);
  }

  loop() {
    const update = () => {
      this.ui.update(this.stopwatch.getTime());
      this.ui.renderLaps(this.stopwatch.laps);
      requestAnimationFrame(update);
    };
    update();
  }
}

const app = new App();  