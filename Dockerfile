FROM node:alpine@sha256:35c22fc0c7b39912a929e5cfe21a29d337268de2b927374400e6b43884e8e348

LABEL com.docker.skill.api.version="container/v2"
WORKDIR /skill

COPY package.json package-lock.json ./
RUN npm ci
COPY index.js ./
COPY icon.svg /

ENTRYPOINT ["node", "index.js"]
