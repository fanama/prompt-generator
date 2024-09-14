<script lang="ts">
  import Modal from "./atoms/modal.svelte";
  import { promptController } from "./infra/service/prompt";
  import { promptStore } from "./lib/store";
  import Chatbot from "./molecule/chatbot.svelte";
  import PromptManager from "./molecule/promptManager.svelte";

  promptStore.set(promptController.getPrompts());

  let openModal = false;
</script>

<main class="bg-gray-100 text-blue-800 min-h-screen p-8">
  <h1 class="text-4xl font-bold text-center mb-6">AI Prompt - DEMO -</h1>

  <div class="flex flex-col md:flex-row w-full h-full">
    <Chatbot />
    <div class="flex flex-col gap-5">
      <h1 class="text-3xl font-bold mb-4 text-center p-4">Tools</h1>
      <button
        on:click={() => {
          openModal = true;
        }}
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Custom GPT
      </button>
    </div>
  </div>
  <Modal
    title={"Custom GPT"}
    open={openModal}
    close={() => {
      openModal = false;
    }}
  >
    <PromptManager />
  </Modal>
</main>
