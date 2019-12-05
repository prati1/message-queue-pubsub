const amqp = require(`amqplib`);
const cron = require(`node-cron`);
const randomSentence = require(`random-sentence`);

const openConnection = amqp.connect(`amqp://guest:guest@localhost:5672`);

exports.sendMessageToQueue = () => {
  // cron job to send messages to queue every second (efficient to update cron as per demand rather than using settimeout)
  cron.schedule(`* * * * * *`, () => {
    openConnection
      .then(connection => connection.createChannel())
      .then(channel => {
        const exchangeName = `RandomMessages`;
        channel.assertQueue(exchangeName, {
          durable: true,
        });
        let sentence = ``;
        let message = {};
        // const messageQueue = `RandomMessageQueue`;

        // send 20 messages to queue
        for (let i = 0; i < 20; i++) {
          sentence = randomSentence({ min: 5, max: 10 });
          message = {
            message: sentence,
            timestamp: new Date().toJSON(),
            priority: Math.ceil(Math.random() * 10),
          };
          console.log(message);
          channel.sendToQueue(
            exchangeName,
            Buffer.from(JSON.stringify(message))
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
