<script lang="ts">
  export let value = "";

  function escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  $: result = value
    .split("\n")
    .map((v) => {
      return `<div><span>${escapeHtml(v)}</span></div>`;
    })
    .join("");
</script>

<div class="bg-gray-200 border rounded m-4 p-4">
  <div
    class="text-blue-800 preserve-whitespace"
    contenteditable="false"
    bind:innerHTML={result}
  ></div>
</div>

<style>
  .preserve-whitespace {
    white-space: pre-wrap;
  }
</style>
