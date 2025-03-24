"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWithRetry = void 0;
const axios_1 = __importDefault(require("axios"));
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sendWithRetry = (provider_1, data_1, ...args_1) => __awaiter(void 0, [provider_1, data_1, ...args_1], void 0, function* (provider, data, retries = 5) {
    let delayTime = 1000;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Sending via ${provider.name}`);
            const response = yield axios_1.default.post(provider.url, data);
            return response.data;
        }
        catch (error) {
            console.error(`Failed via ${provider.name}, retrying... (${attempt})`);
            yield delay(delayTime);
            delayTime *= 2;
        }
    }
    throw new Error(`All retries failed for ${provider.name}`);
});
exports.sendWithRetry = sendWithRetry;
