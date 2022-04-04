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
exports.WebSocketService = void 0;
const ItemStock_model_1 = require("./models/ItemStock.model");
const retiros_service_1 = require("./services/retiros.service");
const stock_service_1 = require("./services/stock.service");
function WebSocketService(io) {
    io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
        console.log(`User connected, id => ${socket.id}`);
        const items = yield ItemStock_model_1.ItemStockModel.find();
        io.emit('[STOCK] get stock', items);
        socket.on('[STOCK] add item', (data) => __awaiter(this, void 0, void 0, function* () {
            const item = yield (0, stock_service_1.addWSNewItemStock)(data);
            io.emit('[STOCK] new item added', item);
        }));
        socket.on('[STOCK] item modified', (data) => __awaiter(this, void 0, void 0, function* () {
            const itemModified = yield (0, stock_service_1.editWSItemStock)(data);
            io.emit('[STOCK] item modified', itemModified);
        }));
        socket.on('[STOCK] delete item', (itemID) => __awaiter(this, void 0, void 0, function* () {
            const itemDeleted = yield (0, stock_service_1.deleteWSItemStock)(itemID);
            io.emit('[STOCK] item deleted', itemDeleted);
        }));
        //* RETIROS
        const retiros = yield (0, retiros_service_1.getTodayRetiros)();
        const MonthsAndDayEvents = yield (0, retiros_service_1.getMonthWithDayEventsRetiros)();
        socket.on('[RETIROS] reload day events', () => {
            console.log('Hay que recargar la lista de retiros');
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                const r = yield (0, retiros_service_1.getTodayRetiros)();
                io.emit('[RETIROS] get Today', r);
            }), 1000);
        });
        io.emit('[RETIROS] get Today', retiros);
        io.emit('[RETIROS] get month and day events', MonthsAndDayEvents);
        socket.on('disconnect', () => {
            console.log(`User disconnected, id => ${socket.id}`);
        });
    }));
}
exports.WebSocketService = WebSocketService;
