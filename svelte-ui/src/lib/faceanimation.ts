import { writable } from 'svelte/store';

//Blinking function
// TODO: use FLIP instead!
// See https://svelte.dev/tutorial/svelte/animations
export function doBlinking(interval = 5000, duration = 200) {
  const isBlinking = writable(false);
  function setupBlinking() {
    const blink = () => {
      isBlinking.set(true);

      setTimeout(() => {
        isBlinking.set(false);
      }, duration);
    };

    const blinkInterval = setInterval(blink, interval);

    return () => {
      clearInterval(blinkInterval);
    };
  }
  return { isBlinking, setupBlinking };
}

//Activates speaking
export let conversation = false;
export function changeState() {
  conversation = !conversation;
}

//Speaking function
export const isSpeaking = writable(false);

let speakInterval: number | undefined;
let duration = 200;
let interval = 450;


export function doSpeaking(speak: boolean | undefined) {
  if (speak === undefined) {
    changeState();
  } else {
    conversation = speak;
  }

  if (conversation) {
    const speech = () => {
      isSpeaking.set(true);
      setTimeout(() => {
        isSpeaking.set(false);
      }, duration);
    };

    if (!speakInterval) {
      speakInterval = setInterval(speech, interval);
    }
  }
  else {
    isSpeaking.set(false);
    if (speakInterval) {
      clearInterval(speakInterval);
      speakInterval = undefined;
    }
  }
}
