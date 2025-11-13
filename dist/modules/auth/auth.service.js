"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabaseClient_1 = require("../../config/supabaseClient");
const jwt_1 = require("../../config/jwt");
exports.authService = {
    async register(email, password, fullName) {
        if (password.length < 8) {
            throw new Error("La contraseña debe tener mínimo 8 caracteres");
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const { data, error } = await supabaseClient_1.supabase
            .from("users")
            .insert({
            email,
            full_name: fullName,
            password_hash: hashed,
        })
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return { id: data.id, email: data.email, fullName: data.full_name };
    },
    async login(email, password) {
        const { data: user, error } = await supabaseClient_1.supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();
        if (error || !user) {
            throw new Error("Credenciales incorrectas");
        }
        const isValid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isValid) {
            throw new Error("Credenciales incorrectas");
        }
        const token = jsonwebtoken_1.default.sign({
            sub: user.id,
            email: user.email,
        }, jwt_1.JWT_SECRET, { expiresIn: jwt_1.TOKEN_EXPIRATION });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
            },
        };
    },
};
