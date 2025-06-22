import { createServer } from 'node:http';
import app from './app'
import { Server } from 'socket.io'
import { registerSocketHandlers } from './sockets';

const PORT = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server);

registerSocketHandlers(io);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})