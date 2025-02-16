<script lang="ts">
  import { onMount } from "svelte";

  export let textValue = "";
  let speakButton: HTMLButtonElement;
  let stopButton: HTMLButtonElement;
  let languageSelect: HTMLSelectElement;
  let synth = window.speechSynthesis;
  let isSpeaking = false;

  onMount(() => {
    // Initialize the language select element
    languageSelect.value = "en-US"; // Default language
  });

  function startSpeaking() {
    if (synth.speaking) {
      synth.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(textValue);
    utterance.lang = languageSelect.value; // Set the language
    synth.speak(utterance);
    isSpeaking = true;
    speakButton.disabled = true;
    stopButton.disabled = false;

    utterance.onend = () => {
      isSpeaking = false;
      speakButton.disabled = false;
      stopButton.disabled = true;
    };
  }

  function stopSpeaking() {
    if (isSpeaking) {
      synth.cancel();
      isSpeaking = false;
      speakButton.disabled = false;
      stopButton.disabled = true;
    }
  }
</script>

<div class="flex flex-col space-y-4">
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
  <div class="flex space-x-2">
    <button
      id="speakButton"
      bind:this={speakButton}
      class="px-4 py-2 text-white bg-blue-500 rounded-md"
      on:click={startSpeaking}
    >
      Speak
    </button>
    <button
      id="stopButton"
      bind:this={stopButton}
      disabled
      class="px-4 py-2 text-white bg-red-500 rounded-md"
      on:click={stopSpeaking}
    >
      Stop
    </button>
  </div>
</div>
