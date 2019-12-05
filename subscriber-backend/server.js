const express = require(`express`);
const app = express();
const subscriber = require(`./subscriber`);

const server = require(`http`).createServer(app);
const io = require(`socket.io`)(server);
server.listen(8018);

// Setup subscriber to receive message on socket connection
io.on(`connection`, socket => {
  subscriber.receiveMessageFromQueue(socket);
});

module.exports = app;
