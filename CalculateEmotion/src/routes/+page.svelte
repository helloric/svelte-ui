<script>
  import { currentEmotion, setEmotion, calculateEmotion } from "$lib/router.js";
  import BotFace from "$lib/components/botface.svelte";
  import { emotionsNumber } from "$lib/router.js";
  import { onMount } from "svelte";
  import 'audiobuffer-to-wav'

  const emotions = [
    "amused",
    "bored",
    "calm",
    "excited",
    "frustrated",
    "happy",
    "sad",
    "worried",
    "thinking",
  ];

  const colors = [
    "red",
    "orange",
    "yellow",
    "light_green",
    "dark_green",
    "ligth blue",
    "dark_blue",
    "grey",
  ];
  let color = colors[0];

  //calculateEmotion();
  //setEmotion(0);
  export let emotion = emotions[emotionsNumber];

  import { writable } from "svelte/store";
  import { AudioManager } from "$lib/audio_manager";
    import { currentDevice, decibelThreshold, updateCurrentDevice, updateDecibelThreshold } from "$lib/storage-util";
    import audioBufferToWav from "audiobuffer-to-wav";
  let wsConnected = false;
  /**@type WebSocket | undefined */
  let ws;
  let speaking = false;
  let counter = writable(5);
  let con_text = writable("");
  /** @type AudioManager | undefined */
  let audioManager;

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
      if (audioManager && audioManager.audioWorkletNode) {
        audioManager.audioWorkletNode.port.onmessage = (e) => {
          if (e.data['event'] === 'audio_available') {
            
            console.log('RECEIVED AUDIO');

            /** @type Float32Array */
            let audio = e.data['payload']['audio_data'];


            let audioBuffer = new AudioBuffer({numberOfChannels: 1, sampleRate: 44100, length: audio.length})
            audioBuffer.copyToChannel(audio, 0);

            /** @type ArrayBuffer */
            let buffer = audioBufferToWav(audioBuffer, {float32: true});

            let bytes = new Uint8Array(buffer);
            console.log(bytes);

            let binary = "";
            for (let i = 0; i < bytes.length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }

            let b64encoded = btoa(binary);

            console.log(b64encoded);
            
            ws?.send(JSON.stringify({audio_data: b64encoded}))
          }
        }
      }
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.emotion != undefined) {
        // setEmotion(data.emotion);
        emotion = emotions[data.emotion];
      }
      /**if (data.emotion === undefined){
        emotion = emotions[2];
      }**/
      if (data.speaking != undefined) {
        speaking = data.speaking;
      }

      if (data.audio != undefined) {
        if (data.audio === '') {
          audioManager?.audioWorkletNode?.port.postMessage({'event': 'unblock_microphone'});
          ws?.send(JSON.stringify({update: true}));
        } else {
          let audio = new Audio(`data:audio/wav;base64,${data.audio}`)
          audio.play();
          audio.onended = _ => {
            console.log('Stop');
            ws?.send(JSON.stringify({update: true}));
          }
        }
      }
    };
  }

  onMount(async () => {
    updateCurrentDevice();
    updateDecibelThreshold();

    let devices = await navigator.mediaDevices.enumerateDevices();
    if (!devices.find(media => media.deviceId === $currentDevice))
      $currentDevice = 'default';
  
    let stream = await navigator.mediaDevices.getUserMedia({audio: {deviceId: $currentDevice}});
    audioManager = new AudioManager();
    await audioManager.initMicrophone(stream);

    audioManager.audioWorkletNode?.port.postMessage({event: 'update_threshold', payload: {threshold: $decibelThreshold}});
    connect();
    audioManager.audioWorkletNode?.port.postMessage({event: 'unblock_microphone'}); 
  });
</script>

<BotFace bind:emotion bind:speaking bind:color />


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
