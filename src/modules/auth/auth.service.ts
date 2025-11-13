import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../../config/supabaseClient";
import { JWT_SECRET, TOKEN_EXPIRATION } from "../../config/jwt";

export const authService = {
  async register(email: string, password: string, fullName: string) {
    if (password.length < 8) {
      throw new Error("La contraseña debe tener mínimo 8 caracteres");
    }

    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
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

  async login(email: string, password: string) {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      throw new Error("Credenciales incorrectas");
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error("Credenciales incorrectas");
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

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
