<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";

    export let lowerRange: number;
    export let upperRange: number;
    export let backgroundValue: number;
    export let defaultValue: number;

    //let currentValue: number = defaultValue;
    let dragging: boolean = false;

    const dispatch = createEventDispatcher();

    const getDrawPos = (value: number) => {
        return ((value - lowerRange) / (upperRange - lowerRange)) * 420;
    }

    const posToValue = (pos: number) => {
        return (pos / 420) * (upperRange - lowerRange) + lowerRange;
    }

    const dropOff = () => dispatch('dropoff', defaultValue);

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
<div class="bar" on:pointerdown={e => {dragging = true; onDragged(e); dragging = false; dropOff();}}>
    <div class="inner" style="width: {getDrawPos(defaultValue)}px">
    </div>
    <div class="back" style="width: {getDrawPos(backgroundValue)}px"></div>
    <button 
        class="slider" 
        style="left: {getDrawPos(defaultValue)}px" 
        on:mousedown={_ => dragging = true} 
        on:mousemove={onDragged} 
        on:mouseup={_ => { dragging = false; dropOff();} }></button>
</div>