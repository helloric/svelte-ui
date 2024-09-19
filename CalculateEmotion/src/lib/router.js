/*
This is the currently used part. 
It allows the LLM to set the current emotion RICBOT is feeling.
It displays the emotion 'calm' by default
*/

export let emotionsNumber = 2;

export function setEmotion(index) {
  emotionsNumber = index;
}






/*
Everything below this was implemented with the idea of calculating the emotion with arousal and valence in mind which had to be scrapped due to manpower issues. 
It was left in to mabye be used in future iterations.
*/

let arousal = -2;
let valence = 0;

//Update arousal and valence. Called by LLM ideally
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
}

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
