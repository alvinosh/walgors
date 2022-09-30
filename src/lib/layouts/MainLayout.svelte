<script lang="ts">
  import CellSelector from "../components/CellSelector.svelte";
  import WorldComponent from "../components/WorldComponent.svelte";
</script>

<div class="fixed world">
  <WorldComponent />
</div>

<div class="fixed window">
  <div class="selector">
    <CellSelector />
  </div>
</div>

<style>
  .selector {
    width: 100px;
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
