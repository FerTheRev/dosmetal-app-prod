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
exports.getMonthWithDaysRetiros = exports.getEspecificDayRetiros = exports.getTodayRetiros = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const Stock_day_retiros_model_1 = require("../models/Stock-day-retiros.model");
const Stock_Day_Event_model_1 = require("../models/Stock-Day-Event.model");
const Stock_Month_Retiros_model_1 = require("../models/Stock-Month-Retiros.model");
const dayJS = (0, dayjs_1.default)();
const getTodayRetiros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('El usuario requirio los retiros del dia');
    console.log(dayJS.format('M-YYYY'));
    const month = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.findOne({
        month: dayJS.format('M-YYYY')
    });
    //* Si el mes no existe, hay que crearlo junto con el dia de hoy
    if (!month) {
        console.log('El mes no existe, creando mes');
        const newMonth = new Stock_Month_Retiros_model_1.StockMonthRetirosModel({
            month: dayJS.format('M-YYYY'),
            timeStamp: dayJS.valueOf()
        });
        console.log('creando el dia');
        const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
            MonthID: newMonth._id,
            day: dayJS.date(),
            timestamp: dayJS.valueOf()
        });
        newMonth.days.push(newDay._id);
        yield newMonth.save();
        const todaySaved = yield newDay.save();
        console.log('Retiros del dia entregado');
        return res.json(todaySaved.populate('dayEvents'));
    }
    const today = yield Stock_day_retiros_model_1.StockDayRetiroModel.findOne({
        MonthID: month._id,
        day: dayJS.date()
    });
    //* Si existe el mes, pero no el dia, Vamos a crear el dia de hoy
    if (!today) {
        console.log('Existe el mes');
        console.log('No existe el dia, creando dia');
        const newDay = new Stock_day_retiros_model_1.StockDayRetiroModel({
            MonthID: month._id,
            day: dayJS.date(),
            dayEvents: [],
            timestamp: dayJS.valueOf()
        });
        month.days.push(newDay._id);
        yield newDay.save();
        yield month.save();
        console.log('Dia Creado');
        return res.json(newDay);
    }
    //* Si existe el dia, vamos a entregarlo con el campo Day Events populado
    console.log('El dia existe, entregando al usuario los datos');
    const TodayPopulated = yield today.populate('dayEvents');
    console.log('Datos entregados');
    return res.json(TodayPopulated);
});
exports.getTodayRetiros = getTodayRetiros;
const getEspecificDayRetiros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('El usuario requirio un dia especifico de retiros');
    const dayEvents = yield Stock_Day_Event_model_1.DayEventModel.find({
        DayID: req.body.ActualDay
    });
    if (dayEvents.length <= 0) {
        const day = yield Stock_day_retiros_model_1.StockDayRetiroModel.findOne({
            day: dayJS.date()
        });
        if (day) {
            const recoverDayEvents = yield Stock_Day_Event_model_1.DayEventModel.find({
                DayID: day._id
            });
            return res.json(recoverDayEvents);
        }
    }
    return res.json(dayEvents);
});
exports.getEspecificDayRetiros = getEspecificDayRetiros;
const getMonthWithDaysRetiros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('El usuario requirio los meses con sus dias de retiros');
    const Months = yield Stock_Month_Retiros_model_1.StockMonthRetirosModel.find().populate('days');
    return res.json(Months);
});
exports.getMonthWithDaysRetiros = getMonthWithDaysRetiros;
