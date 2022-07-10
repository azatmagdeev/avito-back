FROM node:16-alpine as build
WORKDIR /home/app
COPY . .
RUN npm install && npm run build
CMD [ "node", "dist/app.js" ]