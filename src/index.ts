import { Server } from 'socket.io';
import app from './presentation/express';
import SocketIOAdapter from './infrastructure/websockets/SocketAdapter';
import DraftsSocketHandler from './infrastructure/websockets/DraftsSocketHandler';

const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

const io = new Server(httpServer);

io.of('/drafts').on('connection', (socket) => {
    console.log('User connected to drafts namespace');
    const socketAdapter = new SocketIOAdapter(socket);
    const draftsSocketHandler = new DraftsSocketHandler(socketAdapter);
    draftsSocketHandler.setupEventHandlers();
});

