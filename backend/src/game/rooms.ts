import { Socket, Server } from "socket.io";
import { Player, Room } from "@shared/types";
import { generateUniqueRoomCode } from "../utils/roomCode";

const rooms: Record<string, Room> = {};

export async function createRoom(io: Server, socket: Socket, player: Player) {
    const roomCode = generateUniqueRoomCode();
    const room: Room = {
        roomId: roomCode,
        players: [],
        questions: [],
        roundDuration: 30,
        currentTimer: null,
        currentQuestionIndex: 0,
        started: false,
        phase: "lobby",
        admin: player
    };

    player.id = socket.id;
    // Add the player to the room
    room.players.push(player);

    // Add the room to the room's list
    rooms[roomCode] = room;

    // Add this socket to the Socket.IO room to receive group events
    await socket.join(roomCode);

    // Send updated room to front
    // broadcastRoomUpdate(io, roomCode);
    console.log("Room created")

    return { success: true, room };
}

export function getRooms() {
    return { success: true, rooms, message: "Player left the room" }
}

export function getRoom(roomCode: string) {
    if (!rooms[roomCode]) return { success: false, message: `"Room ", ${roomCode}, "does not exist"` }
    return rooms[roomCode];
}

export function broadcastRoomUpdate(io: Server, roomCode: string) {
    const room = rooms[roomCode];
    console.log("broadcast test to room : ", roomCode)
    if (room) {
        io.to(roomCode).emit("room_updated", room);
    }
}

export async function joinRoom(io: Server, socket: Socket, roomCode: string, player: Player) {
    const room = rooms[roomCode];
    if (!room) return { succes: false, message: "Room does not exist" };
    if (room.players.length >= 12) return { success: false, message: "Room is full" };

    // Add player to room logic
    player.id = socket.id;
    room.players.push(player);

    // Add this socket to the Socket.IO room to receive group events
    await socket.join(roomCode);

    // Send updated room to front
    broadcastRoomUpdate(io, roomCode);

    return { success: true, room }
}

export function leaveRoom(io: Server, socket: Socket, roomCode: string) {
    const room = rooms[roomCode];
    if (!room) return { success: false, message: "Room does not exist" };

    // Remove the player from the room's players 
    room.players = room.players.filter((p) => p.id !== socket.id)

    // Remove the player's socket from the socket's room
    socket.leave(roomCode);

    if (room.players.length === 0) {
        delete rooms[roomCode];
    }

    // Send updated room to front
    broadcastRoomUpdate(io, roomCode);

    return { success: true, message: "Player left the room" }
}

export function removePlayer(io: Server, socket: Socket, roomCode: string, player: Player) {

}