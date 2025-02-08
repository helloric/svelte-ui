enum MicrophoneState {
    IDLE = 0,
    LISTENING = 1,
    BLOCKED = 2
}

class SpeechController extends AudioWorkletProcessor {

     /** The audio frames. */
    frames : Float32Array | undefined;

    idle_frames: Float32Array | undefined;

    /** The threshold above which audio is considered speech. */
    decibelThreshold = -64;

    /** The microphone state. (0 = IDLE, 1 = LISTENING, 2 = BLOCKED) */
    microphoneState : MicrophoneState = MicrophoneState.BLOCKED;

    /** The sampling rate */
    sampleRate = 44100;

    /** The start time. Updates for each speech-frame. */
    startTime : number = currentTime;
    
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
                    this.microphoneState = MicrophoneState.IDLE;
                    break;
                case 'block_microphone':
                    this.microphoneState = MicrophoneState.BLOCKED;
                    break;
            }
        }
    }

    /**
     * Append incoming frame data to framesChannel member variable.
     * @param framesCh member framesChannel0/1
     * @param ch input data from ch0/1
     * @returns combined data or ch0/1 if framesChannel is empty
     */
    private appendFrames(framesCh: Float32Array | undefined, ch: Float32Array): Float32Array {
        if (!framesCh) {
            return ch;
        }
        const temp0 = new Float32Array(framesCh.length + ch.length);
        temp0.set(framesCh, 0);
        temp0.set(ch, framesCh.length);
        return temp0;
    }

    /**
     * Processes any microphone input, recognizing when to look for speech and when not.
     * @param inputs The input data of the microphone, a 2D-Float32Array.
     * @param outputs The output data of the microphone, usually not used.
     * @param parameters The parameters
     * @returns Whether or not to continue processing.
     */
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
        let measurement = this.measureData(inputs[0][0]);
        this.port.postMessage({event: 'update_decibels', payload: {'decibels': measurement[1]}});

        switch (this.microphoneState) {
            case 0:
                if (measurement[1] >= this.decibelThreshold) {
                    this.frames = this.appendFrames(this.frames, measurement[0]);
                    this.microphoneState = MicrophoneState.LISTENING;
                    this.startTime = currentTime;
                }
                break;
            case 1:
                this.frames = this.appendFrames(this.frames, measurement[0]);
                if (measurement[1] < this.decibelThreshold) {
                    this.idle_frames = this.appendFrames(this.idle_frames, measurement[0]);
                    if (currentTime - this.startTime >= 0.3) {
                        outputs[0][0] = this.frames;
                        this.send();
                    }
                } else {
                    this.startTime = currentTime;
                }
        }
        return true;
    }
    
    /**
     * Sends out the collected audio frames.
     */
    send() {
        this.port.postMessage({event: 'audio_available', payload: {'audio_data': this.frames}});
        this.frames = Float32Array.of();
        this.startTime = currentTime;
        this.microphoneState = MicrophoneState.BLOCKED;
        this.clear();
    }

    /**
     * Puts a decibel count to the measured data.
     * @param data The audio data
     * @returns A decibel count and the original audio.
     */
    private measureData = (data: Float32Array) : [Float32Array, number] => {
        let sum = data.reduce((acc, next) => acc + (next * next), 0);
        
        let rms = Math.sqrt(sum / data.length);
        
        let db = 20 * Math.log10(rms)

        return [data, db];
    }

    /**
     * Clears the corresponding collections.
     */
    private clear = () => {
        this.frames = undefined;
        this.idle_frames = undefined;
    }
}

registerProcessor('speech-controller', SpeechController)

