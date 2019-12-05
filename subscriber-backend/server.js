const express = require(`express`);
const app = express();
const subscriber = require(`./subscriber`);

const server = require(`http`).createServer(app);
const io = require(`socket.io`)(server);
server.listen(3008);

// Setup subscriber to receive message on socket connection
io.on(`connection`, socket => {
  subscriber.receiveMessageFromQueue(socket);
});

module.exports = app;
