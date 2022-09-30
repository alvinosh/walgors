<script lang="ts">
    import {fade} from 'svelte/transition';

    import {Cells} from 'wasm';

    export let cell: Cells;
    export let idx: number;
    export let size: number = 10;
</script>

<div
  on:click
  on:mouseover
  transition:fade
  class:empty="{cell === Cells.Empty}"
  class:path="{cell === Cells.Path}"
  class:wall="{cell === Cells.Wall}"
  class:start="{cell === Cells.Start}"
  class:end="{cell === Cells.End}"
  class:open="{cell === Cells.Open}"
  class:closed="{cell === Cells.Closed}"
  class:animate="{cell !== Cells.Empty}"
  class="cell"
  style="{`
    width: ${size}px;
    height:  ${size}px;
  `}"
></div>

<style lang="scss">
  @use 'nodes';

  .cell {
    border: none !important;
  }

  .animate {
    animation-name: popup;
    animation-duration: 0.1s;
    animation-timing-function: ease-out;
    animation-delay: 0s;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
  }

  @keyframes popup {
    0% {
      transform: scale(0.1);
      border-radius: 100%;
    }

    50% {
    }

    75% {
      transform: scale(1.2);
      border-radius: 100%;
    }

    100% {
      transform: scale(1);
    }
  }
</style>
