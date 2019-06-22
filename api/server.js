
const express = require('express');

const server = express();

const games = [];

server.use(express.json());



server.get('/', (req, res) => {
    res
        .status(200)
        .json({ message: "Server is running" });
})

server.post('/games', (req, res) => {
    const game = req.body;

    if (!game.title || !game.genre)
        res
            .status(422)
            .json({ message: "You got the wrong game" });
    else {
        games
            .push(game);
        res
            .status(200)
            .json(game);
    }

})


module.exports = server;