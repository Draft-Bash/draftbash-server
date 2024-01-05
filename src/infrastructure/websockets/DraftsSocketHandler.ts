import ISocketAdapter from "../../interfaces/websockets/ISocketAdapter";

export default class DraftsSocketHandler {
    private readonly socket: ISocketAdapter;

    constructor(socket: ISocketAdapter) {
        this.socket = socket;
    }

    public setupEventHandlers() {
        this.socket.on('test-message', (message) => {
            console.log(message);
            this.socket.emit('test-message-reply', 'Hello, Socket.IO client!');
        });
    }
}
