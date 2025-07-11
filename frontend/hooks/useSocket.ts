"use client";
import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { Player, Room } from "@shared/types"

type JoinOrCreateOptions = {
    player: Player;
    roomCode?: string;
    onError?: (msg: string) => void;
};

type RoomOnlyOptions = { roomCode: string; onError?: (msg: string) => void };

export function useSocket() {
    const socketRef = useRef(getSocket());
    const router = useRouter();

    useEffect(() => {
        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("Connected to socket:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    const connectAndJoin = ({ player, roomCode, onError }: JoinOrCreateOptions) => {
        const socket = socketRef.current;
        if (!socket.connected) socket.connect();

        if (roomCode) {
            socket.emit("join_room", roomCode, player, (res: { success: boolean; room: Room; message?: string }) => {
                console.log(res)
                if (res.success && res.room) {
                    router.push(`/game/${res.room.roomId}`);
                } else {
                    onError?.(res.message || "Unknown error");
                }
            });
        } else {
            socket.emit("create_room", player, (res: { success: boolean; room: Room; message?: string }) => {
                console.log(res)
                if (res.success && res.room) {
                    router.push(`/game/${res.room.roomId}`);
                } else {
                    onError?.(res.message || "Unknown error");
                }
            });
        }
    };

    const leaveRoom = ({ roomCode, onError }: RoomOnlyOptions) => {
        const socket = socketRef.current;
        if (!socket.connected) return;

        socket.emit("leave_room", roomCode, (res: { success: boolean, message?: string }) => {
            if (res.success) {
                router.push('/');
            } else {
                if (onError) return onError(res.message || "Unknown error");
                console.log(res.message || "Unknown error");
            }
        });
    }

    return {
        socket: socketRef.current,
        connectAndJoin,
        leaveRoom,
    };
}