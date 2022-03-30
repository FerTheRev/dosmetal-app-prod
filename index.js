"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const socket_io_1 = require("socket.io");
const database_1 = require("./database");
const webSocket_1 = require("./webSocket");
const httpServer = (0, app_1.server)();
(0, database_1.connectDB)();
//* Init SocketIO
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
(0, webSocket_1.WebSocketService)(io);
