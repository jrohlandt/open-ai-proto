import axios from "axios";
import { config } from "../../config.js";
import rake from "node-rake";
const { open_ai } = config;

const texts = [
    `Have you been dreaming of a luxury vacation on a tropical island?
\nWell it's time to wake up step foot onto warm sandy beach and into a tropical forest of with coconut trees filled with singing birds.`,
];

async function main() {
    for (const text of texts) {
        console.log(text);
        console.log("OPEN_AI: ", await runOpenAi(text));
        console.log("NODE_RAKE: ", runRake(text));
    }
}

main();

async function runOpenAi(text) {
    return new Promise((resolve, reject) => {
        const axiosInstance = axios.create({
            baseURL: open_ai.base_url,
            timeout: open_ai.timeout,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${open_ai.api_key}`,
            },
        });
        axiosInstance
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
                        content: text,
                    },
                ],
                max_tokens: 1500,
                temperature: open_ai.temperature,
            })
            .then((res) => {
                // console.log(res.data);
                // console.log(res.data.choices[0]);
                resolve(res.data.choices[0].message.content);
            })
            .catch((err) => {
                reject(err);
                // const { response: res } = err;
                // console.log(
                //     Object.keys(res),
                //     res.status,
                //     res.statusText,
                //     res.data,
                // );
                // console.log(err.config);
            });
    });
}

function runRake(text) {
    // if (!text) {
    //     log.info("No keywords (text) provided to runRake().");
    // }
    let lines = text.split("\n");

    let res = [];
    for (let line of lines) {
        if (!line) continue;

        try {
            let keywords = rake.generate(line); // { stopwords: stopW });
            if (keywords.length === 0) {
                keywords = [text];
            }
            res = [...res, ...keywords];
        } catch (err) {
            console.log(err);
            res = [...res, "keyword"];
            // log.error("Error in runRake(): ", err);
        }
    }
    return res.join(", ");
    // return res.map((kw) => removePunctuation(kw));
}
