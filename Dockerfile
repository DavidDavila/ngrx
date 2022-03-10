### STAGE 1: Build ###
FROM node:12.22.7-alpine as buildContainer

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Handle alpine uid/gid bug
RUN npm config set unsafe-perm true

# install and cache app dependencies
COPY package*.json /usr/src/app/
RUN npm install
RUN npm install -g @angular/cli@6.1.5

# add app
COPY . /usr/src/app

# generate build
RUN ng build --base-href /sdk-tester-js/ --deploy-url /sdk-tester-js/

### STAGE 2: Release ###
FROM nginx:alpine as release

# Copy dependency definitions
RUN rm -rf /usr/share/nginx/html/*
COPY --from=buildContainer /usr/src/app/dist/sdk-tester-qa/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# start app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

