FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
