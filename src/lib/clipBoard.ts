class ClipBoard {
  async copy(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
}

const clipboard = new ClipBoard();
export default clipboard;
