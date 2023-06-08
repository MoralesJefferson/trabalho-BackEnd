const express = require('express');
const routerUser = require('./router/user');
const routerRecipe = require('./router/recipe');

const server = new express();

server.use(express.json());
server.use(routerUser.router);
server.use(routerRecipe.router);

const port = 8082;
module.exports = {
    server,
    port
};