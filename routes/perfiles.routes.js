"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilesRouter = void 0;
const express_1 = require("express");
const perfiles_controller_1 = require("../controllers/perfiles.controller");
exports.PerfilesRouter = (0, express_1.Router)();
exports.PerfilesRouter.get('/images/:perfil', perfiles_controller_1.getPerfilImage);
