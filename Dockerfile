FROM node:slim

ADD . /alioth

WORKDIR /alioth

RUN npm install

ENTRYPOINT ["node", "index.js"]
