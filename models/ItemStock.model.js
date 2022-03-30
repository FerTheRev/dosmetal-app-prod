"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStockModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const ItemStockSchema = new mongoose_2.Schema({
    referencia: String,
    categoria: String,
    detalle: String,
    cajas: Number,
    unidades_por_caja: Number,
    unidades_sueltas: Number,
    total: Number,
    necesitaRecargarStock: Boolean,
    stockMinimo: Number,
    ubicacion: String,
    image: String
}, {
    versionKey: false,
    timestamps: true
});
exports.ItemStockModel = mongoose_1.default.model('Stock-item', ItemStockSchema);
