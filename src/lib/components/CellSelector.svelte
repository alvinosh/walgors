<script lang="ts">
</script>

<div class="container">
  <div class="node-container">
    <div class="box start"></div>
    <div class="node-text">start</div>
  </div>
  <div class="node-container">
    <div class="box end"></div>
    <div class="node-text">end</div>
  </div>
  <div class="node-container">
    <div class="box wall"></div>
    <div class="node-text">wall</div>
  </div>
  <div class="node-container">
    <div class="box eraser"></div>
    <div class="node-text">eraser</div>
  </div>
</div>

<style>
  .container {
    border-radius: 15px;

    background-color: #222e50;
    color: #bcd8c1;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;

    overflow: hidden;
  }

  .box {
    width: 30px;
    height: 30px;

    border-radius: 5px;
  }

  .node-text {
    padding-left: 5px;
    font-family: Roboto,serif;
  }

  .node-container {
    flex-grow: 1;

    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    padding: 10px 10px;

    min-width: 10vw;

    transition: all 0.2s;

    cursor: pointer;
  }

  .eraser {
    border: none !important;
    /*background-image: url("../../../assets/eraser.svg");*/
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
    background-color: #e9d985;
  }

  .active {
    background-color: #007991;
  }

  .node-container:hover:not(.active) {
    color: #007991;
  }
</style>
