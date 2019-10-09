FROM node:10-alpine
WORKDIR ../../TFG/apps/nsp
COPY package.json ../../TFG/apps/nsp
RUN npm install
COPY . home/aerie/TFG/apps/nsp
CMD node server.js
EXPOSE 8080
EXPOSE 27017
