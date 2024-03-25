FROM node:20
WORKDIR /usr/src/app
COPY . .
RUN npm install

# NGINX replaces the communication line between the frontend and backend
# ENV VITE_BACKEND_URL="//localhost:3000"
# ENV VITE_BACKEND_URL="//localhost:8080/api/"
# EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
