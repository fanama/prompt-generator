<script lang="ts">
  import PromptGenerator from "./molecule/promptGenerator.svelte";
  import PromptManager from "./molecule/promptManager.svelte";
</script>

<main class="bg-gray-800 text-white min-h-screen p-8">
  <h1 class="text-4xl font-bold text-center mb-6">Promptor</h1>
  <div class="flex flex-col md:flex-row w-full h-full">
    <PromptManager />
    <PromptGenerator />
  </div>
</main>
