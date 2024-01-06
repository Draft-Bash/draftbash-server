import IDraftOrderSubject from '../../../../interfaces/websockets/IDraftOrderSubject';
import ISocketAdapter from '../../../../interfaces/websockets/ISocketAdapter';
import IDraftOrderObserver from '../../../../interfaces/websockets/drafts/IDraftOrderObserver';

export default class DraftOrderObserverTimer implements IDraftOrderObserver {
    private readonly socket: ISocketAdapter;

    private readonly draftOrderSubject: IDraftOrderSubject;

    private draft: unknown;

    constructor(socket: ISocketAdapter, draftOrderSubject: IDraftOrderSubject) {
        this.socket = socket;
        this.draftOrderSubject = draftOrderSubject;
    }

    public setDraft(draft: unknown) {
        this.draft = draft;
    }

    update(currentDraftOrderTurn: unknown): void {
        let seconds = 20;
        console.log(this.draft);

        const updateTimerInterval = setInterval(() => {

            this.socket.emitToRoom(this.draft as string, 'updateTimer', seconds);

            if (seconds <= 0) {
                this.draftOrderSubject.notifyObservers('Timer expired');
                clearInterval(updateTimerInterval); // Stop the interval when the timer expires
            }

            seconds -= 1;
        }, 1000);
    }
}
