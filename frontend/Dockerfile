# install OS
FROM node:alpine

# set working directory
WORKDIR /app

# copy package.json and package-lock.json to working directory
ADD package.json package-lock.json ./

# install dependencies
RUN npm install

# copy bin folder
ADD .eslintrc.cjs /app/.eslintrc.cjs
ADD .prettierrc.json /app/.prettierrc.json
ADD index.html /app/index.html
ADD vite.config.js /app/vite.config.js
ADD vitest.config.js /app/vitest.config.js

# run the app
CMD ["npm", "run", "dev"]
