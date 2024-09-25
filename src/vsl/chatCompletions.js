import axios from "axios";
import { config } from "../../config.js";
import {
    generateVideoScriptQuery,
    exampleVslOne,
    exampleVslTwo,
    exampleVslThree,
} from "./vslTranscriptHelpersTwo.js";

const { open_ai } = config;

const instance = axios.create({
    baseURL: open_ai.base_url,
    timeout: open_ai.timeout,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${open_ai.api_key}`,
    },
});

const scriptQuery = generateVideoScriptQuery(exampleVslThree);

instance
    .post(open_ai.endpoints.chat_completions, {
        model: open_ai.model_chat,
        messages: [
            {
                role: "user",
                content: scriptQuery,
            },
        ],
        max_tokens: 4000,
        temperature: open_ai.temperature,
    })
    .then((res) => {
        console.log({ scriptQuery });
        res.data.choices.forEach((c, i) => {
            console.log(res.data.choices[i]);
            const words = res.data.choices[i].message.content.split(" ");
            console.log("Word count: ", words.length);
        });
        console.log(res.data);
    })
    .catch((err) => {
        const { response: res } = err;
        console.log(Object.keys(res), res.status, res.statusText, res.data);
        console.log(err.config);
    });
