FROM node:16.13.2-slim

# Define working directory.
WORKDIR /dist

# copy from local build machine to inside the docker image
COPY . /dist

# expose port 8080
EXPOSE 8080

#set env variable for the port
ENV PORT=8080

RUN npm install --global ts-node

# install dependencies
RUN npm install

# NOTE: this should be used in kubernetes deployments
CMD ["npm" , "start"]
