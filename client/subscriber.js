const amqp = require(`amqplib`);
const openConnection = amqp.connect(`amqp://guest:guest@localhost:5672`);

exports.receiveMessageFromQueue = socket =>
  openConnection
    .then(connection => connection.createChannel())
    .then(channel => {
      // receiver message from queue
      const exchangeName = `RandomMessages`;
      channel.assertExchange(exchangeName, `fanout`, {
        durable: false,
      });

      channel
        .assertQueue(``, {
          exclusive: true,
        })
        .then(q => {
          channel.bindQueue(q.queue, exchangeName, ``);
          channel.consume(
            q.queue,
            msg => {
              if (msg.content) {
                const cont = JSON.parse(msg.content.toString());
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
    })
    .catch(err => {
      console.log(err);
    });
