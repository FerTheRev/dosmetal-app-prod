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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarstockWS = exports.retirarStockWS = exports.deleteWSItemStock = exports.editWSItemStock = exports.addWSNewItemStock = void 0;
const ItemStock_model_1 = require("../models/ItemStock.model");
const Stock_Month_Retiros_model_1 = require("../models/Stock-Month-Retiros.model");
const Stock_day_retiros_model_1 = require("../models/Stock-day-retiros.model");
const Stock_Day_Event_model_1 = require("../models/Stock-Day-Event.model");
const dayjs_1 = __importDefault(require("dayjs"));
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
const retirarStockWS = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const [retiro, item] = data;
    const dayJS = (0, dayjs_1.default)();
    console.log('El usuario retirara stock');
    try {
        const itemFinded = yield ItemStock_model_1.ItemStockModel.findById(item._id);
        yield ItemStock_model_1.ItemStockModel.findByIdAndUpdate(item._id, item);
    }
    catch (error) { }
    console.log(dayJS.format('M'));
    const ExistMonth = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.findOne({
        month: dayJS.format('M-YYYY')
    });
    if (!ExistMonth) {
        try {
            console.log('No existe el mes, creando mes....');
            const newMonth = new Stock_Month_Retiros_model_1.StockMonthRetirosModel({
                month: dayJS.format('M-YYYY')
            });
            const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
                MonthID: newMonth._id,
                day: dayJS.date()
            });
            const newDayEvent = new Stock_Day_Event_model_1.DayEventModel(Object.assign(Object.assign({}, retiro), { DayID: newDay._id }));
            newDay.dayEvents.push(newDayEvent._id);
            newMonth.days.push(newDay._id);
            yield newMonth.save();
            yield newDay.save();
            yield newDayEvent.save();
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
    console.log('Existe el mes, verificando que existe el dia');
    const ExisteDay = yield Stock_day_retiros_model_1.StockDayRetiroModel.findOne({
        MonthID: ExistMonth._id,
        day: dayJS.date()
    });
    if (ExisteDay) {
        try {
            console.log('Existe el dia, agregando evento al array...');
            const newDayEvent = new Stock_Day_Event_model_1.DayEventModel(Object.assign({ DayID: ExisteDay._id }, retiro));
            ExisteDay.dayEvents.push(newDayEvent._id);
            yield newDayEvent.save();
            yield ExisteDay.save();
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
    console.log('Existe el mes, pero no el dia');
    try {
        const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
            MonthID: ExistMonth._id,
            day: dayJS.date()
        });
        const newDayEvent = new Stock_Day_Event_model_1.DayEventModel(Object.assign({ DayID: newDay._id }, retiro));
        newDay.dayEvents.push(newDayEvent._id);
        yield newDay.save();
        yield newDayEvent.save();
        return { success: true };
    }
    catch (error) {
        return { success: false };
    }
});
exports.retirarStockWS = retirarStockWS;
const agregarstockWS = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const itemFounded = yield ItemStock_model_1.ItemStockModel.findByIdAndUpdate(item._id, item);
    if (itemFounded) {
        yield itemFounded.save();
        return { success: true };
    }
    return { success: false };
});
exports.agregarstockWS = agregarstockWS;
