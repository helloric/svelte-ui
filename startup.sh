#! /bin/bash

# FIXME: install inside docker container!
cd svelte-ui
npm install
npm run build
npm run dev -- --host --port ${SERVER_PORT}