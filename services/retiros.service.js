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
exports.getMonthWithDayEventsRetiros = exports.getTodayRetiros = void 0;
const Stock_day_retiros_model_1 = require("../models/Stock-day-retiros.model");
const Stock_Month_Retiros_model_1 = require("../models/Stock-Month-Retiros.model");
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/es");
const dayJS = (0, dayjs_1.default)().locale('es');
const getTodayRetiros = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[RETIROS] Se requirio los retiros del dia de hoy ${dayJS.format('M-YYYY')}`);
    const month = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.findOne({
        month: dayJS.format('M-YYYY')
    });
    if (month) {
        console.log('[RETIROS] El mes existe, verificando dia');
        const day = yield Stock_day_retiros_model_1.StockDayRetiroModel.findOne({
            MonthID: month._id,
            day: dayJS.date()
        });
        if (day) {
            console.log(`[RETIROS] El dia ${dayJS.format('DD-MM')} existe`);
            return yield day.populate('dayEvents');
        }
        const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
            MonthID: month._id,
            day: dayJS.date(),
            dayEvents: [],
            timestamp: dayJS.valueOf()
        });
        month.days.push(newDay._id);
        yield newDay.save();
        yield month.save();
        return yield newDay.populate('DayEvents');
    }
    console.log('[RETIROS] Mes inexistente');
    console.log('[RETIROS] Creando mes');
    const newMonth = new Stock_Month_Retiros_model_1.StockMonthRetirosModel({
        month: dayJS.format('M-YYYY'),
        days: [],
        timeStamp: dayJS.valueOf()
    });
    console.log('[RETIROS] Creando día');
    const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
        MonthID: newMonth._id,
        day: dayJS.date(),
        timestamp: dayJS.valueOf()
    });
    newMonth.days.push(newDay._id);
    yield newDay.save();
    yield newMonth.save();
    return newDay.populate('dayEvents');
});
exports.getTodayRetiros = getTodayRetiros;
const getMonthWithDayEventsRetiros = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[RETIROS] El usuario requiere los meses con sus dias de retiros`);
    const Months = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.find().populate('days');
    return Months;
});
exports.getMonthWithDayEventsRetiros = getMonthWithDayEventsRetiros;
