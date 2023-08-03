# install OS
FROM node:alpine

# set working directory
WORKDIR /app

# nodemon for development
RUN npm install -g nodemon

# copy package.json and package-lock.json to working directory
ADD package.json package-lock.json ./

# install dependencies
RUN npm install

# copy bin folder
ADD bin ./bin

# run the app
CMD ["nodemon"]
