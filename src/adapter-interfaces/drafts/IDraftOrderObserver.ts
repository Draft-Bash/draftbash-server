export default interface DraftOrderObserver {
    update(currentDraftOrderTurn: unknown): void;
    setDraft(draft: unknown): void;
}
