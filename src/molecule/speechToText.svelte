<script lang="ts">
  import { onMount } from "svelte";

  let languageSelect: HTMLSelectElement;
  let startButton: HTMLButtonElement;
  let stopButton: HTMLButtonElement;
  let outputDiv: HTMLDivElement;

  export let result: string = "";

  let recognition: any;
  let isListening = false;

  onMount(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true; // Keep listening even after a pause
      recognition.interimResults = true; // Show interim results
      recognition.maxAlternatives = 1; // Number of possible transcriptions

      recognition.onstart = () => {
        isListening = true;
        startButton.textContent = "Listening...";
        startButton.disabled = true;
        stopButton.disabled = false;
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        outputDiv.textContent = transcript;
        result += transcript;
      };

      recognition.onend = () => {
        isListening = false;
        startButton.textContent = "Start Voice Input";
        startButton.disabled = false;
        stopButton.disabled = true;
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error detected:", event.error);
        let errorMessage = "";
        switch (event.error) {
          case "network":
            errorMessage =
              "Network error. Please check your internet connection.";
            break;
          case "not-allowed":
            errorMessage = "Permission to use microphone is blocked.";
            break;
          case "no-speech":
            errorMessage = "No speech was detected.";
            break;
          case "audio-capture":
            errorMessage = "Microphone is not available.";
            break;
          default:
            errorMessage = "An error occurred during speech recognition.";
            break;
        }
        outputDiv.textContent = errorMessage;
        startButton.disabled = false;
        stopButton.disabled = true;
      };
    } else {
      outputDiv.textContent =
        "Your browser does not support speech recognition.";
    }
  });

  function startRecording() {
    if (recognition) {
      recognition.lang = languageSelect.value; // Update language before starting
      recognition.start();
    }
  }

  function stopRecording() {
    if (recognition) {
      recognition.stop();
    }
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
    <div class="flex space-x-2">
      <button
        id="startButton"
        bind:this={startButton}
        class="px-4 py-2 text-white bg-blue-500 rounded-md"
        on:click={startRecording}>Start Voice Input</button
      >
      <button
        id="stopButton"
        bind:this={stopButton}
        disabled
        class="px-4 py-2 text-white bg-red-500 rounded-md"
        on:click={stopRecording}>Stop Voice Input</button
      >
    </div>
    <div
      id="output"
      bind:this={outputDiv}
      hidden
      class="mt-4 p-4 border border-gray-300 rounded-md bg-gray-50"
    ></div>
  </div>
</div>
