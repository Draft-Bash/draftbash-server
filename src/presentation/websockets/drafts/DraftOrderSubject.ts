import IDraftOrderSubject from '../../../interfaces/websockets/IDraftOrderSubject';
import IDraftOrderObserver from '../../../interfaces/websockets/drafts/IDraftOrderObserver';

export default class DraftOrderSubject implements IDraftOrderSubject {
    private draftOrderObservers: IDraftOrderObserver[] = [];

    addObserver(observer: IDraftOrderObserver): void {
        this.draftOrderObservers.push(observer);
    }

    removeObserver(observer: IDraftOrderObserver): void {
        this.draftOrderObservers = this.draftOrderObservers.filter((o) => o !== observer);
    }

    startObservers(draft: unknown, currentDraftOrderTurn: unknown): void {
        this.draftOrderObservers.forEach((observer) => {
            observer.setDraft(draft);
            observer.update(currentDraftOrderTurn);
        });
    }

    notifyObservers(currentDraftOrderTurn: unknown): void {
        this.draftOrderObservers.forEach((observer) => observer.update(currentDraftOrderTurn));
    }
}
