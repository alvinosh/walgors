<script lang="ts"
>
    import Fa from 'svelte-fa'
    import {faArrowRotateLeft, faPlay, faArrowRotateRight, faPause} from '@fortawesome/free-solid-svg-icons'
    import {ToolbarActionsEnum} from "../types";
    import {event} from "../stores";

    let paused = false;


    const dispatchReset = () => {
        event.set(null);
        event.set(ToolbarActionsEnum.RESET)
    }
    const dispatchPausePlay = () => {
        event.set(null);
        paused ? event.set(ToolbarActionsEnum.PAUSE) : event.set(ToolbarActionsEnum.PLAY);
        paused = !paused;
    }

    const dispatchStep = () => {
        event.set(null);
        event.set(ToolbarActionsEnum.STEP)
    }


</script>


<div class="container">
    <div class="buttons">
        <div class="icon" on:click={() => dispatchReset()}>
            <Fa style="font-size: 2rem; color: #ff6363; cursor: pointer;" icon={faArrowRotateLeft}/>
        </div>
        <div class="icon" on:click={() => dispatchPausePlay()}>
            <Fa style="font-size: 2rem; color: #ff6363; cursor: pointer;" icon={paused ? faPause : faPlay}/>
        </div>
        <div class="icon" on:click={() => dispatchStep()}>
            <Fa style="font-size: 2rem; color: #ff6363; cursor: pointer;" icon={faArrowRotateRight}/>
        </div>

    </div>
</div>

<style>
    .container {
        /*width: 600px;*/
        height: 100%;
        background-color: #000935;
        border-radius: 0.5rem;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }


    .buttons {
        padding: 2rem;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        gap: 20px;

        height: 100%;
    }

    .icon {
        width: 2rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
    }

    .icon:first-child {
        transition: all 0.2s;
    }

    .icon:first-child:hover {
        transform: rotate(-60deg);
    }

    .icon:last-child {
        transition: all 0.2s;
    }

    .icon:last-child:hover {
        transform: rotate(60deg);
    }


</style>
