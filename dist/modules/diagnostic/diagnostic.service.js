"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diagnosticService = void 0;
const supabaseClient_1 = require("../../config/supabaseClient");
function getLevelFromCorrectAnswers(correct) {
    if (correct <= 5)
        return "A1";
    if (correct <= 10)
        return "A2";
    if (correct <= 15)
        return "B1";
    return "B2";
}
exports.diagnosticService = {
    async saveResult(userId, correctAnswers) {
        if (correctAnswers < 0 || correctAnswers > 20) {
            throw new Error("Número de respuestas inválido");
        }
        const level = getLevelFromCorrectAnswers(correctAnswers);
        const { error: insertError } = await supabaseClient_1.supabase.from("diagnostic_results").insert({
            user_id: userId,
            correct_answers: correctAnswers,
            level,
        });
        if (insertError) {
            throw new Error(insertError.message);
        }
        const { error: updateError } = await supabaseClient_1.supabase
            .from("profiles")
            .update({ level, diagnostic_completed: true })
            .eq("user_id", userId);
        if (updateError) {
            throw new Error(updateError.message);
        }
        return { level, correctAnswers };
    },
};
