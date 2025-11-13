import { Router } from "express";
import { submitDiagnostic } from "./diagnostic.controller";
import { authRequired } from "../../middleware/authMiddleware";

export const diagnosticRouter = Router();

diagnosticRouter.post("/submit", authRequired, submitDiagnostic);
