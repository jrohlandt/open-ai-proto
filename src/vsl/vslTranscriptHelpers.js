export const exampleVslOne = {
    goal: "To write a video sales letter on the 10 most important tips for losing weight.",
    primaryAudience:
        "People overweight, people out of shape, people with health conditions",
    secondaryAudience: "",
    points: [
        "How to change your lifestyle in a way that will stick long term, How to select the right foods to eat, How to build exercise into your daily habits",
    ],
    testimonials: [
        "John from Dallas said that the program changed his life. In 6 months he had lost 28 pounds and brought his cholesterol down by over 100 points.",
    ],
    keyMessage: "string",
    compellingScript: "string",
    consideration: "string",
    tonality: "formal",
    length: 500,
    CTA: "Check out our 30 Days to a Healthy Lifestyle Program",
};

export const exampleVslTwo = {
    goal: "To write a video sales letter on for a revolutionary car engine cleaning liquid named SupaClean.",
    primaryAudience: "People with old cars",
    secondaryAudience: "Hobbyist car builders",
    points: [
        "Why a clean car engine is important",
        "How easy it is to use SupaClean",
    ],
    testimonials: [
        "Dirk from Parow said: I always hated getting under the bonnet of my Ford because I would always come out dirty. But now I can tune away without too much dirt on my hands.",
    ],
    keyMessage: "string",
    compellingScript: "string",
    consideration: "string",
    tonality: "excited",
    length: 500,
    CTA: "Try SupaClean today while stocks last.",
};

export function generateVideoScriptQuery(script) {
    const {
        goal,
        primaryAudience,
        tonality,
        length,
        secondaryAudience,
        points,
        CTA,
        testimonials,
        consideration,
        compellingScript,
    } = script;
    let scriptText = `I would like you write an engaging video sales letter script based on the following details I provide: 
The primary goal of this video is to ${goal};
The script should be no longer than ${length} and have a tonality of ${tonality};
The primary audience we are targeting is ${primaryAudience};
`;

    if (secondaryAudience) {
        scriptText += `\nThe secondary audience we are targeting is ${secondaryAudience};`;
    }

    if (points?.length) {
        scriptText += `\nThe main points I would like to discuss are ${points.join(
            ", ",
        )};`;
    }

    if (testimonials?.length) {
        scriptText += `\nI would like you to incorporate the following testimonials into the script: ${testimonials.join(
            ", ",
        )};`;
    }

    if (consideration) {
        scriptText += `\nAlso I would like you to take into consideration the following details: ${consideration};`;
    }

    if (compellingScript) {
        scriptText += `\nFeel free to utilize the following content to help you formula a compelling VSL script: ${compellingScript};`;
    }

    if (CTA) {
        scriptText += `\nThe call to action of the video at the end should be ${CTA}:`;
    }

    scriptText +=
        "\n\nMake sure to not include any scene descriptions and make sure you only provide the raw video sales letter script with nothing else.";

    return scriptText;
}
