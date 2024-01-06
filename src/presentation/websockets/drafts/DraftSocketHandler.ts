
import IDraftOrderSubject from "../../../interfaces/websockets/IDraftOrderSubject";
import ISocketAdapter from "../../../interfaces/websockets/ISocketAdapter";

export default class DraftSocketHandler {
    private readonly socket: ISocketAdapter;

    private readonly draftOrderSubject: IDraftOrderSubject

    constructor(socket: ISocketAdapter, draftOrderSubject: IDraftOrderSubject) {
        this.socket = socket;
        this.draftOrderSubject = draftOrderSubject;
    }

    public setupEventHandlers() {
        this.socket.on('joinRoom', async (draftId: string) => {
            this.socket.joinRoom(draftId);
            this.draftOrderSubject.startObservers(draftId, 'Draft order');
        });
    }
}
