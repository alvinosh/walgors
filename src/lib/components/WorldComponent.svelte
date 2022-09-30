<script lang="ts">
  import { Cells, World } from 'wasm';
  import Cell from './Cell.svelte';
  import { activeCell } from '../stores/stores';

  const CELL_SIZE = 100;
  const OFFSET = 3;

  let window_height = 0;
  let window_width = 0;

  let world: World = World.new(10, 10, 1, 1, 8, 8);
  let cells = world.get_world();

  let clicked = false;

  let active: Cell;
  activeCell.subscribe((value) => {
    active = value;
  });

  const setClick = (idx: number) => {
    switch (active) {
      case Cells.Start:
        world.set_start(idx);
        break;
      case Cells.End:
        world.set_end(idx);
        break;
    }

    cells = world.get_world();
  };

  const setHover = (idx: number) => {
    switch (active) {
      case Cells.Wall:
        world.set_wall(idx);
        break;
      case Cells.Empty:
        world.set_empty(idx);
        break;
    }

    cells = world.get_world();
  };

  $: {
    let cols = Math.ceil(window_width / CELL_SIZE);
    let rows = Math.ceil(window_height / CELL_SIZE);
    if (cols >= 1 && rows >= 1)
      world = World.new(
        cols,
        rows,
        OFFSET - 1,
        OFFSET - 1,
        cols - OFFSET,
        rows - OFFSET
      );
    cells = world.get_world();
  }
</script>

<svelte:window
  bind:innerHeight="{window_height}"
  bind:innerWidth="{window_width}"
  on:mousedown="{() => (clicked = true)}"
  on:mouseup="{() => (clicked = false)}"
/>

<div
  class="container"
  style="{`
  grid-template-columns:repeat(${world.get_width()}, auto);
  grid-template-rows:repeat(${world.get_height()}, auto);
`}"
>
  {#each cells as cell, idx}
    <Cell
      cell="{cell}"
      size="{CELL_SIZE}"
      on:click="{() => {
        setClick(idx);
      }}"
      on:mouseover="{() => {
        if (clicked) setHover(idx);
      }}"
    />
  {/each}
</div>

<style>
  .container {
    width: fit-content;
    display: grid;
  }
</style>
