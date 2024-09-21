import axios from "axios";
import { ollamaCall } from "./ollama";

interface Action {
  key: string;
  description: string;
  context: string[];
  result: string;
}

export class Agent {
  public async generatePlan(inputText: string): Promise<Action[]> {
    const toolsServices = this.getServiceTools();

    const planPrompt = `
        extrait les tâches puis génère un liste de tâches
        c'est une liste de sous tâches couplés aux functionTools
        la liste contient les appels aux différents
        tools utiles utilisant les paramètres associés

        ## INPUT
        \`\`\`
        ${inputText}
        \`\`\`

        ## TOOLS

        ${JSON.stringify(toolsServices)}

        ## FORMAT

        [{{key:str,description:str,context:[str],result:unknown}}]
        `;

    const planStr = await ollamaCall(planPrompt);

    return JSON.parse(planStr);
  }

  public async execute(inputText: string): Promise<any> {
    const plan = await this.generatePlan(inputText);
    const toolsServices = this.getServiceTools();

    if (!plan) {
      return;
    }

    for (let index = 0; index < plan.length; index++) {
      const action = plan[index];
      const key = action.key;
      let context = action.context;
      const fonction = toolsServices[key];

      if (!context || !fonction) {
        console.error("Error: No function or params");
        break;
      }

      if (index !== 0) {
        context = plan.slice(0, index).map((a) => a.result);
      }

      const result = fonction(context);
      if (!result) {
        console.error("Cannot respond");
        break;
      }

      plan[index].result = result;
    }

    return plan;
  }

  private async websearch(params: any): Promise<any> {
    let input = params.input;

    if (input) {
      input = input.replace(" ", "+");
    }

    const url = `https://search.brave.com/search?q=${input}`;
    const result = (await axios.get(url)).data;

    const prompt = `
        synthesize the information into a short markdown don't display urls
        `;

    const markdown = await ollamaCall(prompt + JSON.stringify(result));

    return `
        # ${url}

        ${markdown}
        `;
  }

  private async llm(params: any): Promise<any> {
    const prompt = params.prompt;
    const input = params.input;

    if (input) {
      const inputTmp = prompt + input;
      return await ollamaCall(inputTmp);
    }

    return null;
  }

  public getServiceTools(): { [key: string]: Function } {
    const tools: { [key: string]: Function } = {};
    tools["LLM-DEFAULT"] = this.llm;
    tools["WEB_SEARCH"] = this.websearch;
    return tools;
  }
}
