import { Server, Socket } from 'socket.io';
import http from 'http';
import app from '../web-api/express';
import SocketIOAdapter from '../../infrastructure/websockets/SocketAdapter';
import DraftOrderSubject from './drafts/DraftOrderSubject';
import DraftOrderObserverTimer from './drafts/draftorder-observers/DraftOrderObserverTimer';
import DraftSocketEventListeners from './drafts/DraftSocketEventListeners';

const httpServer = http.createServer(app);
const socketIOserver = new Server(httpServer);

// Scopes events and rooms to the /drafts namespace
const draftNamespace = socketIOserver.of('/drafts');

draftNamespace.on('connection', (socket: Socket) => {
    const socketAdapter = new SocketIOAdapter(socket, draftNamespace);
    const draftOrderSubject = new DraftOrderSubject();
    const draftOrderObserverTimer = new DraftOrderObserverTimer(socketAdapter, draftOrderSubject);
    draftOrderSubject.addObserver(draftOrderObserverTimer);
    const draftSocketEventListeners = new DraftSocketEventListeners(socketAdapter, draftOrderSubject);
    draftSocketEventListeners.setupEventListeners();
});

// Our websockets and API server is now running on the same port
export default httpServer;