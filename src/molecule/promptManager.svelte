<script lang="ts">
  import PromptCreator from "../atoms/promptCreator.svelte";
  import PromptDisplayer from "../atoms/promptDisplayer.svelte";
  import type { Prompt } from "../domain/entity/prompt";
  import { promptController } from "../infra/service/prompt";
  import { promptStore } from "../lib/store";

  let displayPrompt = false;

  $: prompts = $promptStore;

  const defaultPrompt: Prompt = {
    title: "New Prompt",
    objectif: "",
    instruction: "",
  };

  let prompt: Prompt = defaultPrompt;

  function createPrompt(prompt: Prompt) {
    promptStore.set(promptController.createPrompt(prompt));
  }

  function removeAll() {
    promptStore.set(promptController.deleteAllPrompt());
  }

  function removeOne(prompt: Prompt) {
    promptStore.set(promptController.deletePrompt(prompt));
  }
</script>

<div class="flex flex-row">
  {#if displayPrompt}
    <PromptDisplayer {prompt} />
  {:else}
    <PromptCreator {prompt} {createPrompt} />
  {/if}
  <div
    class="bg-gray-200 text-white w-full h-80 p-8 shadow-lg rounded-lg overflow-y-auto overflow-scroll"
  >
    <div>
      <button
        class="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-3 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        on:click={() => {
          prompt = defaultPrompt;
          displayPrompt = false;
        }}
      >
        New Prompt
      </button>
      <button
        class="w-full p-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg mb-3 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        on:click={removeAll}
      >
        Delete All
      </button>
    </div>
    {#each prompts as p}
      <div class="p-4 mb-4 grid grid-cols-3 bg-gray-400 rounded-lg shadow-md">
        <div>{p.title}</div>
        <button
          class="bg-blue-500 p-2 hover:bg-blue-900 rounded-sm"
          on:click={() => {
            prompt = p;
            displayPrompt = true;
          }}>display</button
        >
        <button
          class="bg-red-500 p-2 hover:bg-red-900 rounded-sm"
          on:click={() => removeOne(p)}>delete</button
        >
      </div>
    {/each}
  </div>
</div>
