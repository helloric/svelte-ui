<script>
    import "$lib/botface.css";
    import base from "$lib/assets/base.svg?raw";
    import eye_amused from "$lib/assets/eye_amused.svg?raw";
    import eye_bored from "$lib/assets/eye_bored.svg?raw";
    import eye_calm from "$lib/assets/eye_calm.svg?raw";
    import eye_excited from "$lib/assets/eye_excited.svg?raw";
    import eye_frustrated from "$lib/assets/eye_frustrated.svg?raw";
    import eye_happy from "$lib/assets/eye_happy.svg?raw";
    import eye_sad from "$lib/assets/eye_sad.svg?raw";
    import eye_worried from "$lib/assets/eye_worried.svg?raw";
    import eye_blinking from "$lib/assets/eye_sleeping.svg?raw";
    import eye_thinking_r from "$lib/assets/eye_thinking_r.svg?raw";
    import mouth_amused from "$lib/assets/mouth_amused.svg?raw";
    import mouth_bored from "$lib/assets/mouth_bored.svg?raw";
    import mouth_calm from "$lib/assets/mouth_calm.svg?raw";
    import mouth_excited from "$lib/assets/mouth_excited.svg?raw";
    import mouth_frustrated from "$lib/assets/mouth_frustrated.svg?raw";
    import mouth_happy from "$lib/assets/mouth_happy.svg?raw";
    import mouth_sad from "$lib/assets/mouth_sad.svg?raw";
    import mouth_worried from "$lib/assets/mouth_worried.svg?raw";
    import mouth_speaking from "$lib/assets/mouth_sleeping.svg?raw";
    import mouth_thinking from "$lib/assets/mouth_thinking.svg?raw"

    import { doBlinking } from "$lib/faceanimation";
    import { isSpeaking } from "$lib/faceanimation";
    import { doSpeaking } from "$lib/faceanimation";

    import { onMount } from "svelte";

    let eyeL;
    let eyeR;
    let mouth;
    let blinking;
    let mouth_class = '';
    let eye_class = '';

    export let color = '';
    export let baseColor = '';

    export let emotion = 'amused';
    export let speaking = false;

    const { isBlinking, setupBlinking } = doBlinking();

    onMount(() => {
        const cleanup = setupBlinking();
        return cleanup;
    });

    $: {
        robotFace(emotion);
        if ($isBlinking && blinking) {
            eye_class = '';
            eyeR = eyeL = eye_blinking;
        }
        //console.log("Blinking state:", $isBlinking);
        //console.log("Speaking state:", $isSpeaking);

        if ($isSpeaking) {
            mouth_class = 'strokefill'
            mouth = mouth_speaking;
        }
        doSpeaking(speaking);
    }

    function robotFace(emotion) {
        const options = {
            amused: {eyeR: eye_amused, eyeL: eye_amused, mouth: mouth_amused, mouth_class: 'strokefill', eye_class: '', blinking: false},
            bored: {eyeR: eye_bored, eyeL: eye_bored, mouth: mouth_bored, mouth_class: 'strokefill', eye_class: 'strokefill', blinking: true},
            calm: {eyeR: eye_calm, eyeL: eye_calm, mouth: mouth_calm, mouth_class: '', eye_class: 'strokefill', blinking: true},
            excited: {eyeR: eye_excited, eyeL: eye_excited, mouth: mouth_excited, mouth_class: 'strokefill', eye_class: '', blinking: false},
            frustrated: {eyeR: eye_frustrated, eyeL: eye_frustrated, mouth: mouth_frustrated, mouth_class: '',  eye_class: 'strokefill', blinking: true},
            happy: {eyeR: eye_happy, eyeL: eye_happy, mouth: mouth_happy, mouth_class: 'strokefill', eye_class: 'strokefill', blinking: true},
            sad: {eyeR: eye_sad, eyeL: eye_sad, mouth: mouth_sad, mouth_class: '', eye_class: 'strokefill', blinking: true},
            worried: {eyeR: eye_worried, eyeL: eye_worried, mouth: mouth_worried, mouth_class: '', eye_class:'strokefill', blinking: true},
            thinking: {eyeR: eye_thinking_r, eyeL: eye_calm, mouth: mouth_thinking, mouth_class: '', eye_class: 'strokefill', blinking: true},
        }
        eyeR = options[emotion]['eyeR'];
        eyeL = options[emotion]['eyeL'];
        mouth = options[emotion]['mouth'];
        mouth_class = options[emotion]['mouth_class'];
        eye_class = options[emotion]['eye_class'];
        blinking = options[emotion]['blinking'];
    }
</script>

<div class="faceContainter">
    <div class={`base ${baseColor}`}>
        {@html base}
    </div>
    <div class={`eyeL ${eye_class} ${color}`}>
        {@html eyeL}
    </div>
    <div class={`eyeR ${eye_class} ${color}`}>
        {@html eyeR}
    </div>
    <div class={`mouth ${mouth_class} ${color}`}>
        {@html mouth}
    </div>
</div>
