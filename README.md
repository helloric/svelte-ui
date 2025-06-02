# Emotionsystem

## Needed Software

- [Visual Studio Code](https://code.visualstudio.com)
- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com)
- [Dev Container and Docker Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## How to access without Docker

1. Clone this repository
2. Open it in Visual Studio Code
3. Open the terminal inside Visual Studio Code and type `npm install` to install the needed node modules
4. Then type the following:
   ```
   cd svelte-ui
   npm run dev
   ```
   You can now view the botface at [http://localhost:5173/](http://localhost:5173/). 


## How to access with Docker

1. Clone this repository
2. Open it in Visual Studio Code
3. Open the terminal inside Visual Studio Code and type `docker compose build` 
4. After building, type `docker compose up`
5. Port to access the website will be shown in terminal

For answering additional questions read the [documentation](https://git.hb.dfki.de/helloric/helloric-24/documentation/documentation).

Good luck for your project!