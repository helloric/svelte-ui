FROM node:20.14.0

ARG PORT

ENV SERVER_PORT=${PORT:-5173}

WORKDIR /root/build

EXPOSE ${SERVER_PORT}
EXPOSE 7000
 
COPY . .

RUN chmod +x ./startup.sh

ENTRYPOINT [ "./startup.sh"]