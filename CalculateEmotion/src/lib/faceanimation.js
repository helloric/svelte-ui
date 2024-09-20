import { writable } from 'svelte/store';

//Blinking function
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

/** @type number | undefined | null */
let speakInterval;
let duration = 200;
let interval = 450;

export function doSpeaking(speak) {
  if (speak === undefined) {
    changeState();
  } else {
    conversation = speak;
  }

  if (conversation) {
    const speach = () => {
      isSpeaking.set(true);
      setTimeout(() => {
        isSpeaking.set(false);
      }, duration);
    };

    if (!speakInterval) {
      speakInterval = setInterval(speach, interval);
    }
  }
  else {
    isSpeaking.set(false);
    if (speakInterval) {
      clearInterval(speakInterval);
      speakInterval = null;
    }
  }
}
