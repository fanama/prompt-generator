<script lang="ts">
  import type { Prompt } from "../domain/entity/prompt";

  export let prompt: Prompt;
</script>

<div
  class="bg-gray-300 text-blue-800 w-full p-8 h-fit m-5 shadow-lg rounded-lg"
>
  <h1 class="text-3xl font-bold mb-6">Create a Custom GPT</h1>

  <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold mb-3">Title</h2>
    <p
      class="w-full p-3 text-sm bg-gray-300 text-blue-800 border-none rounded-lg"
    >
      {prompt.title}
    </p>
  </div>

  <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold mb-3">Objectif</h2>
    <p
      class="w-full p-3 text-sm bg-gray-300 text-blue-800 border-none rounded-lg"
    >
      {prompt.objectif}
    </p>
  </div>

  <div class="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-2xl font-semibold mb-3">Instruction</h2>
    <p
      class="w-full p-3 text-sm bg-gray-300 text-blue-800 border-none rounded-lg"
    >
      {prompt.instruction}
    </p>
  </div>
</div>
