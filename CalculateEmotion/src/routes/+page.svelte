<script>
    //Import needed componetns and subpages
    import { onMount } from "svelte";
    import { currentEmotion, setEmotion, calculateEmotion } from "$lib/router.js";
    import { doSpeaking } from "$lib/faceanimation";
    import BotFace from "$lib/components/botface.svelte";
  
    const emotions = ["amused", "bored", "calm", "excited", "frustrated", "happy", "sad", "worried"];
    let emotion = emotions[0];
  
    const colors = ["red", "orange", "yellow", "light_green","dark_green", "ligth blue", "dark_blue", "grey"];
    let color = colors[0];
  
    //Calculates current Emotion and sets the Svelte Store to the needed index
    //setEmotion(5);
    //calculateEmotion();
  
    /**
     * @type {number} Subscribes to the Svelte store so it can be used
     */
    let storeIndex;
    const unsubscribe = currentEmotion.subscribe((value) => {
      storeIndex = value;
    });
  
    //Allows fexibility
    onMount(() => {
      return () => {
        unsubscribe();
      };
    });
  </script>
  
  <!--Displays current emotion
  TODO: Mabye change to switch statement-->
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