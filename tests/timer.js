export class Timer {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.running = false;
        this.notes = [];  // Stores checkpoint notes
    }

    start() {
        if (!this.running) {
            this.startTime = Date.now() - this.elapsedTime;
            this.running = true;
            console.log("Timer started");
        }
    }

    stop() {
        if (this.running) {
            this.elapsedTime = Date.now() - this.startTime;
            this.running = false;
            console.log("Timer stopped");
        }
    }

    reset() {
        this.startTime = null;
        this.elapsedTime = 0;
        this.running = false;
        this.notes = [];
        console.log("Timer reset");
    }

    note(message) {
        if (this.running) {
            const noteTime = Date.now() - this.startTime;
            this.notes.push(noteTime);
            console.log(`Note taken at: ${this.formatTime(noteTime)}`);
            console.log(`Recieved message: ${message}\n`);
        } else {
            console.log("Timer is not running");
        }
    }

    getElapsedTime() {
        if (this.running) {
            return Date.now() - this.startTime;
        }
        return this.elapsedTime;
    }

    formatTime(milliseconds) {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

        return `${hours}:${minutes}:${seconds}`;
    }

    showElapsedTime() {
        console.log(`Elapsed time: ${this.formatTime(this.getElapsedTime())}`);
    }

    showNotes() {
        console.log("Notes taken:");
        this.notes.forEach((note, index) => {
            console.log(`Note ${index + 1}: ${this.formatTime(note)}`);
        });
    }
}

// Usage
const timer = new Timer();

timer.start();  // Starts the timer
setTimeout(() => timer.note(), 2000); // Adds a note at 2 seconds
setTimeout(() => timer.stop(), 5000); // Stops the timer at 5 seconds
setTimeout(() => timer.showElapsedTime(), 6000); // Shows elapsed time
setTimeout(() => timer.showNotes(), 7000); // Shows all noted times
