<script>
  import { currentEmotion, setEmotion, calculateEmotion } from "$lib/router.js";
  import BotFace from "$lib/components/botface.svelte";
  import { emotionsNumber } from "$lib/router.js";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { AudioManager } from "$lib/audio_manager";
  import { currentDevice, decibelThreshold, updateCurrentDevice, updateDecibelThreshold } from "$lib/storage-util";
  import { conversation } from "$lib/faceanimation";
  import audioBufferToWav from "audiobuffer-to-wav";

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

            let audioBuffer;

            if (audioManager?.channelCount == 1) {
              /** @type Float32Array */
              let audio = e.data['payload']['audio_data'];
              audioBuffer = new AudioBuffer({numberOfChannels: audioManager?.channelCount, sampleRate: 44100, length: audio.length})
              audioBuffer.copyToChannel(audio, 0);
            } else {
              /** @type {{'0': Float32Array, '1': Float32Array}} */
              let audio = e.data['payload']['audio_data'];
              audioBuffer = new AudioBuffer({numberOfChannels: audioManager?.channelCount, sampleRate: 44100, length: audio['0'].length})
              audioBuffer.copyToChannel(audio['0'], 0);
              audioBuffer.copyToChannel(audio['1'], 1);
            }

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
    ws.onmessage = async (event) => {
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

      if (data.messages != undefined && data.release_mic != undefined) {
        /** @type LLMMessage[] */ 
        let messages = data.messages

        let play = async (/** @type {number} */ i, /** @type {LLMMessage[]} */ messages) => {
          if (i >= messages.length) {
            if (data.release_mic) {
              await new Promise(r => setTimeout(r, 1000));
              console.log('release.');
              audioManager?.unblockMicrophone();
            }
            speaking = false;
          } else {
              let msg = messages[i];
              if (messages[i].emotion === 8) {
                if (i === messages.length - 1) {
                  emotion = emotions[msg.emotion];
                  return;
                } else {
                  play(i+1, messages);
                }
              } else if (messages[i].is_pause) {
                await new Promise(r => setTimeout(r, 2000));
                play(i+1, messages);
              } else {
                speaking = true;
                emotion = emotions[msg.emotion];
                let audio = new Audio(`data:audio/wav;base64,${msg.b64audio}`)
                audio.onended = _ => play(i+1, messages);
                audio.play();
              }
            }
          }
        await play(0, messages);
      }
    };
  }

  let initMic = async () => {
    updateCurrentDevice();
    updateDecibelThreshold();

    await navigator.mediaDevices.getUserMedia({audio: true}); // throw this away. no proper permission support added yet, unfortunately.

    let devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    if (!devices.find(media => media.deviceId === $currentDevice))
      $currentDevice = 'default';
  
    let stream = await navigator.mediaDevices.getUserMedia({audio: {deviceId: $currentDevice}});
    audioManager = new AudioManager();
    await audioManager.initMicrophone(stream);

    audioManager.audioWorkletNode?.port.postMessage({event: 'update_threshold', payload: {threshold: $decibelThreshold}});
    connect();
    audioManager.unblockMicrophone();
  }

</script>

{#await initMic()}

Waiting for the microphone to initialize...
  
{:then _} 

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

{/await}
