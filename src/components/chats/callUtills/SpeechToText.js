//------------Speech To Text------------
import OpenAIFunction from "../openAI/OpenAICalls";
import annyang from "annyang";
import { stopTextToSpeech } from "./TextToSpeech";
import axios from "axios";
import { getCookie } from "../../utills/Cookies";

const SpeechToText = ({ onCall, emotionArray, setCallChatsObject, callChatsObject, talkingRef }) => {
  if (onCall ) {
    annyang.addCallback('result', async function (phrases) {
      console.log("phrase is here")
      const lowercasePhrase = phrases[0].toLowerCase();
      const emotionString = emotionArray.map(emotion => `${emotion.name} : ${emotion.score}`).join(', ');

      const lowercasePhraseWithEmotion = `${emotionString} ${lowercasePhrase}`;

      console.log(`User said: ${lowercasePhraseWithEmotion}`);
      const userMessage = { "fromUser": true, "content": lowercasePhraseWithEmotion }
      setCallChatsObject((prevChats) => [...prevChats, userMessage]);

      await storingAudioMessage(userMessage);

      if (lowercasePhrase && !talkingRef.current) {
        try {
          talkingRef.current = true
          console.log(talkingRef.current, 'process')
          const response = await OpenAIFunction([...callChatsObject, userMessage]);
          const aiMessage = { "fromUser": false, "content": response }
          setCallChatsObject((prevChats) => [...prevChats, aiMessage]);
          await storingAudioMessage(aiMessage);
        } catch (error) {
          console.error('Error during AI response:', error);
        }
        finally {
          talkingRef.current = false;
        }
      }
      return;
    })
    annyang.start();
  } else if (!onCall) {
    annyang.removeCallback();
    annyang.abort();
    stopTextToSpeech();
  }
  return annyang;
};

export default SpeechToText;

const storingAudioMessage = async (message) => {
  try {
    const token = getCookie("token");
    await axios.post('http://localhost:5000/save-audio', message, {
      headers: {
        authorization: token
      }
    });
  } catch (error) {
    console.error('Error saving message:', error);
  }
}

