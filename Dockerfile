# Start with the official Node.js Alpine image as a base
FROM node:alpine

# Create a directory for your application
WORKDIR /app

# Copy package.json and package-lock.json to your app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to your new directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start your app
CMD [ "npm", "start" ]