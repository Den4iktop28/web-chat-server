import {Server} from 'socket.io';
import express from 'express';
import http from 'http';
import { Socket } from 'dgram';

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: ['http://localhost:']
    }
})

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap = {
    //userId: SocketId
};

io.on('connection',(Socket) => {
    console.log('A user connected', Socket.id);
    const userId = Socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = Socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    Socket.on('disconnect', () => {
        console.log('A user disconnected', Socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });

});

export {io, app, server};