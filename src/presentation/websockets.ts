import { Server, Socket } from 'socket.io';
import http from 'http';
import app from './express';
import SocketIOAdapter from '../infrastructure/websockets/SocketAdapter';
import DraftOrderSubject from './websockets/drafts/DraftOrderSubject';
import DraftOrderObserverTimer from './websockets/drafts/draftorder-observers/DraftOrderObserverTimer';
import DraftSocketHandler from './websockets/drafts/DraftSocketHandler';

const httpServer = http.createServer(app);
const socketIOserver = new Server(httpServer);

// Scopes events and rooms to the /drafts namespace
const draftNamespace = socketIOserver.of('/drafts');

draftNamespace.on('connection', (socket: Socket) => {
    const socketAdapter = new SocketIOAdapter(socket, draftNamespace);
    const draftOrderSubject = new DraftOrderSubject();
    const draftOrderObserverTimer = new DraftOrderObserverTimer(socketAdapter, draftOrderSubject);
    draftOrderSubject.addObserver(draftOrderObserverTimer);
    const draftSocketHandler = new DraftSocketHandler(socketAdapter, draftOrderSubject);
    draftSocketHandler.setupEventHandlers();
});

export default httpServer;