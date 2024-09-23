# Docker

Docker is a software for containerizing applications. Basically, you put your application in a box and install all the needed dependencies in said box, and Ta Da: You have a completely independent developing environment. This eliminates the famous "bUt It wOrKs oN mY mAsHiNe" and makes deploying software programs easier. Just put your built Docker image on the RICBOT and run it. No further installation is needed. Like the whole project, the emotionsystem is also dockerised.

## The Dockerfile

You can find a _docker_ folder inside the repository. Inside, you can find the Dockerfile for the emotionsystem and for the documentation.
This is the content of the Dockerfile for the system:

``` Docker
FROM node:20.14.0

ARG PORT

ENV SERVER_PORT=${PORT:-5173}

WORKDIR /root/build

EXPOSE ${SERVER_PORT}
EXPOSE 7000
 
COPY . .

RUN chmod +x ./startup.sh

ENTRYPOINT [ "./startup.sh"]
```

First, the needed Node version is installed. Then the port to display the website is set. Then the basic structure of the container is implemented, and the needed ports are set. Everything is then copied into the Docker image, and the `startup.sh` is called. Inside the `startup.sh` are the necessary console commands for starting the SvelteKit application. 
It looks like this:
```sh
#! /bin/bash

cd CalculateEmotion
npm install
npm run build
npm run dev -- --host --port ${SERVER_PORT}
```
This starts the application automatically and hosts it on your network when opening the container. With this already done, RICBOT only has to access the site the application is hosted on. And voilà, there is the face!

## How to access
After cloning the emotion repository, go to [the official Docker website](https://www.docker.com) and download Docker Desktop. After that, start Docker Desktop, open the repository in Visual Studio Code and type the following two things in the console:
```
docker compose build
```
This can take a while, depending on your mashine. When the building process is finished type
```
docker compose up
```
to start the containerized application. 

## Necessary to Keep in Mind

Inside the Dockerfile, the web application has already been built. It now won't change itself if you alter the code because it is in "deployment mode" so to speak. To have a better experience during development, don't work inside the docker container and use `npm run dev` to access the website. When you're finished, or when you want to test stuff inside the container, just rebuild the Docker image with `docker compose build` again and use your new Docker image. 