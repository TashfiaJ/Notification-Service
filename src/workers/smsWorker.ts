import amqp from "amqplib";
import { ProviderManager } from "../utils/providerManager";
import { sendWithRetry } from "../utils/retryHandler";

const providerManager = ProviderManager.getInstance();

const startSMSWorker = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("smsQueue", { durable: true });

  channel.consume("smsQueue", async (msg) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString());
      let provider = providerManager.getBestProvider("sms");
      let success = false;

      for (let attempts = 0; attempts < 3 && !success; attempts++) {
        try {
          await sendWithRetry(provider, message);
          success = true;
        } catch {
          provider = providerManager.getBestProvider("sms"); 
        }
      }

      if (!success) {
        await channel.sendToQueue("DLQ", msg.content, { persistent: true });
      }

      channel.ack(msg); 
    }
  });

  console.log("SMS Worker Started");
};

startSMSWorker();
