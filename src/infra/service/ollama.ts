import axios from "axios";

interface Response {
  response: string;
  done: boolean;
}

const baseURL = "";

export async function getModels(): Promise<string[]> {
  const response = await fetch(`${baseURL}/api/tags`);
  const result = await response.json();

  console.log(result);

  return result;
}

export async function ollamaIsRunning(): Promise<boolean> {
  const state = await axios.get(baseURL);
  return !!state;
}
export async function ollamaCall(
  prompt: string,
  stream: (text: string) => void = (text: string) => console.log({ text }),
  model: string = "llama3",
) {
  const url = `${baseURL}/api/generate`;
  const data = {
    model,
    prompt,
    options: {
      temperature: 0.1,
    },
  };

  let result = "";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok || !response.body) {
      throw new Error("Network response was not ok");
    }

    const reader = response.body.getReader();
    await readStream(reader, stream);

    return result;
  } catch (error) {
    console.error(error);
    return "can't reach ollama";
  }

  async function readStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    stream: (text: string) => void = (text: string) => console.log({ text }),
  ) {
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        const chunkStr = decoder.decode(value);
        stream(chunkStr);
      }
    }
  }
}

export async function ollamaCall_old(prompt: string) {
  const url = "http://localhost:11434/api/generate";
  const data = {
    model: "llama3",
    prompt,
  };

  try {
    const response = await axios.post(url, data);

    const responseString = response.data as string;

    const res = responseString.split("\n");

    const result = res.map((r, i) => {
      const obj: Response =
        i < res.length - 1 ? JSON.parse(r) : { response: "", done: true };

      return obj.done ? "" : obj.response;
    });

    return result.join("");
  } catch (error) {
    return "can't reach ollama";
  }
}
