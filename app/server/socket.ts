import { Server } from "socket.io";
import http from "http";

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("send-message", (data) => {
      io.to(data.conversationId).emit("receive-message", data);
    });
  });
};
