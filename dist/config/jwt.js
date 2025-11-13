"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_EXPIRATION = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
exports.TOKEN_EXPIRATION = "24h";
