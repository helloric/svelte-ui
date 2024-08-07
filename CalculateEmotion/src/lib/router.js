import { error } from "@sveltejs/kit";
import { writable } from "svelte/store";


//Creates a Svelte Store for managing the emotion sub-pages 
export const currentEmotion = writable(0);


/**
 * @type {number} Saves the Arousal Value
 */
let arousal = -2;
/**
 * @type {number} Saves the Valence Value
 */
let valence = 0;



/**
 * @param {number} index Is the current value of the Svelte Store, Function uptdates current Store Index
 */
export function setEmotion(index) {
  currentEmotion.set(index);
}



/**
 * @param {number} newArousal !!!!!NOT TESTET YET!!!!!
 * @param {number} newValence Should update arousal and valence within the allowed parameters
 */
export function updateAoursalValence(newArousal, newValence) {
  if (arousal > 3 || arousal < -4) {
    throw new Error("Invalid value for arousal");
  }
  else if (valence > 3 || valence < -4) {
    throw new Error("Invalid value for valence");
  }
  else {
    arousal = newArousal;
    valence = newValence;
  }

  //TODO: Testing
}



//Mabye usefull in the future, currently unused
export function getArousal() {
  return arousal;
}

export function getValence() {
  return valence;
}



//Calculates the actual emotion based on the arousal and valence values and traverses a switchstatemt to uptade the emotion
export function calculateEmotion() {
  const key = `${arousal},${valence}`;

  switch (key) {
    case '3,3':
      return setEmotion(3);
    case '3,2':
      return setEmotion(3);
    case '3,1':
      return setEmotion(3);
    case '3,0':
      return setEmotion(3);
    case '3,-1':
      return setEmotion(4);
    case '3,-2':
      return setEmotion(4);
    case '3,-3':
      return setEmotion(4);
    case '3,-4':
      return setEmotion(4);

    case '2,3':
      return setEmotion(0);
    case '2,2':
      return setEmotion(0);
    case '2,1':
      return setEmotion(0);
    case '2,0':
      return setEmotion(0);
    case '2,-1':
      return setEmotion(4);
    case '2,-2':
      return setEmotion(4);
    case '2,-3':
      return setEmotion(4);
    case '2,-4':
      return setEmotion(4);

    case '1,3':
      return setEmotion(0);
    case '1,2':
      return setEmotion(0);
    case '1,1':
      return setEmotion(0);
    case '1,0':
      return setEmotion(5);
    case '1,-1':
      return setEmotion(7);
    case '1,-2':
      return setEmotion(7);
    case '1,-3':
      return setEmotion(4);
    case '1,-4':
      return setEmotion(4);

    case '0,3':
      return setEmotion(0)
    case '0,2':
      return setEmotion(5)
    case '0,1':
      return setEmotion(5)
    case '0,0':
      return setEmotion(5)
    case '0,-1':
      return setEmotion(7)
    case '0,-2':
      return setEmotion(7)
    case '0,-3':
      return setEmotion(6)
    case '0,-4':
      return setEmotion(6)

    case '-1,3':
      return setEmotion(5)
    case '-1,2':
      return setEmotion(5)
    case '-1,1':
      return setEmotion(5)
    case '-1,0':
      return setEmotion(2)
    case '-1,-1':
      return setEmotion(7)
    case '-1,-2':
      return setEmotion(7)
    case '-1,-3':
      return setEmotion(6)
    case '-1,-4':
      return setEmotion(6)

    case '-2,3':
      return setEmotion(5)
    case '-2,2':
      return setEmotion(2)
    case '-2,1':
      return setEmotion(2)
    case '-2,0':
      return setEmotion(2)
    case '-2,-1':
      return setEmotion(7)
    case '-2,-2':
      return setEmotion(7)
    case '-2,-3':
      return setEmotion(6)
    case '-2,-4':
      return setEmotion(6)

    case '-3,3':
      return setEmotion(2)
    case '-3,2':
      return setEmotion(2)
    case '-3,1':
      return setEmotion(2)
    case '-3,0':
      return setEmotion(2)
    case '-3,-1':
      return setEmotion(7)
    case '-3,-2':
      return setEmotion(7)
    case '-3,-3':
      return setEmotion(6)
    case '-3,-4':
      return setEmotion(6)

    case '-4,3':
      return setEmotion(2)
    case '-4,2':
      return setEmotion(2)
    case '-4,1':
      return setEmotion(1)
    case '-4,0':
      return setEmotion(1)
    case '-4,-1':
      return setEmotion(1)
    case '-4,-2':
      return setEmotion(7)
    case '-4,-3':
      return setEmotion(6)
    case '-4,-4':
      return setEmotion(6)
    default:
      throw new Error('No valid combination found');
  }
}
