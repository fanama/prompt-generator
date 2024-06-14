<script lang="ts">
  import { promptController } from "../infra/service/prompt";
  import clipboard from "../lib/clipBoard";
  import {
    ollamaCall,
    getModels,
    ollamaIsRunning,
  } from "../infra/service/ollama";

  import { promptStore } from "../lib/store";
  import Markdown from "../atoms/markdown.svelte";
  import { onMount } from "svelte";
  promptStore.set(promptController.getPrompts());

  $: prompts = $promptStore;
  let selectedIndex = 0;
  let canCallOllama = false;
  let input = "";
  let response = "";
  let loading = false;
  let raw = false;
  let model = "llama3";
  let models: string[] = [];

  onMount(async () => {
    canCallOllama = await ollamaIsRunning();
    models = await getModels();
    model = models[0];
  });

  $: currentPrompt = prompts[selectedIndex];

  $: prompt = raw
    ? input
    : `## Objectif \n
     ${currentPrompt.objectif} \n\n
     ## Example \n
     ${currentPrompt.example} \n\n
     ## Input \n
     ${input}\n\n
     ## Instruction \n
     ${currentPrompt.instruction} 

     `;

  function copy() {
    clipboard.copy(prompt);
  }

  async function Call() {
    response = "";
    loading = true;
    await ollamaCall(
      prompt,
      (text: string) => {
        response += text;
      },
      model,
    );
    loading = false;
  }
</script>

<div
  class="bg-gray-900 grid grid-cols-2 w-full justify-center text-white p-8 gap-5 m-5"
>
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold mb-4 text-center">Prompt Generator</h1>
    {#if !raw}
      <select
        class="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
        bind:value={selectedIndex}
      >
        {#each prompts as prompt, index}
          <option class="p-2" value={index}>{prompt.title}</option>
        {/each}
      </select>
    {/if}

    <div class="text-2xl font-bold mb-4">Prompt</div>
    <select
      class="block w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      bind:value={model}
    >
      {#each models as m}
        <option value={m}>{m}</option>
      {/each}
    </select>
    <textarea
      class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      bind:value={input}
    ></textarea>
    <div>
      <h2 class="text-2xl font-bold mb-2">Response</h2>
      {#if loading}
        <div>LOADING...</div>
      {/if}
      <Markdown value={response} />
    </div>
  </div>

  <div class="flex flex-col overflow-scroll">
    {#if !raw}
      <div class="bg-gray-800 p-4 mb-4">
        <h2 class="text-2xl font-bold mb-2">Instruction</h2>
        <div class="text-gray-300">{currentPrompt.instruction}</div>
      </div>

      <div class="bg-gray-800 p-4 mb-4">
        <h2 class="text-2xl font-bold mb-2">Objectif</h2>
        <div class="text-gray-300">{currentPrompt.objectif}</div>
      </div>

      <div class="bg-gray-800 p-4 mb-4">
        <h2 class="text-2xl font-bold mb-2">Example</h2>
        <div class="text-gray-300">{currentPrompt.example}</div>
      </div>
    {/if}

    {#if input}
      <div class="bg-gray-800 p-4">
        <h2 class="text-2xl font-bold mb-2">Input</h2>
        <div class="text-gray-300">{input}</div>
      </div>
    {/if}
  </div>

  <div class="col-span-2 flex justify-between items-center">
    <div>
      <input type="checkbox" bind:checked={raw} />
      <label class="ml-2">Raw</label>
      <input type="checkbox" />
      <label class="ml-2">Stream</label>
    </div>
    <div class="flex space-x-4">
      <button
        class="px-6 py-2 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
        on:click={copy}
      >
        Copy
      </button>

      <button
        class="px-6 py-2 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
        on:click={Call}
      >
        Ollama Call
      </button>
    </div>
  </div>
</div>
