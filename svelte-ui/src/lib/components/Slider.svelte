<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

    /** The lowest value possible for the bar to select. */
    export let lowerRange: number;

    /** The highest value possible for the bar to select. */
    export let upperRange: number;

    /** The value that should be displayed for the background bar. */
    export let backgroundValue: number;

    /** The default value that the slider should be set to. */
    export let defaultValue: number;

    /** Is the slider currently being dragged? */
    let dragging: boolean = false;

    /** The bar width. */
    const BAR_WIDTH = 400;

    /** The dispatcher that broadcasts the dropoff-event. */
    const dispatch = createEventDispatcher();

    /** Which position on the bar corresponds to the slider value? */
    const getDrawPos = (value: number) => {
        return ((value - lowerRange) / (upperRange - lowerRange)) * BAR_WIDTH;
    }

    /** Which slider value corresponds to a positon on the bar? */
    const posToValue = (pos: number) => {
        return (pos / BAR_WIDTH) * (upperRange - lowerRange) + lowerRange;
    }

    /** Called each time the slider is placed. Dispatches the value that the slider has at the new position. */
    const dropOff = () => dispatch('dropoff', defaultValue);

    /** Moves the slider and updates the value, if being dragged. */
    const onDragged = (e: MouseEvent) => {

        if (!dragging)
            return;
        let elem = document.querySelector('div.bar')!!;
        let rect = elem.getBoundingClientRect();
        let offsetLeft = rect.left;

        let val = posToValue(e.pageX - offsetLeft);

        if (val > upperRange) {
            defaultValue = upperRange;
        } else if (val < lowerRange) {
            defaultValue = lowerRange;
        } else {
            defaultValue = val;
        }
    }

    onMount(() => {
        if (upperRange < lowerRange) {
            console.error(`UpperRange must be larger than LowerRange (UpperRange ${upperRange} < LowerRange ${lowerRange})`);
        }
    })
</script>

<style>
    .bar {
        width: 400px;
        height: 40px;
        background-color: red;
    }

    .inner {
        position: absolute;
        background-color: green;
        height: 40px;
    }

    .back {
        position: absolute;
        background-color: rgba(0,0,0,0.5);
        height: 40px;
    }

    .slider {
        position: absolute;
        background-color: gray;
        border: none;
        height: 40px;
        width: 5px;
    }
</style>

<p>Lower Range: {lowerRange}, Upper Range: {upperRange}, Current: {Number(defaultValue).toFixed(2)}, Background: {Number(backgroundValue).toFixed(2)}</p>
<div class="bar" onpointerdown={
  e => {
    dragging = true;
    onDragged(e);
    dragging = false;
    dropOff();
  }}>
  <div class="inner" style="width: {getDrawPos(defaultValue)}px"></div>
  <div class="back" style="width: {getDrawPos(backgroundValue)}px"></div>
  <button aria-label="slide-button"
    class="slider" 
    style="left: {getDrawPos(defaultValue)}px" 
    onmousedown={_ => dragging = true} 
    onmousemove={onDragged} 
    onmouseup={_ => { dragging = false; dropOff();} }></button>
</div>