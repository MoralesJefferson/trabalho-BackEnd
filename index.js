const { server, port } = require('./server');

server.listen(port, () => {
    console.log('Server Runnig On Port:', port);
});