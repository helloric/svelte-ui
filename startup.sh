#! /bin/bash

cd CalculateEmotion
npm install
npm run build
npm run dev -- --host --port ${SERVER_PORT}