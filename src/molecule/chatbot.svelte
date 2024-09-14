<script lang="ts">
  import {
    ollamaCall,
    getModels,
    ollamaIsRunning,
  } from "../infra/service/ollama";

  import type { MessageList } from "../domain/entity/message";

  import Markdown from "../atoms/markdown.svelte";
  import { onMount } from "svelte";
  import type { Prompt } from "../domain/entity/prompt";
  import { promptStore } from "../lib/store";
  import { LocalStorage } from "../infra/service/localStorage";

  let historyStorageController = new LocalStorage<MessageList>("history", [
    { id: 0, title: "default", messages: [] },
  ]);

  let canCallOllama = false;
  let session: MessageList = { id: 0, title: "default", messages: [] };
  let input = "";
  let response = "";
  let loading = false;
  let model = "llama3";
  let models: string[] = [];
  let history: MessageList[] = [];
  $: useCases = $promptStore;
  let useCase: Prompt = {
    title: "None",
    objectif: "",
    instruction: "",
  };

  //if tittle change update the history title corresponding
  // Function to update the title in the history array
  function updateTitleInHistory(id: number) {
    history = history.map((item) => ({
      ...item,
      title: item.id == id ? session.title : item.title,
    }));
  }

  onMount(async () => {
    history = historyStorageController.getAll();
    canCallOllama = await ollamaIsRunning();
    models = await getModels();
    session = history[0];
    model = models[0];
  });

  $: prompt =
    useCase.title !== "None"
      ? `## Objectif \n
     ${useCase.objectif} \n\n
      ## Input \n
     ${input}\n\n
     ## Instruction \n
     ${useCase.instruction} 

     `
      : ` ${session.messages.slice(-5).join("\n")} \n  ${input}`;

  async function Call() {
    response = "bot : ";
    loading = true;
    session = { ...session, messages: [...session.messages, `you : ${input}`] };
    await ollamaCall(
      prompt,
      (text: string) => {
        response += text;
      },
      model,
    );

    loading = false;
    session = { ...session, messages: [...session.messages, response] };
    SaveMessagesToHistory(session.id);
    historyStorageController.save(history);

    response = "";
    input = "";
  }

  function selectMessage(selectedConv: MessageList) {
    session = selectedConv;
  }

  function NewConversation(newTitle: string = "New Conversation") {
    // Add a new object to the end of the array
    const id = history.length;
    history = [
      ...history,
      { id, title: `${newTitle}-${history.length}`, messages: [] },
    ];
    session = { id, title: `${newTitle}-${history.length - 1}`, messages: [] };
  }

  function SaveMessagesToHistory(id: number) {
    const existingIndex = history.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      // Update the corresponding element
      history[existingIndex].messages = session.messages;
    } else {
      // Add a new object to the end of the array
      NewConversation();
    }
  }

  function deleteConversation(id: number) {
    const filteredHistory = history.filter((item) => item.id !== id);
    history = filteredHistory;
    historyStorageController.save(history);
  }

  $: updateTitleInHistory(session.id);
</script>

<div class="flex flex-col w-full">
  <h1 class="text-3xl font-bold mb-4 text-center p-4">Chatbot</h1>

  <div class=" flex flex-row w-full">
    <div class="flex flex-col w-1/4">
      <h2>Models</h2>
      <select
        class="block w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        bind:value={model}
      >
        {#each models as m}
          <option value={m}>{m}</option>
        {/each}
      </select>
      <h2>custom GPT</h2>
      <select
        class="block w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        bind:value={useCase}
      >
        <option
          value={{
            title: "None",
            objectif: "",
            instruction: "",
            example: "",
          }}>None</option
        >
        {#each useCases as u}
          <option value={u}>{u.title}</option>
        {/each}
      </select>
      <h2>Conversations</h2>
      <button
        class="px-1 py-2 m-2 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
        on:click={() => {
          NewConversation("New Conversation");
        }}>New Conversation</button
      >
      <div class="h-40 overflow-scroll p-1 gap-1">
        {#each history as element}
          <div class="grid grid-cols-3 p-1 bg-gray-200 hover:bg-gray-300 p-1">
            {element.title}
            <button
              class="p-1 bg-blue-400 hover:bg-blue-700 text-white"
              on:click={() => selectMessage(element)}
            >
              select
            </button>
            <button
              class="p-1 bg-red-400 text-white hover:bg-red-700"
              on:click={() => deleteConversation(element.id)}>delete</button
            >
          </div>
        {/each}
      </div>
    </div>
    <div class="rounded-md h-96 w-full m-2 border p-2 overflow-scroll">
      <div>
        <input type="text" bind:value={session.title} />
      </div>
      {#each session.messages as message}
        <Markdown value={message} />
      {/each}
      {#if response}
        <Markdown value={response} />
      {/if}
    </div>
  </div>
  <textarea
    class="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    bind:value={input}
    on:keydown={(e) => {
      if (e.key === "Enter") {
        Call();
      }
    }}
  ></textarea>

  <button
    class="px-6 py-2 text-white font-bold bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:bg-blue-500 focus:ring-2 focus:ring-blue-300 active:bg-blue-800 transition duration-150 ease-in-out"
    on:click={Call}
  >
    Send
  </button>
</div>
