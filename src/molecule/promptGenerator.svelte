<script lang="ts">
  import { promptController } from "../infra/service/prompt";
  let prompts = promptController.getPrompts();

  let selectedIndex = 0;
  $: currentPrompt = prompts[selectedIndex];
  let input = "";

  async function copy() {
    const content = `## Objectif \n
     ${currentPrompt.objectif} \n\n
     ## Example \n
     ${currentPrompt.example} \n\n
     ## Input \n
     ${input}\n\n
     ## Instruction \n
     ${currentPrompt.instruction} 

     `;

    try {
      await navigator.clipboard.writeText(content);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
</script>

<div class="bg-gray-900 text-white w-2/3 p-8 h-full m-5">
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold mb-4 text-center">Prompt Generator</h1>
    <select
      class="w-full p-2 mb-4 bg-gray-800 text-white rounded-md"
      bind:value={selectedIndex}
    >
      {#each prompts as prompt, index}
        <option class="p-2" value={index}>{prompt.title}</option>
      {/each}
    </select>

    <div class="text-2xl font-bold mb-4">Prompt</div>
    <textarea
      class="w-full p-2 mb-4 border bg-gray-700 text-white border-gray-700 rounded-md"
      bind:value={input}
    />

    <div class="bg-gray-800 p-4">
      <h2 class="text-2xl font-bold mb-2">## Instruction</h2>
      <div class="text-gray-300">{currentPrompt.instruction}</div>
    </div>

    <div class="bg-gray-800 p-4">
      <h2 class="text-2xl font-bold mb-2">## Objectif</h2>
      <div class="text-gray-300">{currentPrompt.objectif}</div>
    </div>

    <div class="bg-gray-800 p-4">
      <h2 class="text-2xl font-bold mb-2">## Example</h2>
      <div class="text-gray-300">{currentPrompt.example}</div>
    </div>
    {#if input}
      <div class="bg-gray-800 p-4">
        <h2 class="text-2xl font-bold mb-2">## Input</h2>
        <div class="text-gray-300">{input}</div>
        <button
          class="px-6 py-2 mt-4 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
          on:click={copy}
        >
          Copy
        </button>
      </div>
    {/if}
  </div>
</div>
