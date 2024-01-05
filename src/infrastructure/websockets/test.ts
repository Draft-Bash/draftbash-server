/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client';

// Replace 'http://your-socket-io-server' with your Socket.IO server URL
const socket = io('http://localhost:3000/drafts');

// Send a test message
socket.emit('test-message', 'Hello, Socket.IO server!');

// Receive event
socket.on('test-message-reply', (data: any) => {
    console.log('Received message from server:', data);

    // Close the connection after receiving a reply
    socket.close();
});

// Disconnect event
socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});