FROM node:latest

ENV PORT 3000

EXPOSE 3000

WORKDIR /usr/app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY gulpfile.js .

RUN npm install

COPY src .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
