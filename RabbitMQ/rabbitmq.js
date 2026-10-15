import amqp from "amqplib";

let channel;

export async function connectRabbitMQ() {
  const connection = await amqp.connect(
    "amqp://guest:guest@localhost:5672"
  );

  channel = await connection.createChannel();

  await channel.assertQueue("tasks", {
    durable: true,
  });

  console.log("Connected to RabbitMQ");
}

export function getChannel() {
  return channel;
}