<script lang="ts">
  import {
    ollamaCall,
    getModels,
    ollamaIsRunning,
  } from "../infra/service/ollama";

  import Markdown from "../atoms/markdown.svelte";
  import { onMount } from "svelte";

  let canCallOllama = false;
  let input = "";
  let response = "";
  let loading = false;
  let model = "llama3";
  let models: string[] = [];
  let messages: string[] = [];

  onMount(async () => {
    canCallOllama = await ollamaIsRunning();
    models = await getModels();
    model = models[0];
  });

  $: prompt = ` ${messages.slice(-5).join("\n")} \n ${input}`;

  async function Call() {
    response = "bot : ";
    loading = true;
    messages = [...messages, `you : ${input}`];
    await ollamaCall(
      prompt,
      (text: string) => {
        response += text;
      },
      model,
    );

    loading = false;
    messages = [...messages, response];
    response = "";
    input = "";
  }
</script>

<div class="flex flex-col w-full">
  <h1 class="text-3xl font-bold mb-4 text-center p-4">Chatbot</h1>

  <select
    class="block w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    bind:value={model}
  >
    {#each models as m}
      <option value={m}>{m}</option>
    {/each}
  </select>
  <div class="bg-black rounded-md h-96 m-2 p-2 overflow-scroll">
    {#each messages as message}
      <Markdown value={message} />
    {/each}
    {#if response}
      <Markdown value={response} />
    {/if}
  </div>
  <textarea
    class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    bind:value={input}
  ></textarea>

  <button
    class="px-6 py-2 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
    on:click={Call}
  >
    Send
  </button>
</div>
