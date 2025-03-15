const amqp = require("amqplib");
const url = "amqps://chrawwfj:DqnCKiesnf4n_Qy4EToF6aPngX-bg9XX@collie.lmq.cloudamqp.com/chrawwfj"; // Replace with your RabbitMQ server URL
const queue = "queue";

async function receiveMessage() {
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);
    await channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Received message: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("Failed to receive message:", err);
  }
}

receiveMessage();