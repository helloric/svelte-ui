<script>
  import BotFace from "$lib/components/botface.svelte";
  import { emotionsNumber } from "$lib/router.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";


  //Avalable emotions and colors
  const emotions = ["amused", "bored", "calm", "excited", "frustrated", "happy", "sad", "worried", "thinking"];
  const colors = ["red", "orange", "yellow", "light_green", "dark_green", "ligth blue", "dark_blue", "grey"];
  let color = colors[0];


  //First emotion is set
  export let emotion = emotions[emotionsNumber];


  //Websocked for ROS communication
  let wsConnected = false;
  let ws;
  let speaking = false;
  let counter = writable(5);
  let con_text = writable("");

  function reconnect() {
    if ($counter == 0) {
      $counter = 5;
      connect();
      return;
    }
    setTimeout(() => {
      $counter--;
      $con_text = `WebSocket Verbindung getrennt. Wir versuchen es noch mal in ${$counter} Sekunden.`;
      console.warn($con_text);
      reconnect();
    }, 1000);
  }

  function connect() {
    const host = "ws://localhost:7000/ws";
    $con_text = "Connecting...";
    ws = new WebSocket(host); // remember kids: the S in robot is for security.
    ws.onclose = (ev) => {
      ws = undefined;
      wsConnected = false;
      const err = `WebSocket Verbindung getrennt. Fehlercode: ${ev.code}`;
      console.error(err);
      reconnect();
    };
    ws.onopen = () => {
      wsConnected = true;
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.emotion != undefined) {
        emotion = emotions[data.emotion];
      }
      if (data.speaking != undefined) {
        speaking = data.speaking;
      }
    };
  }

  onMount(() => {
    connect();
  });
</script>

<BotFace bind:emotion bind:speaking bind:color />


<!--  
Uncomment lower section for manual selection of emotions on the website. Developing/debug-tool only!   
(Speaking is faultiy since implementing the Websocket tho. Needs fixing before using)
-->

<!--
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

<input type="checkbox" bind:value={speaking} /> Speaking On/Off
-->
