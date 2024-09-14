<script lang="ts">
  import type { Prompt } from "../domain/entity/prompt";

  export let prompt: Prompt;
  export let createPrompt: (prompt: Prompt) => void;
</script>

<div
  class="bg-gray-300 text-blue-800 w-full p-8 h-fit m-5 shadow-lg rounded-lg"
>
  <h1 class="text-3xl font-bold mb-6">Create a Custom GPT</h1>

  <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold mb-3">Title</h2>
    <textarea
      class="w-full p-3 text-sm bg-gray-300 text-blue-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      bind:value={prompt.title}
      placeholder="Enter the prompt title..."
    />
  </div>

  <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold mb-3">Objectif</h2>
    <textarea
      class="w-full p-3 text-sm bg-gray-300 text-blue-800 border-none rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
      bind:value={prompt.objectif}
      placeholder="Describe the objective..."
    />
  </div>

  <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold mb-3">Instruction</h2>
    <textarea
      class="w-full p-3 text-sm bg-gray-300 text-blue-800 border-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      bind:value={prompt.instruction}
      placeholder="Input the instructions..."
    />
  </div>

  <button
    class="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-3 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    on:click={() => {
      createPrompt(prompt);
    }}
  >
    Create Prompt
  </button>
</div>
