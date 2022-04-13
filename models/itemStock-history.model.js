"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemStockHistorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.itemStockHistorySchema = new mongoose_1.Schema({
    date: Number,
    detail: String
});
