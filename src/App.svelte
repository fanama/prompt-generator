<script lang="ts">
  import { promptController } from "./infra/service/prompt";
  import { promptStore } from "./lib/store";
  import Chatbot from "./molecule/chatbot.svelte";

  promptStore.set(promptController.getPrompts());
</script>

<main class="bg-gray-100 text-blue-800 min-h-screen p-8">
  <h1 class="text-4xl font-bold text-center mb-6">AI Prompt - DEMO -</h1>

  <div class="flex flex-col md:flex-row w-full h-full">
    <Chatbot />
  </div>
</main>
