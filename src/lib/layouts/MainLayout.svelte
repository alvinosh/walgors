<script lang="ts">
  import CellSelector from '../components/CellSelector.svelte';
  import WorldComponent from '../components/WorldComponent.svelte';
  import ToolBar from '../components/ToolBar.svelte';
</script>

<div class="fixed world">
  <WorldComponent />
</div>

<div class="fixed window">
  <div class="selector">
    <CellSelector />
  </div>
  <div class="toolbar">
    <ToolBar />
  </div>
</div>

<style>
  .selector {
    width: 10rem;
    /*height: 20rem;*/
    position: absolute;
    top: 50%;
    right: 0.5rem;

    transform: translate(0, -50%);
  }

  .toolbar {
    position: absolute;
    left: 50%;
    top: 0.5rem;
    transform: translate(-50%, 0);

    height: 6rem;
  }

  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .world {
    z-index: 1;
  }

  .window {
    pointer-events: none;
    z-index: 2;
  }

  .window > * {
    pointer-events: auto;
  }
</style>
