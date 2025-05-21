import { createServer } from 'node:http';
import app from './app'

const server = createServer(app)

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000')
})