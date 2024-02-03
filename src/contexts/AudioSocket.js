// ----------------Audio Socket to get HUME real time data--------------
import { useEffect, useRef, useState } from "react";
import blobToBase64 from '../components/chats/callUtills/base64';
import { AudioRecorder } from "../components/Hume-org-files/audioRecorder";
import { TopEmotions } from "../components/Hume-org-files/TopEmotions";
import { DiscreteTimeline } from "./DiscreteTimeline";
import { useCallContext } from "./CallContext";

export function AudioSocket({ modelName, recordingLengthMs, streamWindowLengthMs, onTimeline }) {
  const socketRef = useRef(null);
  const recorderRef = useRef(null);
  const audioBufferRef = useRef([]);
  const mountRef = useRef(true);
  const numReconnects = useRef(0);
  const serverReadyRef = useRef(true);
  const [predictions, setPredictions] = useState([]);
  const [status, setStatus] = useState("");

  const maxReconnects = 3;
  const { setEmotionArray } = useCallContext();

  const emotions = predictions.length === 0 ? [] : predictions[0].emotions;

  useEffect(() => {
    mountRef.current = true;
    connect();

    return () => {
      console.log("Tearing down component");
      stopEverything();
    };
  }, []);


  //connect to websocket
  async function connect() {
    const apikey = process.env.REACT_APP_HUME_AI_API;
    const baseUrl = 'wss://api.hume.ai';
    const socketUrl = `${baseUrl}/v0/stream/models?apikey=${apikey}`;

    serverReadyRef.current = true;

    console.log(`Connecting to websocket... (using ${socketUrl})`);
    setStatus(`Connecting to server...`);
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = socketOnOpen;
    socketRef.current.onmessage = socketOnMessage;
    socketRef.current.onclose = socketOnClose;
    socketRef.current.onerror = socketOnError;
  }


  async function socketOnOpen() {
    console.log("Connected to websocket");
    setStatus("");

    recorderRef.current = await AudioRecorder.create();

    while (mountRef.current) { //condtion to keep recording as long as function is mounted and records the audio each loop 
      const blob = await recorderRef.current.record(recordingLengthMs)
      audioBufferRef.current.push(blob);
      if (serverReadyRef.current) {
        sendRequest();
      }
    }
  }

  async function socketOnMessage(event) {
    setStatus("");
    const response = JSON.parse(event.data);
    console.log("Got response", response);

    //extract prediction data
    const newPredictions = response[modelName]?.predictions || [];
    const warning = response[modelName]?.warning || "";
    const error = response.error;

    const allEmotions = newPredictions.flatMap(prediction => prediction.emotions || []);
    const topEmotions = allEmotions.sort((a, b) => b.score - a.score).slice(0, 3);
    if (allEmotions.length > 0) {
      setEmotionArray(topEmotions)
    }
    if (error) {
      setStatus(error);
      console.error(error);
      stopEverything();
      return;
    }

    //update prediction and status
    setPredictions(newPredictions);

    //emotion array

    // const topEmotions = TopEmotions({ emotions, numEmotions: 3 });
    // // const topEmotions = TopEmotions(newPredictions.map(prediction => prediction.emotions))
    // // setEmotionArray(topEmotions);
    // console.log(topEmotions)

    // ------Yo maile lekheko ________
    // const emotionsArray = response;

    // if (emotionsArray) {
    //   // const topEmotions = emotionsArray
    //   //   .sort((a, b) => b.score - a.score)
    //   //   .slice(0, 3)
    //   //   .map((emotion) => emotion.name);

    //   // const res = emotionsArray.prosody?.predictions

    //   console.log("Top emotions:", emotionsArray.prosody?.predictions[0]);
    // } else {
    //   console.log("Emotions data not available in the response.");
    // }





    if (onTimeline) {
      onTimeline(newPredictions);
    }
    if (newPredictions.length === 0) {
      if (modelName === 'burst') {
        setStatus("No vocal bursts detected");
      } else {
        setStatus("No speech detected");
      }
    }

    // send next audio buffer
    if (audioBufferRef.current.length > 0) {
      sendRequest();
    } else {
      serverReadyRef.current = true;
    }
  }

  async function socketOnClose(event) {
    console.log("Socket closed");

    if (mountRef.current === true) {
      setStatus("Reconnecting");
      console.log("Component still mounted, will reconnect... let's hope it does");
      connect();
    } else {
      console.log("Component unmounted, will not reconnect...");
    }
  }

  async function socketOnError(event) {
    console.log("Socket error", event);
    if (numReconnects.current > maxReconnects) {
      setStatus('Failed to connect to Hume API..... who broke the code again?');
      stopEverything();
    } else {
      // numReconnects++;
      console.warn('connection attempt');
    }
  }

  //function for clean up
  function stopEverything() {
    console.log("stopping everything...., was it intensional ?");
    mountRef.current = false;
    const socket = socketRef.current;
    if (socket) {
      console.log("socket tried to close, but will stay connected")
      socket.close();
      socketRef.current = null;
    } else {
      console.warn("could not close socket, not initialized yet");
    }
    const recorder = recorderRef.current;
    if (recorder) {
      console.log("Stopping recorder");
      recorder.stopRecording();
      recorderRef.current = null;
    } else {
      console.warn("could not stop recorder, not initialized yet");
    }
  }


  async function sendRequest() {
    console.log(`Will send ${audioBufferRef.current.length} recorded blobs to server`);
    const socket = socketRef.current;

    if (!socket) {
      console.log("No socket");
      return;
    }

    if (socket.readyState === WebSocket.OPEN) {
      const combinedBlob = new Blob(audioBufferRef.current);
      serverReadyRef.current = false;
      audioBufferRef.current = [];

      const encodedBlob = await blobToBase64(combinedBlob);
      const response = JSON.stringify({
        data: encodedBlob,
        models: {
          [modelName]: {},
        },
        stream_window_ms: streamWindowLengthMs,
      });

      socket.send(response);
    } else {
      console.log("Socket not open, attempting to reconnect...");
      socket.close();
    }
  }
  return
}


// defining audio scoket to nulll
AudioSocket.defaultProps = {
  onTimeline: () => { },
};


{/* <div>
<div className="md:flex">
   {!onTimeline && <TopEmotions emotions={emotions} />}
   {onTimeline && (
     <div className="ml-10">
       <DiscreteTimeline predictions={predictions} />
     </div>
   )}
 </div>

 <div>{status}</div>
 <p>12</p>
</div> */}