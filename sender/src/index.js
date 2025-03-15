const amqp = require("amqplib");
const url = "amqps://chrawwfj:DqnCKiesnf4n_Qy4EToF6aPngX-bg9XX@collie.lmq.cloudamqp.com/chrawwfj"; // Replace with your RabbitMQ server URL
const queue = "queue";

async function sendMessage(msg) {
  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(msg));

    console.log(`Message sent to ${queue}: ${msg}`);

    await channel.close();
    await connection.close();
  } catch (err) {
    console.error("Failed to send message:", err);
  }
}

sendMessage("fuck you!")