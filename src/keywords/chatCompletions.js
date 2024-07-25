import axios from "axios";
import { config } from "../../config.js";

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
                role: "system",
                content: `You will be provided with a block of text, and your task is to extract a list of keywords or keyword pairs from it.
                Keywords should be ordered by most relevant first.
                Do not create keywords that are not in the text that I provided you.
                You should return the keywords as a comma separated string like this: "keyword1, keyword2, keyword3". 
                Don't include any whitespace (line breaks etc). 
                If you cannot find any keywords then say no_kw.
                `,
            },
            {
                role: "user",
                content: `Have you been dreaming of a luxury vacation on a tropical island?
                Well it's time to wake up step foot onto warm sandy beach and into a tropical forest of with coconut trees filled with singing birds.`,
            },
            // {
            //     role: "user",
            //     content: `Tomorrow will be the first day of the 22nd century`,
            // },
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
