import express from 'express';    
import {createServer} from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

let count = 0;

io.on('connection', (socket) => {
    count++;
    console.log('A user connected : ' + count);
    socket.on('disconnect', () => {
        count--;
        console.log('A user disconnected : ' + count);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});