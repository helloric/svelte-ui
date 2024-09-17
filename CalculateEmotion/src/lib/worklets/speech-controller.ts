// @ts-ignore
class SpeechController extends AudioWorkletProcessor {

    frames : Float32Array = Float32Array.of();
    idle_frames : Float32Array = Float32Array.of();
    decibelThreshold = -64;
    microphoneState = 2;
    sampleRate = 44100;

    port : MessagePort = this.port; // Purely done just so auto completion works, because for whatever reason the AudioWorkletProcessor is not yet in TypeScript?

    constructor() {
        super();
        this.port.onmessage = (e) => {
            switch (e.data['event']) {
                case 'update_threshold':
                    this.decibelThreshold = e.data['payload']['threshold'];
                    break;
                case 'update_sample_rate':
                    this.sampleRate = e.data['payload']['sampleRate'];
                    break;
                case 'unblock_microphone':
                    this.microphoneState = 0;
                    break;
                case 'block_microphone':
                    this.microphoneState = 2;
                    break;
            }
        }
    }

    /**
     * Processes any microphone input, recognizing when to look for speech and when not.
     * @param inputs The input data of the microphone, a 2D-Float32Array.
     * @param outputs The output data of the microphone, usually not used.
     * @param parameters The parameters
     * @returns Whether or not to continue processing.
     */
    //@ts-ignore
    process(inputs, outputs, parameters: any) {
        let measurement = this.measureData(inputs[0][0]);
        this.port.postMessage({event: 'update_decibels', payload: {'decibels': measurement[1]}});

        switch (this.microphoneState) {
            case 0:
                if (measurement[1] >= this.decibelThreshold) {
                    this.frames = Float32Array.of(...this.frames, ...measurement[0]);
                    this.microphoneState = 1;
                }
                break;
            case 1:
                this.frames = Float32Array.of(...this.frames, ...measurement[0]);
                if (measurement[1] < this.decibelThreshold) {
                    this.idle_frames = Float32Array.of(...this.idle_frames, ...measurement[0]);
                    if (this.idle_frames.length >= this.getFrameSeconds(2)) {
                        outputs[0] = this.frames;
                        this.send();
                    }
                } else {
                    this.idle_frames = Float32Array.of();
                }
        }

        return true;
    }

    send() {
        this.port.postMessage({event: 'audio_available', payload: {'audio_data': this.frames}});
        this.frames = Float32Array.of();
        this.idle_frames = Float32Array.of();
        this.microphoneState = 2;
    }

    getFrameSeconds(seconds: number) {
        return Math.round(this.sampleRate / 8 * seconds);
    }

    private measureData = (data: Float32Array) : [Float32Array, number] => {
        let sum = data.reduce((acc, next) => acc + (next * next), 0);
        
        let rms = Math.sqrt(sum / data.length);
        
        let db = 20 * Math.log10(rms)

        return [data, db];
    }
}

registerProcessor('speech-controller', SpeechController)

