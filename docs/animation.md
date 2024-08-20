# Animation

 

This section covers how the animations, namely the blinking and the speaking of RICBOT were created. The "animations" itself are pretty basic. Just some SVGs which are switched in and out depending on some variables. But it helps to make RICBOT more humanlike (and it looks fancy too). Every function necessary is found in the `faceanimation.js` inside the _lib_ folder. Used are those in the `botface.svelte`, located in the _components_ folder inside _lib_ .

 

## Blinking

 

In a nutshell, the blinking works by setting up a Svelte Store with a boolean. The value of the boolean is set depending on an interval. If it's `false` the normal eyes are displayed and if it's `true` the `eye_sleeping.svg` is switched in for the normal eyes. Except 'amused' and 'excited', every emotion is able to blink.

 

The heart of the blinking animation is the `doBlinking()` function:

 

```

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

 

```

Here are some key facts for better understanding the function:

- `interval` is the passing time between two blinks

- `duration` is, well, the duration of the blink.

- `isBlinking` is the Svelte Store/boolean

- `setupBlinking()` and `blink` are setting the store `true` and starting a timer. After the timer is finished, the store is set to `false` again.

- `blinkInterval` sets an interval to call `blink` every length of `interval`

- `clearInterval(blinkInterval)` resets the interval when it's finished, so a new one can be created

- At the end, `isBlinking` and `setupBlinking` are returned so they can be used by other scripts

 

 

## Speaking

 

The speaking animation works at its core pretty much the same as the blinking animation. The only difference is that the speaking can be turned on or off. Would be pretty silly if RICBOT would do the speak animation without saying anything, don't you think?

 

Let’s look at the function in detail:

```

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

```

 

Here are the facts that differ from `doBlinking()`:

- `speakInterval` is declared outside to prevent multiple ones existing at the same time

- `interval` and `duration` are declared outside as well to make the animation run smoother (somehow)

- `changeState()` alters the boolean `conversation` which checks if RICBOT is currently speaking or not. If it's true, the same stuff as the blinking happens

If a `speakInterval` does not already exist, a new one is created

If `conversation` is false, the Svelte Store for speaking is set to `false` and any existing speakIntervals are terminated.

 

 

## Inside `botface.svelte`

 

The `doBlinking()` function is imported fully for the blinking. For the speaking, it is sufficient to import `isSpeaking` meaning only the status of the Svelte Store (`true` or `false`).

 

Next, a constant is declared which allows us to access `isBlinking` and `setupBlinking()`.

 

In the `onMount()` function, `setupBlinking()` is called. This starts the blinking animation when the website is loaded. The blinking can't be terminated and runs constantly.

 

Now to where the magic happens:

```

$: {

        robotFace(emotion);

        if ($isBlinking && blinking) {

            eye_class = 'stroke';

            eyeR = eyeL = eye_blinking;

        }

 

        if ($isSpeaking) {

            mouth_class = 'strokefill'

            mouth = mouth_speaking;

        }

    }

```

 

This function is always called when something changes on the website. First, the current robotFace according to the current emotion, is displayed. If `isBlinking` is currently true and the emotion has the ability to blink, the current eyes are swapped for the blinking eyes. The `eye_class` is changed too so that the blinking eyes can be colored properly.

 

The same happens with the mouth while `isSpeaking` is true.