import { smsProviders, emailProviders } from "../config/env";

export class ProviderManager {
  private static instance: ProviderManager;
  private smsIndex = 0;
  private emailIndex = 0;

  private constructor() {}

  static getInstance() {
    if (!ProviderManager.instance) {
      ProviderManager.instance = new ProviderManager();
    }
    return ProviderManager.instance;
  }

  getBestProvider(type: "sms" | "email") {
    const providers = type === "sms" ? smsProviders : emailProviders;
    
    if (providers.length === 0) throw new Error(`No providers available for ${type}`);

    const index = type === "sms" ? this.smsIndex++ : this.emailIndex++;
    return providers[index % providers.length]; // Round-Robin selection
  }
}

