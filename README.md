# AIS Server

Automatic Identification System (AIS) is a short-range tracking system used on ships to provide identification and positioning information to other ships and shore stations. This project is used as a service to receive data from 6 receivers spread across Indonesia.

## Table of Contents
- [AIS Server](#ais-server)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Status](#project-status)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Project Overview
This project is part of a final assignment aimed at developing a server for the Automatic Identification System (AIS) used in maritime navigation and communication. The AIS Server receives, decodes, and stores AIS messages from vessels, providing essential data for vessel tracking and traffic analysis.

This project is built using the following technologies:

![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Features
- Queueing AIS message
- AIS message decoding
- Data storage in MongoDB
- RESTful API
- User interface for monitoring and analysis

## Installation
To set up this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/ayamyeagah/AIS-server.git
    ```
2. Navigate to the project directory:
    ```sh
    cd AIS-server
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
Dont forget to set environment variables.
1. To run in development, use:
    ```sh
    npm run dev
    ```
2. For Docker users, build and run in development the Docker containers:
    ```sh
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
    ```
3. To run in production, use:
    ```sh
    npm start
    ```
4. For Docker users, build and run in production the Docker containers:
    ```sh
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
    ```

## Project Status
- [x] TCP connection for datastream
- [x] Decoding AIS Message
- [x] Store in MongoDB Database
- [x] Create Schema and Model for Decoded Message using Mongoose
- [x] Build Microservices for Hardware, Datastream, & Database
- [x] Build Docker for Project Environment
- [x] Create REST API
- [x] Create Interface for Monitoring (frontend)
- [x] Create Analysis for Vessel Traffic (frontend)
- [x] Integration Frontend & Backend
- [x] Design Schematic & PCB (hardware)
- [x] Design 3D for Hardware Casing (hardware)
- [ ] Build Program for Transmitter & Receiver (hardware)
- [x] Integration Hardware and Web
- [ ] Cracking Library for GPS

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries, please contact:
- Name: Ahmad Alam Ardiansyah
- Email: [ahmadalamardiansyah@gmail.com](mailto:ahmadalamardiansyah@gmail.com)
- GitHub: [ayamyeagah](https://github.com/ayamyeagah)

