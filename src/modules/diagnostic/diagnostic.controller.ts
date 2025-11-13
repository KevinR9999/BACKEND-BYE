import { Response } from "express";
import { AuthRequest } from "../../middleware/authMiddleware";
import { diagnosticService } from "./diagnostic.service";

export const submitDiagnostic = async (req: AuthRequest, res: Response) => {
  try {
    const { correctAnswers } = req.body;
    const userId = req.user.sub as string;
    const result = await diagnosticService.saveResult(userId, correctAnswers);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
