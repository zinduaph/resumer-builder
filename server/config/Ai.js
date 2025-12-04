import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});
export default openai;

