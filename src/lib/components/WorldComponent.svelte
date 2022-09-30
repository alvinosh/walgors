<script lang="ts">
  import { World } from "wasm";
  import Cell from "./Cell.svelte";

  const CELL_SIZE = 100;
  const OFFSET = 3;

  let window_height = 0;
  let window_width = 0;

  let world: World = World.new(10, 10, 1, 1, 8, 8);
  let cells = world.get_world();

  const setStart = (idx: number) => {
    world.set_start(idx);
    cells = world.get_world();
  };

  $: {
    let cols = Math.ceil(window_width / CELL_SIZE);
    let rows = Math.ceil(window_height / CELL_SIZE);
    if (cols >= 1 && rows >= 1) world = World.new(cols, rows, OFFSET - 1, OFFSET - 1, cols - OFFSET, rows - OFFSET);
    cells = world.get_world();
  }
</script>

<svelte:window bind:innerHeight={window_height} bind:innerWidth={window_width} />

<div
  class="container"
  style={`
  grid-template-columns:repeat(${world.get_width()}, auto);
  grid-template-rows:repeat(${world.get_height()}, auto);
`}
>
  {#each cells as cell, idx}
    <Cell
      {cell}
      size={CELL_SIZE}
      on:click={() => {
        setStart(idx);
      }}
    />
  {/each}
</div>

<style>
  .container {
    width: fit-content;
    display: grid;
  }
</style>
