# Root Dockerfile – used for frontend (React)
FROM node:18 as build

WORKDIR /app
COPY frontend/ /app/
RUN npm install
RUN npm run build

# Serve the React app with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
