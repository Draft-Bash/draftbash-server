# Use an official Node.js runtime as a base image.
# Build the application for development
FROM node:20 as base

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the application code to the working directory
COPY . .

# Build the application for production
FROM base as production

ENV NODE_PATH=./build

RUN npm run build