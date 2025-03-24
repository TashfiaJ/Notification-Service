"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderManager = void 0;
const env_1 = require("../config/env");
class ProviderManager {
    constructor() {
        this.smsIndex = 0;
        this.emailIndex = 0;
    }
    static getInstance() {
        if (!ProviderManager.instance) {
            ProviderManager.instance = new ProviderManager();
        }
        return ProviderManager.instance;
    }
    getBestProvider(type) {
        const providers = type === "sms" ? env_1.smsProviders : env_1.emailProviders;
        if (providers.length === 0)
            throw new Error(`No providers available for ${type}`);
        const index = type === "sms" ? this.smsIndex++ : this.emailIndex++;
        return providers[index % providers.length]; // Round-Robin selection
    }
}
exports.ProviderManager = ProviderManager;
