import amqp from "amqplib";
import { TASK_QUEUE_NAME } from "./constants.js";

let channel;

export async function connectRabbitMQ() {
  const connection = await amqp.connect(
    "amqp://guest:guest@localhost:5672"
  );

  channel = await connection.createChannel();

  await channel.assertQueue(TASK_QUEUE_NAME, {
    durable: true,
  });

  console.log("Connected to RabbitMQ");
}

export function getChannel() {
  return channel;
}