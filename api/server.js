const express = require("express");

const server = express();

server.use(express.json());

const accountRouter = require('../accounts_router.js');
//account router
server.use('/accounts', accountRouter);

server.get('/', (req,res) => {
    res.json("Hello World!")
})



module.exports = server;
