FROM node:alpine@sha256:e479d86de1ef8403adda6800733a7f8d18df4f3c1c2e68ba3e2bc05fdea9de20

LABEL com.docker.skill.api.version="container/v2"
WORKDIR /skill

COPY package.json package-lock.json ./
RUN npm ci
COPY index.js ./
COPY icon.svg /

ENTRYPOINT ["node", "index.js"]
