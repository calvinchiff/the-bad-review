import { Socket } from "socket.io";
import { Player, Room } from "@shared/types";
import { generateUniqueRoomCode } from "../utils/roomCode";

const rooms: Record<string, Room> = {};

export function createRoom(socket: Socket, player: Player) {
    const roomCode = generateUniqueRoomCode();
    const room: Room = {
        roomId: roomCode,
        players: [],
        questions: [],
        roundDuration: 30,
        currentTimer: null,
        currentQuestionIndex: 0,
        started: false,
    };

    player.id = socket.id;
    room.players.push(player);
    rooms[roomCode] = room;
    socket.join(roomCode);

    return { success: true, roomCode };
}

export function getRooms() {
    return rooms;
}

export function getRoom(roomCode: string) {
    return rooms[roomCode];
}

export function joinRoom(socket: Socket, roomCode: string, player: Player) {
    const room = rooms[roomCode];
    if (!room) return { succes: false, message: "Room does not exist" };
    if (room.players.length >= 12) return { success: false, message: "Room is full" };

    player.id = socket.id;
    room.players.push(player);
    socket.join(roomCode);

    return { success: true, roomCode }
}

export function leaveRoom(socket: Socket, roomCode: string) {
    const room = rooms[roomCode];
    if (!room) return { success: false, message: "Room does not exist" };

    room.players = room.players.filter((p) => p.id !== socket.id)
    socket.leave(roomCode);
    if (room.players.length === 0) {
        delete rooms[roomCode];
    }

    return { success: true, message: "Player left the room" }
}