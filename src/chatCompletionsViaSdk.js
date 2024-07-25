import OpenAI from "openai";
import { config } from "../config.js";
import {
    generateVideoScriptQuery,
    exampleVslOne,
} from "./vslTranscriptHelpers.js";

const openai = new OpenAI({ apiKey: config.open_ai.api_key });

async function main() {
    const completion = await openai.chat.completions.create({
        // messages: [{ role: "system", content: "You are a helpful assistant." }],
        messages: [
            {
                role: "system",
                content: generateVideoScriptQuery(exampleVslOne),
            },
        ],
        model: config.open_ai.model_chat,
    });

    console.log(completion.choices[0]);
}

main();
