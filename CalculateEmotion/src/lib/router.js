let emotion;                            //Stores current emotion, is exported
let arousal = 4;                        //Arousal parameter, inputrange: -3 to 4 
let valence = 4;                        //Valence parameter, inputrange: -3 to 4 
const key = `${arousal},${valence}`;    //Produces key to acces switchstatement

//Determents current emotion depending on arousal and valence
switch (key) {
  case '4,4':
    emotion = 'amused';
    break;
  // TODO: Implement more cases
  // ...
  default:
    throw new Error('No valid combination found');
}

export {emotion};