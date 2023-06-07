const express = require('express');
const routerUser = require('./router/user');
const routerReceita = require('./router/receita');

const server = new express();

server.use(express.json());
server.use(routerUser.router);
server.use(routerReceita.router);

const port = 8081;
module.exports = {
    server,
    port
};