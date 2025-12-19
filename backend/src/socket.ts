// import { Server } from "socket.io";

// export const initSocket = (server: any) => {
//   const io = new Server(server, {
//     cors: { origin: "*" },
//   });

//   io.on("connection", (socket) => {
//     socket.on("taskUpdated", (task) => {
//       socket.broadcast.emit("taskUpdated", task);
//     });
//   });
// };



// socket.ts
import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("join-user", (userId) => {
      socket.join(userId);
    });
  });
};

export const emitTaskUpdate = (task: any) => {
  io.emit("task-updated", task);
};

export const notifyAssignment = (userId: string, task: any) => {
  io.to(userId).emit("task-assigned", task);
};
