# The face itself

Everything the face needs is found in the `botface.svelte` inside the _components_ folder. It's a Svelte component which is displayed additionally to the contents of the `+page.svelte` main page.

### The `script` tag: 

1. The necessary scripts, functions and assets are imported.
2. The needed variables are created
   1. `eyeL` and `eyeR` for the assets of the eyes
   2. `mouth` for the asset of the mouth
   3. `blinking` for the blinking ability
   4. `color` is for the default color the emotion should have
   5. `mouth_class` and `eye_class` for the right coloring later in the CSS
3. The animations are handled. See _The animation_ for additional details
4. The `robotFace(emotion)` function


#### `robotFace(emotion)`

The function contains a constant which holds all the available emotions and their needed assets, coloring classes and their blinking ability. Depending on the given `emotion` the needed parameters are set for display and for the animation.

 

### The HTML

The HTML is a single `div` that contains the base of the face, the eyes and the mouth. They are displayed as HTML elements and not as simple SVGs. This allows us to recolor them freely, like an HTML element, without changing the color of the SVG.