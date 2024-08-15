<script>
    import "$lib/botface.css";
    import base from "$lib/assets/base.svg";
    import eye from "$lib/assets/eye_worried.svg?raw";
    import mouth from "$lib/assets/mouth_worried.svg?raw";
    import speakingMouth from "$lib/assets/mouth_sleeping.svg?raw";
    import closedEye from "$lib/assets/eye_sleeping.svg?raw";
    import { doBlinking } from "$lib/faceanimation";
    import { isSpeaking } from "$lib/faceanimation";
    import { onMount } from "svelte";

    const { isBlinking, setupBlinking } = doBlinking();

    onMount(() => {
        const cleanup = setupBlinking();
        return cleanup;
    });
</script>

<h1>RICBOT is worried</h1>

<div class="faceContainter">
    <img src={base} alt="" class="base" />

    {#if $isBlinking}
        <div class="eyeR">
            {@html closedEye}
        </div>
    {:else}
        <div class="eyeR">
            {@html eye}
        </div>
    {/if}

    {#if $isBlinking}
        <div class="eyeL">
            {@html closedEye}
        </div>
    {:else}
        <div class="eyeL">
            {@html eye}
        </div>
    {/if}

    {#if $isSpeaking}
        <div class="speakingMouth">
            {@html speakingMouth}
        </div>
    {:else}
        <div class="mouth">
            {@html mouth}
        </div>
    {/if}
</div>
