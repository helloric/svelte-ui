import { error } from "@sveltejs/kit";
import { writable } from "svelte/store";



//Creates a Svelte Store for managing the emotion sub-pages 
export const currentEmotion = writable(0); 



/**
 * @type {number} Saves the Arousal Value
 */
let arousal = 4;
/**
 * @type {number} Saves the Valence Value
 */
let valence = 4;



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
export function updateAoursalValence(newArousal, newValence){
  if (arousal > 4 || arousal < -4){
    throw new Error("Invalid value for arousal");
  }
  else if (valence > 4 || valence < -4){
    throw new Error("Invalid value for valence");
  }
  else{
    arousal = newArousal;
    valence = newValence;
  }

  //TODO: Testing
}



//Mabye usefull in the future, currently unused
export function getArousal(){
  return arousal;
}

export function getValence(){
  return valence;
}



//Calculates the actual emotion based on the arousal and valence values and traverses a switchstatemt to uptade the emotion
export function calculateEmotion(){
  const key = `${arousal},${valence}`;

switch (key) {
  case '4,4':
    return setEmotion(4);
    break;
  // TODO: Implement missing cases
  // ...
  default:
    throw new Error('No valid combination found');
}
}
