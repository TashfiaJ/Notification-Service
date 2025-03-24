import amqp from "amqplib";
import { ProviderManager } from "../utils/providerManager";
import { sendWithRetry } from "../utils/retryHandler";

const providerManager = ProviderManager.getInstance();

const startEmailWorker = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("emailQueue", { durable: true });

  channel.consume("emailQueue", async (msg) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString());
      let provider = providerManager.getBestProvider("email");
      let success = false;

      for (let attempts = 0; attempts < 3 && !success; attempts++) {
        try {
          await sendWithRetry(provider, message);
          success = true;
        } catch {
          provider = providerManager.getBestProvider("email"); 
        }
      }

      if (!success) {
        await channel.sendToQueue("DLQ", msg.content, { persistent: true });
      }

      channel.ack(msg);
    }
  });

  console.log("Email Worker Started");
};

startEmailWorker();

