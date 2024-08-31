<script lang="ts">
  import { promptController } from "./infra/service/prompt";
  import { promptStore } from "./lib/store";
  import Chatbot from "./molecule/chatbot.svelte";
  import PromptGenerator from "./molecule/promptGenerator.svelte";
  import PromptManager from "./molecule/promptManager.svelte";

  promptStore.set(promptController.getPrompts());

  let page = 0;
  function setPage(p: number) {
    page = p;
  }
</script>

<main class="bg-gray-100 text-blue-800 min-h-screen p-8">
  <h1 class="text-4xl font-bold text-center mb-6">AI Prompt - DEMO -</h1>
  <div class="flex gap-5 items-center justify-center">
    <button
      on:click={() => setPage(0)}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Chatbot
    </button>
    <button
      on:click={() => setPage(1)}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Test Custom GPT
    </button>
    <button
      on:click={() => setPage(2)}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Custom GPT
    </button>
  </div>

  <div class="flex flex-col md:flex-row w-full h-full">
    {#if page == 0}
      <Chatbot />
    {/if}
    {#if page == 1}
      <PromptGenerator />
    {/if}
    {#if page == 2}
      <PromptManager />
    {/if}
  </div>
</main>
