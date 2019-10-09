FROM node:10-alpine
WORKDIR /home/aerie/Música/nsp
COPY package.json /home/aerie/Música/nsp
RUN npm install
COPY . /home/aerie/Música/nsp
CMD node server.js
EXPOSE 8080
