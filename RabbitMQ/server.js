import express from "express";
import { connectRabbitMQ, getChannel } from "./rabbitmq.js";
import {TASK_QUEUE_NAME} from "./constants.js";

const app = express();
app.use(express.json());

// Publish a message
app.post("/publish", async (req, res) => {
  try {
    const channel = getChannel();

    channel.sendToQueue(
      TASK_QUEUE_NAME,
      Buffer.from(JSON.stringify(req.body)),
      { persistent: true }
    );

    res.json({ message: "Task published" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consume messages
app.post("/consume", async (req, res) => {
  try {
    const channel = getChannel();
    const message = await new Promise((resolve) => {
      channel.consume(
        TASK_QUEUE_NAME,
        (msg) => {
          if (msg) {
            const data = JSON.parse(msg.content.toString());
            channel.ack(msg);
            resolve(data);
          } else {
            resolve(null);
          }
        },
        { noAck: false, consumerTag: `consumer-${Date.now()}` }
      );
    });

    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get queue length
app.get("/queue-length", async (req, res) => {
  try {
    const channel = getChannel();

    const result = await channel.checkQueue(TASK_QUEUE_NAME);

    res.json({
      queue: TASK_QUEUE_NAME,
      messageCount: result.messageCount,
      consumerCount: result.consumerCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

await connectRabbitMQ();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});