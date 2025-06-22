import { io, Socket } from 'socket.io-client'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

let socket: Socket | null = null;

export function getSocket(): Socket {
    if (!socket) {
        socket = io(backendUrl, {
            autoConnect: false,
            transports: ['websocket'],
        });
        socket.connect();
    }
    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}