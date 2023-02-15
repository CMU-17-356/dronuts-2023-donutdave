FROM node:19-alpine3.16

# Change working directory
RUN pwd
# Install App Dependencies
COPY package*.json ./
RUN npm install

# Copy App Source
COPY . .
#TODO Run any build scripts here

EXPOSE 8080
CMD [ "npm", "run", "dev" ]