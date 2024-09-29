# The styling

The whole styling is done in the `botface.css` inside the _lib_ folder.

The script starts with positioning the HTML elements. `.facecontainer` is the whole `div` container, everything else are the elements of said container. That’s why there is the `svg` is at the end of the classes. We displayed them as HTML elements and imported them in a way so we can access the parameters inside the SVG: `eye_happy.svg?raw`

#### The coloring
Here is where it gets interesting. First, the colors themselves are stored in a variable so they can be adjusted more easily. Now to the assets: Remember what was written in the documentation for them? Depending on the used coloring parameter and the structure of the SVG, different CSS is used to color them. Let's look at an example:

 

```CSS

.red path {

    stroke: var(--red);

}

 

.red circle, .red ellipse, .red rect, .red.strokefill path {

    fill: var(--red);

    stroke: var(--red);

}

```



Those are the three CSS paths for coloring the botface red. Which emotion is currently displayed is completely irrelevant due to these three aspects:

The first one sets the `stroke` parameter of all assets with the structure of a path to red.

The third one set both the `fill` and the `stroke` parameter of all assets who have the structure of a circle, an ellipse, a rectangle or all how have the class `stokefill` to red.

This is the same for the rest of the colors.

And thus, the color of the displayed emotion can be changed at any time.