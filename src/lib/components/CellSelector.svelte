<script lang="ts">
  import { Cells } from 'wasm';
  import { activeCell } from '../stores/stores';

  interface CellOption {
    name: string;
    cell: Cells;
    class: string;
  }

  let options: CellOption[] = [
    {
      name: 'Eraser',
      cell: Cells.Empty,
      class: 'eraser'
    },
    {
      name: 'Start',
      cell: Cells.Start,
      class: 'start'
    },
    {
      name: 'End',
      cell: Cells.End,
      class: 'end'
    },
    {
      name: 'Wall',
      cell: Cells.Wall,
      class: 'wall'
    }
  ];

  const setActive = (cell: Cells): void => {
    activeCell.set(cell);
  };
</script>

<ul class="container">
  {#each options as cell}
    <li
      class="option"
      class:active="{cell.cell === $activeCell}"
      on:click="{() => {
        setActive(cell.cell);
      }}"
    >
      <div class="icon {cell.class}"></div>
      <p>{cell.name}</p>
    </li>
  {/each}
</ul>

<style lang="scss">
  @use 'colors';
  @use 'nodes'; //$tool-bar-color: white;

  .icon {
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
  }

  li.option {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0.5rem 1.5rem;
    gap: 0.75rem;

    cursor: pointer;

    p {
      font-family: Roboto, sans-serif;
    }
  }

  li.option.active {
    background-color: colors.$active-tool-bar-color;

    .icon {
      border: none !important;
    }

    p {
      color: colors.$active-text-color;
    }
  }

  ul.container {
    list-style: none;

    width: 100%;
    height: 100%;

    border-radius: 15px;

    background-color: colors.$tool-bar-color;
    color: #bcd8c1;

    padding: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;

    overflow: hidden;
  }
</style>
