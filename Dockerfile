FROM node:16.13.2-alpine3.14

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3500

CMD ["npm", "run", "dev"]