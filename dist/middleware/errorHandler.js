"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ message: "Error interno del servidor" });
};
exports.errorHandler = errorHandler;
