# How the emotions are selected

The selection of the current emotion is done in the `router.js` file inside the _lib_ folder. The current emotion can either be chosen directly or can be determined by the current levels of `arousal` and `valence` (See _Purpose_ for additional information)

## The code
1. A Svelte Store is created. This is a remaining line from a previous iteration and has, technically, no purpose anymore. But for some reason, the whole face won't lode when it's missing. So just don't touch it.
2. `arousal` and `valence` are initialized. Relevant for choosing the emotion by values
3. `emotionsNumber` is initialized. Relevant for setting the emotion directly
4. The function `setEmotion(index)` is declared. With this, the current emotion can be selected. It is used for both methods
5. A function to update the values of `arousal` and `valence`
6. The `calculateEmotion()` function. The function is more or less a huge switch statement that searches up the current combination of `arousal` and `valence` and then sets the emotion accordingly

# FINISH WHEN MODULE COMPLETE