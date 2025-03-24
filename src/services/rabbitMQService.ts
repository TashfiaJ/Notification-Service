import amqp from "amqplib";
import { RABBITMQ_URL } from "../config/env";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  await channel.assertQueue("smsQueue", { durable: true });
  await channel.assertQueue("emailQueue", { durable: true });
  await channel.assertQueue("DLQ", { durable: true });

  console.log("Connected to RabbitMQ");
};

export const publishMessage = (queue: string, message: any) => {
  if (!channel) throw new Error("RabbitMQ not initialized");
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
};
