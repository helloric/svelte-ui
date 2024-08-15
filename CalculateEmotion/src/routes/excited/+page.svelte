<script>
    import "$lib/botface.css";
    import base from "$lib/assets/base.svg";
    import eye from "$lib/assets/eye_excited.svg?raw";
    import mouth from "$lib/assets/mouth_excited.svg?raw";
    import speakingMouth from "$lib/assets/mouth_sleeping.svg?raw";
    import { isSpeaking } from "$lib/faceanimation";
</script>

<h1>RICBOT is excited</h1>

<div class="faceContainter">
    <img src={base} alt="" class="base" />
    <div class="eyeL">
        {@html eye}
    </div>

    <div class="eyeR">
        {@html eye}
    </div>

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
