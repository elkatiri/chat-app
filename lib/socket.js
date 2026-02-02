const { Server: SocketIOServer } = require('socket.io');

let io = null;

function initializeSocketIO(httpServer) {
  if (io) {
    return io;
  }

  io = new SocketIOServer(httpServer, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join a chat room
    socket.on('join-chat', (chatId) => {
      socket.join(`chat:${chatId}`);
      console.log(`Socket ${socket.id} joined chat: ${chatId}`);
    });

    // Leave a chat room
    socket.on('leave-chat', (chatId) => {
      socket.leave(`chat:${chatId}`);
      console.log(`Socket ${socket.id} left chat: ${chatId}`);
    });

    // Handle new message
    socket.on('new-message', (data) => {
      // Broadcast to all clients in the chat room except the sender
      socket.to(`chat:${data.chatId}`).emit('message-received', data.message);
      console.log(`Message broadcasted to chat: ${data.chatId}`);
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to(`chat:${data.chatId}`).emit('user-typing', {
        userId: data.userId,
        isTyping: data.isTyping,
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}

function getSocketIO() {
  return io;
}

module.exports = { initializeSocketIO, getSocketIO };
