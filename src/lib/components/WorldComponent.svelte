<script lang="ts">
  import { Astar, Cells, World } from 'wasm';
  import Cell from './Cell.svelte';
  import { activeCell, event } from '../stores/stores';
  import { ToolbarActionsEnum } from '../types/toolbar-actions.enum';

  const CELL_SIZE = 50;
  const OFFSET = 6;

  let window_height = 0;
  let window_width = 0;

  let world: World = World.new(10, 10, 1, 1, 8, 8);
  let cells = world.get_world();

  let clicked = false;
  let solving = false;
  let solved = false;
  let paused = false;
  let astar;
  let finished = false;

  event.subscribe((value) => {
    switch (value) {
      case ToolbarActionsEnum.RESET:
        resetState();
        break;
      case ToolbarActionsEnum.PLAY:
        paused = false;
        astar ? animate() : startAnimation();
        break;
      case ToolbarActionsEnum.PAUSE:
        paused = true;
        break;
      case ToolbarActionsEnum.STEP:
        astar ? step() : startAnimation();
        break;
    }
  });

  const setPrimaryButtonState = (e) => {
    let flags = e.buttons !== undefined ? e.buttons : e.which;
    clicked = (flags & 1) === 1;
  };

  const resetState = () => {
    clicked = false;
    solving = false;
    solved = false;
    paused = false;
    astar;
    finished = false;
    world.clear();
    cells = world.get_world();
  };

  const solve = () => {
    solving = true;
    world.clear();
    let astar = Astar.new(world);
    while (!astar.tick(world)) {}
    cells = world.get_world();
    solving = false;
    solved = true;
  };

  const startAnimation = () => {
    solving = true;
    world.clear();
    astar = Astar.new(world);

    animate();
  };

  const animate = () => {
    if (!paused) {
      finished = astar.tick(world);
    }
    cells = world.get_world();
    if (!finished) {
      requestAnimationFrame(() => animate());
    } else {
      solving = false;
      solved = true;
    }
  };

  const step = () => {
    finished = astar.tick(world);
    cells = world.get_world();
    if (finished) {
      solving = false;
      solved = true;
    }
  };

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
      idx="{idx}"
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

  button {
    left: 3rem;
    position: absolute;
    font-size: 1.5rem;
  }

  .animate {
    top: 3rem;
  }

  .solve {
    top: 6rem;
  }

  .reset {
    top: 9rem;
  }
</style>
