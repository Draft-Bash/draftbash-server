import DraftOrderObserver from "./drafts/IDraftOrderObserver";

export default interface IDraftOrderSubject {
    addObserver(observer: DraftOrderObserver): void;
    removeObserver(observer: DraftOrderObserver): void;
    notifyObservers(currentDraftOrderTurn: unknown): void;
    startObservers(draft: unknown, currentDraftOrderTurn: unknown): void;
}