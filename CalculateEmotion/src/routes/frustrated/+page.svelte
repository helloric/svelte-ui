<script>
    import "$lib/botface.css";
    import base from "$lib/assets/base.svg";
    import eye from "$lib/assets/eye_frustrated.svg";
    import mouth from "$lib/assets/mouth_frustrated.svg";
    import closedEye from "$lib/assets/eye_sleeping.svg";
    import { doBlinking } from "$lib/faceanimation";
    import { onMount } from "svelte";

    const { isBlinking, setupBlinking } = doBlinking();

    onMount(() => {
        const cleanup = setupBlinking();
        return cleanup;
    });
</script>

<h1>RICBOT is frustrated</h1>

<div class="faceContainter">
    <img src={base} alt="" class="base" />


    {#if $isBlinking}
        <img src={closedEye} alt="" class="eyeR" />
    {:else}
        <img src={eye} alt="" class="eyeR" />
    {/if}

    {#if $isBlinking}
        <img src={closedEye} alt="" class="eyeL" />
    {:else}
        <img src={eye} alt="" class="eyeL" />
    {/if}

    
    <img src={mouth} alt="" class="mouth" />
</div>
