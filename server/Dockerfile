FROM node:8.15

# INSTALL NODEMON
RUN npm i -g nodemon

# CREATE APP DIRECTORY
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# INSTALL DEPENDENCIES
COPY package.json ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]