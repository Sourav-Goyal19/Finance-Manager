# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /account-manager

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application account-manager
COPY . /account-manager/

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]
