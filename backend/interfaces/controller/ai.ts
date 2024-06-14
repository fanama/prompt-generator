import {
  getModels,
  ollamaCall,
  ollamaIsRunning,
} from "../../services/ollama.ts";
import { Request, Response } from "express";

export class AiHttp {
  constructor() { }

  async isServerOn(_req: Request, res: Response) {
    const isRunning = await ollamaIsRunning();
    res.send(isRunning);
  }
  async getModels(_req: Request, res: Response) {
    const models = await getModels();
    res.send(models);
  }

  async call(req: Request, res: Response) {
    const { prompt, model } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    await ollamaCall(
      prompt,
      (text: string) => {
        res.write(`${text}`);
      },
      model,
    );

    res.end();
  }
}
