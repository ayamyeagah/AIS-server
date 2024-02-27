# Use for Server
# FROM node=20.11.1
# COPY . /app
# RUN npm install
# CMD ["npm", "start"]

# Use for try
FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5001

CMD ["npm", "start"]