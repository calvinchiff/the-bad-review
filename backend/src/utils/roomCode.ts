const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXZ";
const CODE_LENGTH = 5;
const existingCodes = new Set<string>();

function generateRoomCode(): string {
    let code = "";
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return code;
}

export function generateUniqueRoomCode(): string {
    let code = generateRoomCode();
    while (existingCodes.has(code)) {
        code = generateRoomCode();
    }
    return code;
}