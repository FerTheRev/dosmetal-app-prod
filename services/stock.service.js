"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWSItemStock = exports.editWSItemStock = exports.addWSNewItemStock = void 0;
const ItemStock_model_1 = require("../models/ItemStock.model");
const addWSNewItemStock = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new ItemStock_model_1.ItemStockModel(item);
    try {
        const newItemSaved = yield newItem.save();
        return { success: true, newItem: newItemSaved };
    }
    catch (error) {
        return { succes: false, newItem: {} };
    }
});
exports.addWSNewItemStock = addWSNewItemStock;
//* Editar metadatos de un item en el stock
const editWSItemStock = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const itemUpdate = yield ItemStock_model_1.ItemStockModel.findByIdAndUpdate(item._id, item);
    console.log(item);
    try {
        if (itemUpdate) {
            yield itemUpdate.save();
            return {
                success: true,
                itemUpdated: item,
                event: 'Item actualizado correctamente'
            };
        }
    }
    catch (error) {
        return {
            success: false,
            itemUpdated: {},
            event: 'Error al actualizar item'
        };
    }
});
exports.editWSItemStock = editWSItemStock;
//* Eliminar un item del stock
const deleteWSItemStock = (itemID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ItemStock_model_1.ItemStockModel.findByIdAndDelete(itemID);
        return {
            success: true,
            itemID,
            event: 'Item eliminado correctamente'
        };
    }
    catch (error) {
        return {
            success: false,
            itemID,
            event: 'Error al eliminar item'
        };
    }
});
exports.deleteWSItemStock = deleteWSItemStock;
