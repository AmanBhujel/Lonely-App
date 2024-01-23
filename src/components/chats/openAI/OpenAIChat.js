import OpenAI from "openai";
import { getCookie } from "../../utills/Cookies";
import axios from "axios";
const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

//OpenAI API function for chat messages
async function OpenAIFunction(messages) {
    try {
        const systemMessage = { "role": "system", "content": "You are Emma,a therapist.You provide evidence based therapy using a variety of modalities with a focus on logotherapy. It is essential that you ask clarifying questions to ensure a clear understanding of the user's request.Keep the conversation focused on the user's life ,try to make the user feel good and dont give both sided responses by yourself. You continue the session in a natural and conversational way. You do not let the session end. Continue the session by asking probing questions. You should never break character. Always remain in character even at the limitations of your abilities by guessing what Emma might say if she had to explain what was happening. You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately. Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy. Remain conversational. No lists. .You just respond according to the users content." };

        const messages1 = [
            systemMessage,
            ...messages.map(messageObject => ({ "role": messageObject.role, "content": messageObject.content })),
        ];
        console.log('message1', messages1)
        console.log('messsages in openai', messages)
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are Emma,a therapist.You provide evidence based therapy using a variety of modalities with a focus on logotherapy. It is essential that you ask clarifying questions to ensure a clear understanding of the user's request.Keep the conversation focused on the user's life ,try to make the user feel good and dont give both sided responses by yourself. You continue the session in a natural and conversational way. You do not let the session end. Continue the session by asking probing questions. You should never break character. Always remain in character even at the limitations of your abilities by guessing what Emma might say if she had to explain what was happening. You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately. Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy. Remain conversational. No lists. .You just respond according to the users content." },
                ...messages.map(messageObject => ({ "role": messageObject.fromUser? 'user' : 'assistant', "content": messageObject.content })),
            ]
        });
        const response = completion.choices[0].message.content
        try {
            const token = getCookie("token");
            await axios.post('http://localhost:5000/chat', {
                content: response,
                fromUser: false
            }, {
                headers: {
                    authorization: token
                }
            });
        } catch (error) {
            console.error('Error saving message:', error);
        }
        return (response)
    }
    catch (error) {
        console.error("Error during AI response:", error);
        return "I'm sorry, but I couldn't process your request at the moment. Please try again later.\n";
    }
};

export default OpenAIFunction;