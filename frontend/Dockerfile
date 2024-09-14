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

# Ahora utiliza nginx para servir la app
FROM nginx:alpine

# Copia los archivos construidos a la carpeta de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that the application runs on
EXPOSE 80

# Start the application in production mode
CMD ["nginx", "-g", "daemon off;"]
