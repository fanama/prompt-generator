<script lang="ts">
  import PromptGenerator from "./molecule/promptGenerator.svelte";
  import PromptManager from "./molecule/promptManager.svelte";

  let page = 1;
  function setPage(p: number) {
    page = p;
  }
</script>

<main class="bg-gray-800 text-white min-h-screen p-8">
  <h1 class="text-4xl font-bold text-center mb-6">Promptor</h1>
  <div class="flex gap-5 items-center justify-center">
    <button
      on:click={() => setPage(1)}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Generate Prompt
    </button>
    <button
      on:click={() => setPage(2)}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Create Use Cases
    </button>
  </div>

  <div class="flex flex-col md:flex-row w-full h-full">
    {#if page == 1}
      <PromptGenerator />
    {/if}
    {#if page == 2}
      <PromptManager />
    {/if}
  </div>
</main>
