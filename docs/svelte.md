# SvelteKit

The web framework SvelteKit was used for programming the emotions of RICBOT. 
A web framework is a kind of program that makes the process of writing websites easier. 

SvelteKit looks overwhelming at first, but it is quite simple and easy to use when you know about its peculiarities.

## Installation and start
SvelteKit has to be installed for each individual project. Like I said, it's a framework and no programming language. If you want to start from scratch (not recommended),  just follow the installation guide on the SvelteKit Website. If you want to continue with the already existing work (recommended), just do the following to access it: 
First, clone the `emotion` repository from GitLab.
After doing that, open the repository in Visual Studio Code and type the following commands in the terminal:

```
npm install
```
This should be enough to install all the dependencies SvelteKit needs to operate on your system.

Do this to run the system inside the repository: 

```
cd CalculateEmotion
npm run dev
```
Now, the botface will be visible on http://localhost:5173/. 

## So many folders ???
Relax, you only have to use a fraction of the displayed folders and components.

Let's start with the structure of SvelteKit:

Like I said, most of the folders in the editor won't be used by us and can be ignored. The whole project's programmed data, a.k.a., the scrips you will use and work on, is found in SvelteKit's _src_ folder.

The _src_ folder contains the following sub-folders and scripts:
- _lib_
- _routes_ 
- `app.d.ts`
- `app.html`

---
### _lib_ folder

The _lib_ folder contains all scripts and assets used by the application and functions as the "backend" for the emotion system. 
It contains an `assets` folder, which stores all the SVG components of the botface, for example, the base of the face or the eyes for the different emotions. Furthermore, it contains the _components_ folder, which holds the `botface.svelte` and the `Slider.svelte`. The _lib_ folder also contains the `botface.css` which regulates the general placement of the base, mouth and eyes on the website. Furthermore, it contains the `faceanimation.js` which regulates the blinking and speaking animation the botface has when displayed in the browser. Additionally, it also holds the different scripts needed for the audio. To get more information, visit "The Communication With LLM" and "The Audio Manager".
The folder also contains the `router.js`. This script is where the magic of the emotion calculation happens. It determines which emotion RICBOT is currently feeling and displays the right subpage. `botface.css`, `faceanimation.js`, `botface.svele` and `router.js` will all be discussed in detail later. 

---
### _routes_ folder

The _routes_ folder contains all webpages and is the frontend of the application. For this project, only one page is needed. The `index.html` so to speak. IF there would be more subpages, they would be stored in here. 

---
### The rest

The `app.d.ts` and `app.html` can be completely ignored and are not relevant for the actual programming. They are used by SvelteKit to host the website.


## But where is the face ???

Like described earlier, type the following in the console of the project:
```
npm run dev
```
This opens port 5173, which can be accessed with http://localhost:5173/. 5173 is the default port set by SvelteKit to display it's applications. There you have the face!
For development purposes, this is enough. The actual building of the website is done in the Dockerfile. 

For additional questions regarding SvelteKit, just visit https://kit.svelte.dev