"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemStockModel = void 0;
const mongoose_1 = require("mongoose");
const itemStock_history_model_1 = require("./itemStock-history.model");
const ItemStockSchema = new mongoose_1.Schema({
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
    image: String,
    historial: [itemStock_history_model_1.itemStockHistorySchema]
}, {
    versionKey: false,
    timestamps: true
});
exports.ItemStockModel = (0, mongoose_1.model)('Stock-item', ItemStockSchema);
