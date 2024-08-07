import { writable } from 'svelte/store';

export let conversation = false;

export function changeConversation(){
  if (conversation == false){
    conversation = true;
  }
  else{
    conversation = false;
  }
  console.log(conversation);
}

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



//TODO: Getting it to work

export function doSpeaking(interval = 500, duration = 200) {
  const isSpeaking = writable(false);

  function setupSpeaking() {
    const speach = () => {
      isSpeaking.set(true);
      setTimeout(() => {
        isSpeaking.set(false);
      }, duration);
    };

    const speakInterval = setInterval(speach, interval);

    return () => {
      clearInterval(speakInterval);
    };
  }

  return { isSpeaking, setupSpeaking };
}