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
    import mouth_amused from "$lib/assets/mouth_amused.svg?raw";
    import mouth_bored from "$lib/assets/mouth_bored.svg?raw";
    import mouth_calm from "$lib/assets/mouth_calm.svg?raw";
    import mouth_excited from "$lib/assets/mouth_excited.svg?raw";
    import mouth_frustrated from "$lib/assets/mouth_frustrated.svg?raw";
    import mouth_happy from "$lib/assets/mouth_happy.svg?raw";
    import mouth_sad from "$lib/assets/mouth_sad.svg?raw";
    import mouth_worried from "$lib/assets/mouth_worried.svg?raw";
    import mouth_speaking from "$lib/assets/mouth_sleeping.svg?raw";

    import { doBlinking } from "$lib/faceanimation";
    import { isSpeaking } from "$lib/faceanimation";

    import { onMount } from "svelte";

    let eyeL;
    let eyeR;
    let mouth;
    let blinking;
    let mouth_class = '';
    let eye_class = '';

    export let color = '';
    export let baseColor = 'blue';

    export let emotion = 'amused';

    const { isBlinking, setupBlinking } = doBlinking();

    onMount(() => {
        const cleanup = setupBlinking();
        return cleanup;

    });

    $: {
        robotFace(emotion);
        if ($isBlinking && blinking) {
            eye_class = 'stroke';
            eyeR = eyeL = eye_blinking;
        } else {
           
        }
        console.log("Blinking state:", $isBlinking);
        console.log("Speaking state:", $isSpeaking);

        if ($isSpeaking) {
            mouth_class = 'strokefill'
            mouth = mouth_speaking;
        }
    }

    function robotFace(emotion) {
        const options = {
            amused: {eye: eye_amused, mouth: mouth_amused, mouth_class: 'strokefill', eye_class: '', blinking: false},
            bored: {eye: eye_bored, mouth: mouth_bored, mouth_class: 'strokefill', eye_class: 'strokefill', blinking: true},
            calm: {eye: eye_calm, mouth: mouth_calm, mouth_class: 'stroke', eye_class: 'strokefill', blinking: true},
            excited: {eye: eye_excited, mouth: mouth_excited, mouth_class: 'strokefill', eye_class: '', blinking: false},
            frustrated: {eye: eye_frustrated, mouth: mouth_frustrated, mouth_class: 'stroke',  eye_class: 'strokefill', blinking: true},
            happy: {eye: eye_happy, mouth: mouth_happy, mouth_class: 'strokefill', eye_class: 'strokefill', blinking: true},
            sad: {eye: eye_sad, mouth: mouth_sad, mouth_class: 'stroke', eye_class: 'strokefill', blinking: true},
            worried: {eye: eye_worried, mouth: mouth_worried, mouth_class: 'stroke', eye_class:'strokefill', blinking: true},
        }
        eyeR = eyeL = options[emotion]['eye'];
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
