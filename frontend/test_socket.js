import { io } from 'socket.io-client';

const API = 'https://et-gaming.onrender.com';

const socket = io(API, {
  transports: ['websocket', 'polling'],
  timeout: 5000,
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('socket connected, id=', socket.id);
  socket.close();
});

socket.on('connect_error', (err) => {
  console.error('socket connect_error', err && err.message ? err.message : err);
});

socket.on('disconnect', (reason) => {
  console.log('socket disconnected:', reason);
});
