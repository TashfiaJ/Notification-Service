import dotenv from "dotenv";

dotenv.config();

const parseProviders = (key: string) => {
  const providers = process.env[key]?.split(",") || [];
  return providers.map((provider) => {
    const [name, url, weight] = provider.split("|");
    return { name, url, weight: Number(weight) || 1 };
  });
};

export const smsProviders = parseProviders("SMS_PROVIDERS");
export const emailProviders = parseProviders("EMAIL_PROVIDERS");

export const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
export const PORT = process.env.PORT || 3000;


