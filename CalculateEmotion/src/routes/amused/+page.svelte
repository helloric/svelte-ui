<script>
    import "$lib/botface.css"
    import base from "$lib/assets/base.svg"
    import eye from '$lib/assets/eye_amused.svg'
    import mouth from '$lib/assets/mouth_amused.svg'
    import speakingMouth from "$lib/assets/mouth_sleeping.svg";
    import { isSpeaking } from "$lib/faceanimation";
</script>

<h1>RICBOT is amused</h1>

<div class="faceContainter">

    <img src={base} alt="" class="base" />
    <img src={eye} alt="" class="eyeL" />
    <img src={eye} alt="" class="eyeR" />
    {#if $isSpeaking}
        <img src={speakingMouth} alt="" class="mouth" />
    {:else}
        <img src={mouth} alt="" class="mouth" />
    {/if}
  </div>