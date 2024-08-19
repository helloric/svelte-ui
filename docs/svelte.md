# WORK IN PROGRESS
# SvelteKit

The webframework SvelteKit wad used for programming the emotions of RICBOT. 
A webframework is a kind of program which makes the process of writing websites easyer. 
HTML, CSS and Javascript can be used.

SvelteKit looks overwelming at first, but is quite simple and easy to use when you know about it's pequliarities.

## So many folders ???
Relax, you only have to use a fracion of the displayed folders and components.

Lets start with the structure of SvelteKit:

Like I said, most of the folders in the editor won't be used by us and can be ignored. The whole projects programmed data, a.k.a. the scrips you will use and work on, is found in SvelteKits _src_ folder.

The _src_ folder contains the following sub-folders and scripts:
- _lib_
- _routes_ 
- `app.d.ts`
- `app.html`

---
### _lib_ folder

The _lib_ folder contains all scrips and assets used by the application and functions as the "backend" for the emotionsystem. 
Its contains an `assets` folder, which stores all the SVG components of the botface, for example the base of the face or the eyes for the different emotions. It also contains the `botface.css` which regulates the general placement of the base, mouth and eyes on the website. Furthermore it contains the `faceanimation.js` which regulates the blinking and speaking animation the botface has when displayed in the browser...
..............
Lastly the folder contains the `router.js`. This script is where the magic of the emotion calculation happens. It determinds which emotion RICBOT is currently feeling and displays the right subpage. `botface.css`, `faceanimation.js` and `router.js` will all be discussed in detail later. 

---
### _routes_ folder

The _routes_ folder contains all webpages and is the frontend of the application. Each emotion has it's own seperate page...
...

---
### The rest

The `app.d.ts` and `app.html` can be compleatly ignored and are not relevant for the actual programming. They are used by SvelteKit to host the website


## But where is the face ???
How to start the application with SvelteKit:
npm run dev
...
