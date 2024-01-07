import { io } from 'socket.io-client';

const draftSocket = io('http://localhost:3000/drafts');

draftSocket.on('connect', () => {
    console.log('Connected to the chat namespace');

    draftSocket.emit('joinRoom', '1');
});

draftSocket.on('updateTimer', seconds => {
    console.log(`Timer started: ${seconds}`);
});