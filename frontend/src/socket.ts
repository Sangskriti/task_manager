import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");

export const connectSocket = (userId: string) => {
  socket.emit("join-user", userId);
};
