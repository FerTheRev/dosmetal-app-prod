"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INITIAL_CONFIG = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.INITIAL_CONFIG = {
    MONGO_DB: process.env.DB_URI || 'mongodb://localhost:27017/dos-metal-backend'
};
