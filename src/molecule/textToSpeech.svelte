<script lang="ts">
  import { onMount } from "svelte";

  let languageSelect: HTMLSelectElement;
  let speakButton: HTMLButtonElement;
  let stopButton: HTMLButtonElement;
  let textInput: HTMLTextAreaElement;

  export let textValue: string;

  let synth: SpeechSynthesis;
  let utterance: SpeechSynthesisUtterance;

  onMount(() => {
    synth = window.speechSynthesis;
    utterance = new SpeechSynthesisUtterance();

    utterance.onstart = () => {
      speakButton.disabled = true;
      stopButton.disabled = false;
    };

    utterance.onend = () => {
      speakButton.disabled = false;
      stopButton.disabled = true;
    };

    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      console.error("Speech synthesis error detected:", event.error);
      alert("An error occurred during speech synthesis.");
      speakButton.disabled = false;
      stopButton.disabled = true;
    };
  });

  function startSpeaking() {
    utterance.text = textInput.value;
    utterance.lang = languageSelect.value;
    synth.speak(utterance);
  }

  function stopSpeaking() {
    synth.cancel();
    speakButton.disabled = false;
    stopButton.disabled = true;
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-6 bg-white shadow-md rounded-lg">
    <label for="languageSelect" class="block mb-2 text-gray-700"
      >Select Language:</label
    >
    <select
      id="languageSelect"
      bind:this={languageSelect}
      class="w-full p-2 mb-4 border border-gray-300 rounded-md"
    >
      <option value="en-US">English (US)</option>
      <option value="es-ES">Spanish (Spain)</option>
      <option value="fr-FR">French (France)</option>
      <option value="de-DE">German (Germany)</option>
      <!-- Add more languages as needed -->
    </select>

    <textarea
      id="textInput"
      hidden
      bind:this={textInput}
      bind:value={textValue}
      class="w-full p-2 mb-4 border border-gray-300 rounded-md"
      rows="4"
    ></textarea>
    <div class="flex space-x-2">
      <button
        id="speakButton"
        bind:this={speakButton}
        class="px-4 py-2 text-white bg-blue-500 rounded-md"
        on:click={startSpeaking}>Speak</button
      >
      <button
        id="stopButton"
        bind:this={stopButton}
        disabled
        class="px-4 py-2 text-white bg-red-500 rounded-md"
        on:click={stopSpeaking}>Stop</button
      >
    </div>
  </div>
</div>
