import { Router } from "express";
import { AiHttp } from "../controller/ai";

export const aiRouter = Router();

const aiHttp = new AiHttp();

aiRouter.get("/isRunning", aiHttp.isServerOn);
aiRouter.get("/api/tags", aiHttp.getModels);
aiRouter.post("/api/generate", aiHttp.call);
aiRouter.post("/api/generate/json", aiHttp.call);
