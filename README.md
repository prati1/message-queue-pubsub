## INSTALLATION

### Prerequisites

    - node.js
    - RabbitMQ

### Steps

1. Clone the repository into your local computer.
2. Enter inside each folder in the cloned repository and run following commands:

- npm install
- npm start

3. Open `http://localhost:3018` in your web browser

## ARCHITECTURE

This PubSub system uses 'RabbitMQ' as a message broker to exchange messages. The system is divided into three parts:

- `Publisher Backend` to publish message
- `Subscriber Backend` that subscribes to the message published by publisher, filters the message and emits it to the frontend via socket.io.
- `Subscriber Frontend` that processes the messages sent via socket.io and displays them.

A cron job is scheduled for every second which triggers the publisher to publish 20 random messages to queue every second. The subscriber reads the published messages from queue and filters them for messages with priority greater than or equal to 7. It then sends the filtered messages through socket.io. The frontend application processes the messages and displays them on the browser.
