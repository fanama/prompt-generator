<script lang="ts">
  import type { Prompt } from "../domain/entity/prompt";
  import { promptController } from "../infra/service/prompt";
  import { promptStore } from "../lib/store";

  $: prompts = $promptStore;

  const prompt: Prompt = {
    title: "New Prompt",
    objectif: "",
    example: "",
    instruction: "",
  };

  function createPrompt() {
    promptStore.set(promptController.createPrompt(prompt));
  }

  function removeAll() {
    promptStore.set(promptController.deleteAllPrompt());
  }

  function removeOne(prompt: Prompt) {
    promptStore.set(promptController.deletePrompt(prompt));
  }
</script>

<div class="grid grid-cols-2 w-full h-screen gap-5 overflow-hidden">
  <div class="bg-gray-900 text-white w-full p-8 h-fit m-5 shadow-lg rounded-lg">
    <h1 class="text-3xl font-bold mb-6">Prompt Template Creator</h1>

    <div class="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-semibold mb-3">Title</h2>
      <textarea
        class="w-full p-3 text-sm bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        bind:value={prompt.title}
        placeholder="Enter the prompt title..."
      />
    </div>

    <div class="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-semibold mb-3">Objectif</h2>
      <textarea
        class="w-full p-3 text-sm bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        bind:value={prompt.objectif}
        placeholder="Describe the objective..."
      />
    </div>

    <div class="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-semibold mb-3">Example</h2>
      <textarea
        class="w-full p-3 text-sm bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        bind:value={prompt.example}
        placeholder="Provide an example..."
      />
    </div>

    <div class="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 class="text-2xl font-semibold mb-3">Instruction</h2>
      <textarea
        class="w-full p-3 text-sm bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        bind:value={prompt.instruction}
        placeholder="Input the instructions..."
      />
    </div>

    <button
      class="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-3 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      on:click={createPrompt}
    >
      Create Prompt
    </button>
  </div>
  <div
    class="bg-gray-800 text-white w-full p-8 shadow-lg rounded-lg h-5/6 overflow-y-auto overflow-scroll"
  >
    <button
      class="w-full p-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg mb-3 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      on:click={removeAll}
    >
      Delete All
    </button>
    {#each prompts as p}
      <div
        class="p-4 mb-4 flex justify-between bg-gray-700 rounded-lg shadow-md"
      >
        <div>{p.title}</div>
        <button
          class="bg-red-500 p-2 hover:bg-red-900 rounded-sm"
          on:click={() => removeOne(p)}>delete</button
        >
      </div>
    {/each}
  </div>
</div>
