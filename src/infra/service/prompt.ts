import type { Prompt } from "../../domain/entity/prompt";
import { defaultPrompts } from "../data/prompts";
import { LocalStorage } from "./localStorage";

class PromptDatabase {
  localStorage: LocalStorage<Prompt>;

  constructor() {
    this.localStorage = new LocalStorage("prompts", defaultPrompts);
  }
  getPrompts(): Prompt[] {
    return this.localStorage.getAll();
  }
  createPrompt(prompt: Prompt): Prompt[] {
    return this.localStorage.add(prompt);
  }
  deletePrompt(prompt: Prompt): Prompt[] {
    return this.localStorage.remove(prompt);
  }
}

export const promptController = new PromptDatabase();
