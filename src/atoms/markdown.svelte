<script lang="ts">
  export let value = "";

  function parseMarkdown(markdown: string): string {
    // Basic Markdown parsing rules
    let html = markdown
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
      .replace(/\*(.*)\*/gim, "<i>$1</i>")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/^\s*\n\*\s*(.*)/gm, "<ul><li>$1</li></ul>")
      .replace(/^\*\s*(.*)/gm, "<li>$1</li>")
      .replace(/^\s*\n\d\.\s*(.*)/gm, "<ol><li>$1</li></ol>")
      .replace(/^\d\.\s*(.*)/gm, "<li>$1</li>")
      .replace(/\n$/gim, "<br />");

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, function (_, p1) {
      return '<div class="bg-black p-2" ><code>' + p1.trim() + "</code></div>";
    });

    // Fix nested lists
    html = html.replace(/<\/ul>\s*<ul>/gim, "").replace(/<\/ol>\s*<ol>/gim, "");

    return html.trim();
  }

  // $: result = parseMarkdown(value);

  $: result = value
    .split("\n")
    .map((v) => {
      return `<div>${v}</div>`;
    })
    .join("");
</script>

<div class="bg-gray-400 border rounded m-4 p-4">
  <div
    class="text-blue-800"
    contenteditable="false"
    bind:innerHTML={result}
  ></div>
</div>
