import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendWithRetry = async (
  provider: { name: string; url: string },
  data: any,
  retries = 5
) => {
  let delayTime = 1000;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}: Sending via ${provider.name}`);
      const response = await axios.post(provider.url, data);
      return response.data;
    } catch (error) {
      console.error(`Failed via ${provider.name}, retrying... (${attempt})`);
      await delay(delayTime);
      delayTime *= 2;
    }
  }

  throw new Error(`All retries failed for ${provider.name}`);
};

