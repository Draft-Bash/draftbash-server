import DraftOrderObserver from "./IDraftOrderObserver";

export default interface IDraftOrderSubject {
    addObserver(observer: DraftOrderObserver): void;
    removeObserver(observer: DraftOrderObserver): void;
    notifyObservers(): void;
    startObservers(draft: unknown, currentDraftOrderTurn: unknown): void;
}