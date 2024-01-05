/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io';
import ISocketAdapter from '../../interfaces/websockets/ISocketAdapter';

export default class SocketIOAdapter implements ISocketAdapter {
    private readonly socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    joinRoom(roomName: string): void {
        // Join a room within the current namespace
        this.socket.join(roomName);
    }

    leaveRoom(roomName: string): void {
        // Leave a room within the current namespace
        this.socket.leave(roomName);
    }

    emitToRoom(roomName: string, eventName: string, eventData: any): void {
        // Emit an event to a specific room within the current namespace
        this.socket.to(roomName).emit(eventName, eventData);
    }

    emit(eventName: string, eventData: any): void {
        // Trigger an event for the current socket/connection
        this.socket.emit(eventName, eventData);
    }

    on(eventName: string, callback: (...args: any[]) => void): void {
        // Listen for an event on the current socket/connection
        this.socket.on(eventName, callback);
    }

    disconnect(): void {
        // Disconnect from the current namespace
        this.socket.disconnect();
    }
}
