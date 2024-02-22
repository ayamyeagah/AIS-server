FROM node=20.11.1
COPY . /app
RUN npm install
CMD ["npm", "start"]