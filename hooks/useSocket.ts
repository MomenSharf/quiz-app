// hooks/useSocket.ts
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const useSocket = (room: string) => {
  useEffect(() => {
    const socket = io();

    socket.emit('joinRoom', room);

    socket.on('receiveMessage', (message) => {
      console.log('New message:', message);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);
};

export default useSocket;
