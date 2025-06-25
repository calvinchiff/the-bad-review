import { Server, Socket } from 'socket.io'
import { createRoom, joinRoom, leaveRoom, getRoom } from '@/src/game/rooms'
import { Player } from '@shared/types'

export function setupHandlers(io: Server, socket: Socket) {

    socket.on("create_room", async (player: Player, callback) => {
        const result = await createRoom(io, socket, player);
        callback(result);
    });

    socket.on("join_room", async (roomCode: string, player: Player, callback) => {
        const result = await joinRoom(io, socket, roomCode, player);
        callback(result);
    });

    socket.on("get_room_data", (roomCode: string, callback) => {
        const result = getRoom(roomCode);
        callback(result);
    })

    socket.on("leave_room", (roomCode: string, callback) => {
        const result = leaveRoom(io, socket, roomCode);
        callback(result);
    })
}
