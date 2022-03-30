"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMonthRetirosModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const StockMonthRetirosSchema = new mongoose_2.Schema({
    month: String,
    timeStamp: Number,
    days: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'StockDayRetiros' }]
}, {
    timestamps: true,
    versionKey: false
});
exports.StockMonthRetirosModel = mongoose_1.default.model('StockMonthRetiros', StockMonthRetirosSchema);
