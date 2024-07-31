The webframework SvelteKit wad used for programming the emotions of RICBOT.
SvelteKit looks overwelming at first, but is quite simle to use when you know about it's pequliarities.

Lets start with the structure of SvelteKit:
Most of the folders in the editor won't be used by us and can be ignored. The whole projects programmed data is found in SvelteKits _src_ folder.

The _src_ folder contains the following sub-folders and scripts:
- _lib_
- _routes_ 
- app.d.ts
- app.html

The _lib_ folder contains all scrips and assets used by the application and functions as the backend for the emotionsystem. 
...

The _routes_ folder contains all webpages and is the frontend of the application. Each emotion has it's own seperate page...
...

The app.d.ts and app.html can be compleatly ignored and are not relevant for the actual programming. They are used by SvelteKit to host the website

How to start the application with SvelteKit:
npm run dev
...