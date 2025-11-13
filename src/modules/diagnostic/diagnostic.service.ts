import { supabase } from "../../config/supabaseClient";

function getLevelFromCorrectAnswers(correct: number): "A1" | "A2" | "B1" | "B2" {
  if (correct <= 5) return "A1";
  if (correct <= 10) return "A2";
  if (correct <= 15) return "B1";
  return "B2";
}

export const diagnosticService = {
  async saveResult(userId: string, correctAnswers: number) {
    if (correctAnswers < 0 || correctAnswers > 20) {
      throw new Error("Número de respuestas inválido");
    }

    const level = getLevelFromCorrectAnswers(correctAnswers);

    const { error: insertError } = await supabase.from("diagnostic_results").insert({
      user_id: userId,
      correct_answers: correctAnswers,
      level,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ level, diagnostic_completed: true })
      .eq("user_id", userId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { level, correctAnswers };
  },
};
