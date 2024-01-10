FROM node:18

# Install python
RUN apt-get update && apt-get install -y python3 make g++ openssl

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node .npmrc ./

# Install app dependencies using npm
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node