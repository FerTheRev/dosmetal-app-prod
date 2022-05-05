"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerfilImage = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
/**
 * It checks if the image exists, if it does, it sends it, if it doesn't, it sends a default image.
 * @param {Request} req - Request - The request object.
 * @param {Response} res - Response
 * @returns The image is being returned.
 */
const getPerfilImage = (req, res) => {
    const perfil_img = path_1.default.join(__dirname, 'images', 'perfiles', req.params.perfil);
    const validate = (0, fs_1.existsSync)(perfil_img);
    if (validate) {
        return res.sendFile(perfil_img);
    }
    ;
    return res.sendFile(path_1.default.join(__dirname, 'images', 'perfiles', 'no-image.png'));
};
exports.getPerfilImage = getPerfilImage;
