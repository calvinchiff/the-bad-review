"use client";
import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { Player } from "@shared/types"

type JoinOrCreateOptions = {
    player: Player;
    roomCode?: string;
    onError?: (msg: string) => void;
};

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

        socket.emit(
            roomCode ? "join_room" : "create_room",
            { ...player, roomCode },
            (res: { success: boolean; roomCode?: string; message?: string }) => {
                if (res.success && res.roomCode) {
                    router.push(`/game/${res.roomCode}`);
                } else {
                    onError?.(res.message || "Unknown error");
                }
            }
        );
    };

    const leaveRoom = (roomCode: string) => {
        const socket = socketRef.current;
        if (!socket.connected) return;

        socket.emit("leave_room", { roomCode }, (res: { success: boolean, message?: string }) => {
            if (res.success) {
                router.push('/');
            } else {
                console.log(res.message || "Unkown error");
            }
        });
        socket.disconnect();
    }

    return {
        socket: socketRef.current,
        connectAndJoin,
        leaveRoom,
    };
}