<script lang="ts">
  import { onMount } from "svelte";
  import * as webllm from "@mlc-ai/web-llm";

  interface Message {
    content: string;
    role: "system" | "user" | "assistant";
  }

  let messages: Message[] = [
    {
      content: "You are a helpful AI agent helping users.",
      role: "system",
    },
  ];

  let availableModels: string[] = [];
  let selectedModel: string = "Llama-3-8B-Instruct-q4f32_1-MLC-1k";
  let downloadStatus: string = "";
  let isDownloading: boolean = false;
  let isSending: boolean = false;
  let chatStats: string = "";
  let userInput: string = "";

  const engine = new webllm.MLCEngine();

  onMount(async () => {
    availableModels = webllm.prebuiltAppConfig.model_list.map(
      (m) => m.model_id,
    );
  });

  function updateEngineInitProgressCallback(report: {
    text: string;
    progress: number;
  }): void {
    downloadStatus = report.text;
  }

  async function initializeWebLLMEngine(): Promise<void> {
    isDownloading = true;
    selectedModel = (
      document.getElementById("model-selection") as HTMLSelectElement
    ).value;
    const config = {
      temperature: 1.0,
      top_p: 1,
    };
    engine.setInitProgressCallback(updateEngineInitProgressCallback);
    await engine.reload(selectedModel, config);
    isDownloading = false;
  }

  async function streamingGenerating(
    messages: Message[],
    onUpdate: (content: string) => void,
    onFinish: (finalMessage: string) => void,
    onError: (error: Error) => void,
  ): Promise<void> {
    try {
      let curMessage = "";
      const completion = await engine.chat.completions.create({
        stream: true,
        messages,
      });
      for await (const chunk of completion) {
        const curDelta = chunk.choices[0].delta.content;
        if (curDelta) {
          curMessage += curDelta;
        }
        onUpdate(curMessage);
      }
      const finalMessage = await engine.getMessage();
      onFinish(finalMessage);
    } catch (err) {
      onError(err as Error);
    }
  }

  function appendMessage(message: Message): void {
    messages = [...messages, message];
  }

  function updateLastMessage(content: string): void {
    messages[messages.length - 1].content = content;
    messages = messages; // Trigger reactivity
  }

  async function onMessageSend(): Promise<void> {
    if (userInput.trim().length === 0) return;

    isSending = true;
    const message: Message = {
      content: userInput.trim(),
      role: "user",
    };
    appendMessage(message);

    userInput = "";
    const aiMessage: Message = {
      content: "typing...",
      role: "assistant",
    };
    appendMessage(aiMessage);

    const onFinishGenerating = (finalMessage: string): void => {
      updateLastMessage(finalMessage);
      isSending = false;
      engine.runtimeStatsText().then((statsText) => {
        chatStats = statsText;
      });
    };

    streamingGenerating(
      messages,
      updateLastMessage,
      onFinishGenerating,
      console.error,
    );
  }
</script>

<div class="flex flex-col w-full">
  <p class="text-lg font-semibold mb-4">
    Step 1: Initialize WebLLM and Download Model
  </p>
  <div class="flex items-center space-x-4 mb-6">
    <select
      id="model-selection"
      bind:value={selectedModel}
      class="border rounded px-4 py-2"
    >
      {#each availableModels as modelId}
        <option value={modelId}>{modelId}</option>
      {/each}
    </select>
    <button
      id="download"
      on:click={initializeWebLLMEngine}
      disabled={isDownloading}
      class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isDownloading ? "Downloading..." : "Download"}
    </button>
  </div>
  <p id="download-status" class={isDownloading ? "text-gray-600" : "hidden"}>
    {downloadStatus}
  </p>

  <p class="text-lg font-semibold mb-4">Step 2: Chat</p>
  <div class="chat-container space-y-4">
    <div
      id="chat-box"
      class="h-80 overflow-y-auto border rounded p-4 bg-gray-100"
    >
      {#each messages as message}
        <div
          class="message-container flex {message.role === 'user'
            ? 'justify-end'
            : 'justify-start'} mb-2"
        >
          <div
            class="message p-3 rounded-lg max-w-xs {message.role === 'user'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'}"
          >
            {message.content}
          </div>
        </div>
      {/each}
    </div>
    <div id="chat-stats" class={chatStats ? "text-gray-600" : "hidden"}>
      {chatStats}
    </div>
    <div class="chat-input-container flex space-x-4">
      <input
        type="text"
        id="user-input"
        bind:value={userInput}
        placeholder="Type a message..."
        class="flex-1 border rounded px-4 py-2"
      />
      <button
        id="send"
        on:click={onMessageSend}
        disabled={isSending}
        class="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSending ? "Sending..." : "Send"}
      </button>
    </div>
  </div>
</div>
