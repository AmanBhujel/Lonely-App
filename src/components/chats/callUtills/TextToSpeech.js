// ------------Text to Speech-----------
import OpenAI from "openai";

let audio = null;

async function TextToSpeech(response) {
  const apiKey = process.env.REACT_APP_OPEN_AI_API_KEY;
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: response,
    });

    const blob = new Blob([await mp3.arrayBuffer()], { type: "audio/mp3" });
    const audioUrl = URL.createObjectURL(blob);

    // Use a local variable instead of a global variable
    const localAudio = new Audio(audioUrl);

    // Add an event listener to catch when the audio playback ends
    localAudio.addEventListener("ended", () => {
      // Delay the revocation of the object URL to ensure playback is complete
      setTimeout(() => {
        URL.revokeObjectURL(audioUrl);
      }, 20000); // You can adjust the delay as needed

      // Clean up resources when playback ends
      localAudio.remove();
    });

    // Play the audio and handle the promise
    const playPromise = localAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback started successfully
          console.log("Audio playback started!");
        })
        .catch((error) => {
          // console.log(error)
        });
    }

    // Assign localAudio to the global audio variable
    audio = localAudio;
  } catch (error) {
    console.error("Error during audio creation:", error);
  }
}

function stopTextToSpeech() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

export { TextToSpeech, stopTextToSpeech };
