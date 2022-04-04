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
const dayJS = (0, dayjs_1.default)();
const getTodayRetiros = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[RETIROS] Se requirio los retiros del dia de hoy - ${dayJS.format('M-YYYY')}`);
    const month = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.findOne({
        month: dayJS.format('M-YYYY')
    });
    //* Si el mes no existe, hay que crearlo junto con el dia de hoy
    if (!month) {
        console.log(`[RETIROS] El mes ${dayJS.format('M-YYYY')} no existe, creandolo `);
        const newMonth = new Stock_Month_Retiros_model_1.StockMonthRetirosModel({
            month: dayJS.format('M-YYYY'),
            timeStamp: dayJS.valueOf()
        });
        console.log(`[RETIROS] Mes creado con exito`);
        console.log(`[RETIROS] Continuando con la creacion del dia ${dayJS.date()}`);
        const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
            MonthID: newMonth._id,
            day: dayJS.date(),
            timestamp: dayJS.valueOf()
        });
        newMonth.days.push(newDay._id);
        yield newMonth.save();
        const todaySaved = yield newDay.save();
        console.log(`[RETIROS] El dia ${dayJS.date()} fue creado con exito`);
        console.log(`[RETIROS] Entregado el dia de hoy`);
        return todaySaved.populate('dayEvents');
    }
    //* Si existe el mes, pero no el dia, Vamos a crear el dia de hoy
    console.log(`El mes ${dayJS.format('M-YYYY')} existe, verificando que exista el dia ${dayJS.date()}`);
    const today = yield Stock_day_retiros_model_1.StockDayRetiroModel.findOne({
        MonthID: month._id,
        day: dayJS.date()
    });
    if (!today) {
        console.log(`[RETIROS] El dia ${dayJS.date()} no existe, creando el dia`);
        const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
            MonthID: month._id,
            day: dayJS.date(),
            dayEvents: [],
            timestamp: dayJS.valueOf()
        });
        console.log(`[RETIROS] Agregando el dia ${dayJS.date()} al mes ${dayJS.format('M-YYYY')}`);
        month.days.push(newDay._id);
        yield newDay.save();
        yield month.save();
        console.log(`[RETIROS] Dia creado exitosamente`);
        return newDay;
    }
    //* Si existe el dia, vamos a entregarlo con el campo Day Events populado
    console.log(`El dia ${dayJS.date()} y el mes ${dayJS.format('M-YYYY')} existen, retornandolo`);
    const TodayPopulated = yield today.populate('dayEvents');
    return TodayPopulated;
});
exports.getTodayRetiros = getTodayRetiros;
const getMonthWithDayEventsRetiros = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[RETIROS] El usuario requiere los meses con sus dias de retiros`);
    const Months = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.find().populate('days');
    return Months;
});
exports.getMonthWithDayEventsRetiros = getMonthWithDayEventsRetiros;
