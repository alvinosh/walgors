<script lang="ts">
  import { Cells } from 'wasm';

  interface CellOption {
    name: string;
    cell: Cells;
    icon: string;
  }

  let options: CellOption[] = [
    {
      name: 'Eraser',
      cell: Cells.Empty,
      icon: 'svelte.svg'
    },
    {
      name: 'Start',
      cell: Cells.Start,
      icon: 'svelte.svg'
    },
    {
      name: 'End',
      cell: Cells.End,
      icon: 'svelte.svg'
    }
  ];
</script>

<div class="container">
  {#each options as cell}
    <p>{cell.name}</p>
  {/each}
</div>

<style>
  .container {
    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: #222e50;
    color: #bcd8c1;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;

    overflow: hidden;
  }
</style>
