# How the emotions are selected

The selection of the current emotion is done in the `router.js` file inside the _lib_ folder. The current emotion can either be chosen directly or can be determined by the current levels of `arousal` and `valence` (See _Purpose_ for additional information)

## The actual used code at the moment

```JavaScript
export let emotionsNumber = 2;

export function setEmotion(index) {
  emotionsNumber = index;
}
```
This sets the initial emotion. The registered values for `emotionsNumber` are 0 to 8. 8 being thinking. The other emotions are sorted alphabetically: 

0. Amused
1. Bored
2. Calm
3. Excited
4. Frustrated
5. Happy
6. Sad
7. Worried
8. Thinking
    
Thinking is at the end because it is just a filler emotion for when RICBOTs LLM is generating and is never displayed as an actual emotion RICBOT is currently feeling.


## The code below
1. `arousal` and `valence` are initialized. Relevant for choosing the emotion by values
2. A function to update the values of `arousal` and `valence`
3. A get function for `arousal` and `valence`
4. The `calculateEmotion()` function. The function is more or less a huge switch statement that searches up the current combination of `arousal` and `valence` and then sets the emotion accordingly. 

As you can see, the basis to continue working on the emotion calculation with arousal and valence already exists. Feel free to use it.