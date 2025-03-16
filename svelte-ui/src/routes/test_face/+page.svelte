<script lang="ts">
  import BotFace from "$lib/components/Botface.svelte";
  import { emotionsNumber } from "$lib/router.js";
  import { Emotion } from "../../emotion";
  
    //Avalable emotions and colors
    const emotions: Emotion[] = [
      Emotion.AMUSED, Emotion.BORED, Emotion.CALM, Emotion.EXCITED, 
      Emotion.FRUSTRATED, Emotion.HAPPY, Emotion.SAD, Emotion.WORRIED,
      Emotion.THINKING];
    let baseColor = $state('');
    const colors = [
      "",
      "red", "orange", "yellow", "light_green", "dark_green",
      "light blue", "dark_blue", "grey"];
    let color = $state(colors[0]);
    let blinkInterval = $state(450);
    let blinkDuration = $state(200);
    
    //First emotion is set
    let emotion = $state(emotions[emotionsNumber]);
  
    let speaking = $state(false);
  
  </script>
  
<BotFace {emotion} {speaking} {color} {baseColor} />

Face: <select bind:value={emotion}>
{#each emotions as emo}
  <option value={emo}>{emo}</option>
{/each}
</select><br />

Background color: <select bind:value={baseColor}>
  {#each colors as col}
    <option value={col}>{col}</option>
  {/each}
  </select><br />
Face color: <select bind:value={color}>
  {#each colors as col}
    <option value={col}>{col}</option>
  {/each}
</select><br />

Blinking interval: <input type="number" bind:value={blinkInterval} /><br />
Blinking duration: <input type="number" bind:value={blinkDuration} /><br />
Speaking: <input type="checkbox" bind:checked={speaking} /><br />
