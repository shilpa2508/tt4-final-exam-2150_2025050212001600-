# Use the official Node.js image as a build environment
FROM node:16 AS build-env
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx image to serve the build
FROM nginx:alpine
COPY --from=build-env /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 