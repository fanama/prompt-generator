<script lang="ts">
  export let open: boolean;
  export let close: Function;

  export let title = "test";
</script>

<div>
  {#if open}
    <div
      class="absolute flex flex-col top-1/3 left-1/3 w-1/2 h-1/2 bg-white p-4 rounded-lg shadow-lg"
    >
      <div class="flex flex-row justify-between w-full">
        <h2 class="text-lg font-bold">{title}</h2>
        <button
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          on:click={() => close()}
        >
          Close
        </button>
      </div>
      <div class="overflow-y-auto">
        <slot />
      </div>
    </div>
  {/if}
</div>
