import OpenAI from "openai";
import {TextToSpeech} from "../callUtills/TextToSpeech";

const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

//OpenAI API function for chat calls
async function OpenAIFunction(messages) {
  try {
    const prompt = await fetch('prompt.txt')
    const systemMessageContent = await prompt.text();
    const systemMessage = { "role": "system", 
    "content": systemMessageContent };

    const messagesToSend = [
      systemMessage,
      ...messages.map(messageObject => ({ "role": messageObject.fromUser ? 'user': 'assistant', "content": messageObject.content })),
    ];
    // console.log('message', messagesToSend)
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messagesToSend,
    });

    const response = completion.choices[0].message.content
    console.log('response is here', response)
     await TextToSpeech(response);
    return(response)
  }
  catch (error) {
    console.error("Error during AI response:", error);
    return "I'm sorry, but I couldn't process your request at the moment. Let's try again later.\n";
  }
}

export default OpenAIFunction;


