"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosticRouter = void 0;
const express_1 = require("express");
const diagnostic_controller_1 = require("./diagnostic.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
exports.diagnosticRouter = (0, express_1.Router)();
exports.diagnosticRouter.post("/submit", authMiddleware_1.authRequired, diagnostic_controller_1.submitDiagnostic);
