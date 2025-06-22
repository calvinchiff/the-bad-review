import { Server } from "socket.io";
import { setupHandlers } from "@/src/sockets/handlers"

export function registerSocketHandlers(io: Server) {
    io.on("connection", (socket) => {
        console.log("User Connected: ", socket.id);
        setupHandlers(io, socket);
    })
}