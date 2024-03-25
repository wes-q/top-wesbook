FROM node:20-bookworm-slim
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm install
USER node
EXPOSE 3001
CMD ["npm", "run", "dev", "--", "--host"]
