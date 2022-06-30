FROM node:alpine

WORKDIR /skill

COPY package.json package-lock.json ./
RUN npm ci
COPY index.js ./

ENTRYPOINT ["node", "index.js"]
