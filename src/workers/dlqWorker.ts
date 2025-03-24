import amqp from "amqplib";

const startDLQWorker = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("DLQ", { durable: true });

  channel.consume("DLQ", async (msg) => {
    if (msg) {
      console.error("Message moved to DLQ:", msg.content.toString());
      channel.ack(msg);
    }
  });

  console.log("DLQ Worker Started - Monitoring Failed Messages");
};

startDLQWorker();
