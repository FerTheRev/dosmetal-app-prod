"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const stock_routes_1 = require("./routes/stock.routes");
const retiros_routes_1 = require("./routes/retiros.routes");
const perfiles_routes_1 = require("./routes/perfiles.routes");
const app = (0, express_1.default)();
//* Configuration
app.set('port', process.env.PORT || 3000);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//* Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
//* Routes
app.use('/dosmetal/api/stock', stock_routes_1.StockRoutes);
app.use('/dosmetal/api/retiros', retiros_routes_1.RetirosRoutes);
app.use('/dosmetal/api/perfiles', perfiles_routes_1.PerfilesRouter);
//* Public
// app.use(express.static(path.join(__dirname, 'public')));
//* Start
const server = () => {
    return app.listen(app.get('port'), () => {
        console.log(`Server listen on port: ${app.get('port')}`);
    });
};
exports.server = server;
