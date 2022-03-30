"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayEventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const DayEventSchema = new mongoose_2.Schema({
    DayID: String,
    empleado: String,
    estado: [String],
    obra: String,
    producto: String,
    ubicacion: String,
    unidadesRetiradas: Number
}, {
    timestamps: true,
    versionKey: false
});
exports.DayEventModel = mongoose_1.default.model('StockDayEvent', DayEventSchema);
