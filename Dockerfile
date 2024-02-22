FROM node:20.11.1
COPY src/data_input/inputTCP.js src/data_input/
COPY src/data_input/inputUDP.js src/data_input/
CMD ["npm", "start"]