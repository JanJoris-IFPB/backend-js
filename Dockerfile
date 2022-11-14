FROM node:16.16.0

WORKDIR /api-janTube

COPY . .

RUN yarn install

RUN yarn run build

EXPOSE 3000

CMD ["yarn","start"]
