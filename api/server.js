
const express = require('express');

const server = express();

const games = [];

server.use(express.json());



server.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
})




module.exports = server;