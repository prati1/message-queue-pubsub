const amqp = require(`amqplib`);
const openConnection = amqp.connect(`amqp://guest:guest@localhost:5672`);

exports.receiveMessageFromQueue = socket =>
  openConnection
    .then(connection => connection.createChannel())
    .then(channel => {
      // receiver message from queue
      const exchangeName = `RandomMessages`;
      channel.assertQueue(exchangeName, {
        durable: true,
      });
      channel.consume(
        exchangeName,
        msg => {
          if (msg.content) {
            const cont = JSON.parse(msg.content.toString());
            console.log(cont);
            if (cont.priority >= 7) {
              // Emit the messages on 'randomMessage' to display on frontend
              socket.emit(`randomMessage`, cont);
            }
          }
        },
        {
          noAck: true,
        }
      );
    })
    .catch(err => {
      console.log(err);
    });
