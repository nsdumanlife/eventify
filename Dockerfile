# install an operating system and node.js
FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

#add project files
ADD package.json package-lock.json ./

#run npm install
RUN npm install

ADD bin ./bin

#run npm start
CMD [ "npm", "run", "dev" ]
