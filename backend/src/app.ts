import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getRoom, getRooms } from '@/src/game/rooms'

const app = express();
const prisma = new PrismaClient();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Server is up !');
})

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany({
        include: { reviews: true }
    });
    res.json(movies);
});

app.get('/rooms', async (req, res) => {
    res.json(getRooms())
})

app.get('/room/:roomCode', async (req, res) => {
    res.json(getRoom(req.params.roomCode))
})

app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

export default app;