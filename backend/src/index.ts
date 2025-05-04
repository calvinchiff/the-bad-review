import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { PrismaClient } from '@prisma/client';

const app = express();
const server = createServer(app);
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

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})