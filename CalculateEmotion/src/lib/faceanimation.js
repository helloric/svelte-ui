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

//TODO: Implementing mouth movements