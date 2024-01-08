
import IDraftOrderSubject from "../../../adapter-interfaces/drafts/IDraftOrderSubject";
import ISocketAdapter from "../../../adapter-interfaces/websockets/ISocketAdapter";

export default class DraftSocketEventListeners {
    private readonly socket: ISocketAdapter;

    private readonly draftOrderSubject: IDraftOrderSubject

    constructor(socket: ISocketAdapter, draftOrderSubject: IDraftOrderSubject) {
        this.socket = socket;
        this.draftOrderSubject = draftOrderSubject;
    }

    public setupEventListeners() {
        this.socket.on('joinRoom', async (draftId: string) => {
            this.socket.joinRoom(draftId);
            this.draftOrderSubject.startObservers(draftId, 'Draft order');
        });
    }
}
