import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany({
        include: { reviews: true }
    });
    res.json(movies);
});

export default app;