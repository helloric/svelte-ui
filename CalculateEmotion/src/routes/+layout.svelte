<script>
  //Import needed componetns and subpages
  import { onMount } from "svelte";
  import { currentEmotion, setEmotion, calculateEmotion } from "$lib/router.js";
  import Amused from "./amused/+page.svelte";
  import Bored from "./bored/+page.svelte";
  import Calm from "./calm/+page.svelte";
  import Excited from "./excited/+page.svelte";
  import Frustrated from "./frustrated/+page.svelte";
  import Happy from "./happy/+page.svelte";
  import Sad from "./sad/+page.svelte";
  import Worried from "./worried/+page.svelte";
  import { doSpeaking } from "$lib/faceanimation";

  //Calculates current Emotion and sets the Svelte Store to the needed index
  setEmotion(2);
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
{#if storeIndex === 0}
  <Amused />
{:else if storeIndex === 1}
  <Bored />
{:else if storeIndex === 2}
  <Calm />
{:else if storeIndex === 3}
  <Excited />
{:else if storeIndex === 4}
  <Frustrated />
{:else if storeIndex === 5}
  <Happy />
{:else if storeIndex === 6}
  <Sad />
{:else if storeIndex === 7}
  <Worried />
{:else}
  <p>Emotion not found</p>
{/if}

<!--- Mabye for later
<style>
 *{background-color: black}
</style>
--->

<slot />

<button type="button" on:click={doSpeaking}>
  Speaking On/Off
</button>