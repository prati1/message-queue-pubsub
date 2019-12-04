const amqp = require(`amqplib`);
const cron = require(`node-cron`);
const randomSentence = require(`random-sentence`);

const openConnection = amqp.connect(`amqp://guest:guest@localhost:5672`);

exports.sendMessageToQueue = () => {
  // cron job to send messages to queue every second
  cron.schedule(`* * * * * *`, () => {
    openConnection
      .then(connection => connection.createChannel())
      .then(channel => {
        const exchangeName = `RandomMessages`;
        channel.assertExchange(exchangeName, `fanout`, {
          durable: false,
        });
        let sentence = ``;
        let message = {};

        // send 20 messages to queue
        for (let i = 0; i < 20; i++) {
          sentence = randomSentence({ min: 5, max: 10 });
          message = {
            message: sentence,
            timestamp: Date.now(),
            priority: Math.ceil(Math.random() * 10),
          };

          channel.publish(
            exchangeName,
            ``,
            Buffer.from(JSON.stringify(message))
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
