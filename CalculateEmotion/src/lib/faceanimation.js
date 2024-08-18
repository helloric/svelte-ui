import { writable } from 'svelte/store';

//let interval = Math.floor(Math.random()*10001);

//Does the initial blinking by setting up a svelteStore with a boolean. Alters said boolean with a timer.
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


export let conversation = false;

export function changeState() {
  if (conversation == false) {
    conversation = true;
  }
  else {
    conversation = false;
  }

  console.log(conversation);
}

//Speaking activating with buttonpress

export const isSpeaking = writable(false);
/**
 * @type {number | null | undefined}
 */
let speakInterval;
let duration = 200;
let interval = 450; 

export function doSpeaking() {

  changeState();

  if (conversation) {
    const speach = () => {
      isSpeaking.set(true);
      setTimeout(() => {
        isSpeaking.set(false);
      }, duration);
    };

    if (!speakInterval) { // Only start new interval when no other is currently running
      speakInterval = setInterval(speach, interval);
    }

  }
  else {
    isSpeaking.set(false);

    if (speakInterval) { // Stop interval if one exists
      clearInterval(speakInterval);
      speakInterval = null; // Reset timer variable
    }
  }
}
