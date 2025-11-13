import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

import { authRouter } from "./modules/auth/auth.routes";
import { diagnosticRouter } from "./modules/diagnostic/diagnostic.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/diagnostic", diagnosticRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("BYE backend corriendo en puerto", PORT));
