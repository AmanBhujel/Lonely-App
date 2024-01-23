import { sleep } from "../chats/callUtills/asyncutils";

export class AudioRecorder {
    constructor(recorder, mediaStream) {
      this.recorder = recorder;
      this.mediaStream = mediaStream;
    }
  
    static async create() {
      const mediaOptions = { video: false, audio: true };
      const mediaStream = await navigator.mediaDevices.getUserMedia(mediaOptions);
      const recorder = new MediaRecorder(mediaStream);
      return new AudioRecorder(recorder, mediaStream);
    }
  
    async stopRecording() {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  
    record(length) {
      return new Promise(async (resolve, _) => {
        this.recorder.ondataavailable = (blobEvent) => {
          resolve(blobEvent.data);
        };
  
        if (this.recorder.state !== "recording") this.recorder.start();
        await sleep(length);
        if (this.recorder.state === "recording") this.recorder.stop();
      });
    }
  }
  