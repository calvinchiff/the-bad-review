import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
    res.send('Server is up !');
})

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany({
        include: { reviews: true }
    });
    res.json(movies);
});

app.use((err: any, req: any, res: any, next: any) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

export default app;