import axios from "axios";
import { config } from "../../config.js";
import {
    generateVideoScriptQuery,
    exampleVslOne,
    exampleVslTwo,
} from "./vslTranscriptHelpers.js";

const { open_ai } = config;

const instance = axios.create({
    baseURL: open_ai.base_url,
    timeout: open_ai.timeout,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${open_ai.api_key}`,
    },
});

instance
    .post(open_ai.endpoints.chat_completions, {
        model: open_ai.model_chat,
        messages: [
            {
                role: "user",
                content: generateVideoScriptQuery(exampleVslTwo),
            },
        ],
        max_tokens: 500,
        temperature: open_ai.temperature,
    })
    .then((res) => {
        console.log(res.data);
        console.log(res.data.choices[0]);
    })
    .catch((err) => {
        const { response: res } = err;
        console.log(Object.keys(res), res.status, res.statusText, res.data);
        console.log(err.config);
    });
