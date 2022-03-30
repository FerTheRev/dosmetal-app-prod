"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const DB_URI = process.env.DB_URI;
const connectDB = () => {
    console.log(`DIRECCION DE BASE DE DATOS ${DB_URI}`);
    if (!DB_URI)
        return console.log('no existe direccion de base de datos');
    (0, mongoose_1.connect)(DB_URI, () => {
        console.log('database connected');
    });
};
exports.connectDB = connectDB;
