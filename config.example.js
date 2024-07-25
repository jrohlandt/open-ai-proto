export const config = {
    open_ai: {
        temperature: 0,
        model_instruct: "gpt-3.5-turbo-instruct",
        model_chat: "gpt-3.5-turbo",
        api_key: "API_KEY",
        base_url: "https://api.openai.com/v1",
        timeout: 30000,
        num_completions: 1,
        endpoints: {
            completions: "completions",
            chat_completions: "chat/completions",
        },
    },
};
