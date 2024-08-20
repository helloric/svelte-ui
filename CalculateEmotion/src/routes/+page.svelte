<script>
    import { currentEmotion, setEmotion, calculateEmotion } from "$lib/router.js";
    import { doSpeaking } from "$lib/faceanimation";
    import BotFace from "$lib/components/botface.svelte";
    import { emotionsNumber } from "$lib/router.js";
  
    const emotions = ["amused", "bored", "calm", "excited", "frustrated", "happy", "sad", "worried"];
  
    const colors = ["red", "orange", "yellow", "light_green","dark_green", "ligth blue", "dark_blue", "grey"];
    let color = colors[0];
  
    //calculateEmotion();
    //setEmotion(0);
    let emotion = emotions[emotionsNumber];
  
  </script>
  


  <BotFace bind:emotion={emotion} bind:color={color} />
  
  <select bind:value={emotion}>
    {#each emotions as emo}
      <option value={emo}>{emo}</option>
    {/each}
  </select>
  
  <select bind:value={color}>
    {#each colors as col}
      <option value={col}>{col}</option>
    {/each}
  </select>
  
  <button type="button" on:click={doSpeaking}> Speaking On/Off </button>