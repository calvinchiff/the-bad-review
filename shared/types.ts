export type Player = {
    id: string;
    username: string;
    letterboxd: string;
    avatar: string;
    score: number;
    reviews: string[];
    position?: any;
}

export type Question = {
    id: number;
    text: string;
    review: string;
    options: string[];
    correctAnswer: string;
}

export type Room = {
    roomId: string;
    players: Player[];
    questions: Question[];
    roundDuration: number;
    currentTimer: NodeJS.Timeout | null;
    currentQuestionIndex: number;
    started: boolean;
    phase: "lobby" | "game" | "ranking";
    admin: Player;
}