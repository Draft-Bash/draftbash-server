import IDraftTimerUseCase from './IDraftTimerUseCase';

export default class DraftTimerUseCase implements IDraftTimerUseCase {


    startTimer(roomName: string, initialCountdown: number, updateCallback: (countdown: number) => void): void {
        if (!this.timers[roomName]) {
            this.countdowns[roomName] = initialCountdown;

            // Start the timer
            this.timers[roomName] = setInterval(() => {
                this.countdowns[roomName]-=1;
                if (this.countdowns[roomName] >= 0) {
                    // Notify external components about timer update
                    updateCallback(this.countdowns[roomName]);
                } else {
                    this.resetTimer(roomName);
                }
            }, 1000);
        }
    }

    resetTimer(roomName: string): void {
        if (this.timers[roomName]) {
            clearInterval(this.timers[roomName]);
            delete this.timers[roomName];
            this.countdowns[roomName] = 60;

            updateCallback(this.countdowns[roomName]);
        }
    }
}
