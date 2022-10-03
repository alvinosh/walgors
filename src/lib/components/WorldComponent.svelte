<script lang="ts">
  import { Astar, Cells, World } from 'wasm';
  import { ToolbarActionsEnum } from '../types';
  import { activeCell, event } from '../stores';
  import Cell from './Cell.svelte';

  let world: World = World.new(10, 10, 1, 1, 8, 8);

  let cells = world.get_world();
  let algorithm: Astar | undefined = undefined;
  let clicked: boolean = false;
  let solving: boolean = false;
  let solved: boolean = false;
  let paused: boolean = false;

  function resize(
    width: number,
    height: number,
    start_x: number,
    start_y: number,
    end_x: number,
    end_y: number
  ) {
    world = World.new(width, height, start_x, start_y, end_x, end_y);
    cells = world.get_world();
  }

  function reset() {
    clicked = false;
    solving = false;
    solved = false;
    paused = true;
    algorithm = undefined;
    world.clear();
    cells = world.get_world();
  }

  function solve() {
    reset();
    algorithm = Astar.new(world);
    while (!algorithm.tick(world)) {}
    cells = world.get_world();
    solving = false;
    solved = true;
    algorithm = undefined;
    cells = world.get_world();
  }

  function animate(step: boolean = false) {
    solving = true;
    if (algorithm == undefined) {
      world.clear();
      algorithm = Astar.new(world);
    }
    if (step && !solved) {
      if (algorithm.tick(world)) {
        solving = false;
        solved = true;
      }
    }

    cells = world.get_world();
    let complete = false;
    if (!paused && !solved && !step) {
      complete = algorithm.tick(world);

      if (!complete) {
        requestAnimationFrame(() => animate());
      } else {
        solving = false;
        solved = true;
      }
    }
  }

  function step() {
    animate(true);
  }

  function pause() {
    paused = true;
  }

  function unpause() {
    paused = false;
  }

  const CELL_SIZE = 50;
  const OFFSET = 6;

  let window_height = 0;
  let window_width = 0;

  const setPrimaryButtonState = (e) => {
    let flags = e.buttons !== undefined ? e.buttons : e.which;
    clicked = (flags & 1) === 1;
  };

  event.subscribe((value) => {
    switch (value) {
      case ToolbarActionsEnum.RESET:
        reset();
        break;
      case ToolbarActionsEnum.PLAY:
        unpause();
        animate();
        break;
      case ToolbarActionsEnum.PAUSE:
        pause();
        break;
      case ToolbarActionsEnum.STEP:
        step();
        break;
    }
  });

  const onClick = (idx: number, sliding: boolean) => {
    if (sliding && !clicked) return;
    switch ($activeCell) {
      case Cells.Start:
        world.set_start(idx);

        break;
      case Cells.End:
        world.set_end(idx);

        break;
      case Cells.Wall:
        world.set_wall(idx);
        break;
      case Cells.Empty:
        world.set_empty(idx);
        break;
    }

    if (solved) {
      solve();
    }

    cells = world.get_world();
  };

  $: {
    let cols = Math.ceil(window_width / CELL_SIZE);
    let rows = Math.ceil(window_height / CELL_SIZE);
    if (cols >= 1 && rows >= 1)
      resize(cols, rows, OFFSET - 1, OFFSET - 1, cols - OFFSET, rows - OFFSET);
  }
</script>

<svelte:window
  bind:innerHeight="{window_height}"
  bind:innerWidth="{window_width}"
  on:mousedown="{setPrimaryButtonState}"
  on:mouseup="{setPrimaryButtonState}"
  on:mousemove="{setPrimaryButtonState}"
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
        onClick(idx, false);
      }}"
      on:mouseover="{() => {
        onClick(idx, true);
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
