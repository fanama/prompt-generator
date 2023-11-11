import { writable } from "svelte/store";
import type { Prompt } from "../domain/entity/prompt";

export const promptStore = writable<Prompt[]>([]);
