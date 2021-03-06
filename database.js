"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const connectDB = () => {
    (0, mongoose_1.connect)(config_1.INITIAL_CONFIG.MONGO_DB, () => {
        console.log('database connected');
    });
};
exports.connectDB = connectDB;
