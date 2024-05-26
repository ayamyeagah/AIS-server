FROM node:20.11.1
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install --force; \
    else npm install --force --only=production; \
    fi
COPY . ./
EXPOSE $PORT
CMD ["node", "app.js"]
