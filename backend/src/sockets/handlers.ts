import { Server, Socket } from 'socket.io'
import { createRoom, joinRoom, leaveRoom } from '@/src/game/rooms'
import { Player } from '@shared/types'

export function setupHandlers(io: Server, socket: Socket) {
    socket.on("create_room", (player: Player, callback) => {
        const { success, roomCode } = createRoom(socket, player);
        callback({ success, roomCode });
    });

    socket.on("join_game", ({ roomCode, player }: { roomCode: string; player: Player }, callback) => {
        const result = joinRoom(socket, roomCode, player);
        callback(result);
    });

    socket.on("leave_room", (roomCode: string, player: Player, callback) => {
        const result = leaveRoom(socket, roomCode, player);
        callback(result);
    })
}
