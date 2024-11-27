FROM node:lts-buster-slim AS development

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci

COPY . /usr/src/app

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "dev"]
