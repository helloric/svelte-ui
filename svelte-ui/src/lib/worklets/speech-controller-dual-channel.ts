class SpeechControllerDualChannel extends AudioWorkletProcessor {

    /** The audio frames that should end up in Channel 0. */
    framesChannel0 : Float32Array | undefined;
    /** The audio frames that should end up in Channel 1. */
    framesChannel1 : Float32Array | undefined;

    /** The threshold above which audio is considered speech. */
    decibelThreshold = -64;

    /** The microphone state. (0 = IDLE, 1 = LISTENING, 2 = BLOCKED) */
    microphoneState : 0 | 1 | 2 = 2;

    /** The sampling rate. */
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
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
        let channel0: Float32Array = inputs[0][0];
        let channel1: Float32Array = inputs[0][1];

        let measurement = this.measureData(channel0, channel1);
        this.port.postMessage({event: 'update_decibels', payload: {'decibels': measurement[2]}});

        switch (this.microphoneState) {
            case 0:
                if (measurement[2] >= this.decibelThreshold) {
                    this.collect(channel0, channel1);
                    this.startTime = currentTime;
                    this.microphoneState = 1;
                }
                break;
            case 1:
                this.collect(channel0, channel1);
                if (measurement[2] < this.decibelThreshold) {
                    if (currentTime - this.startTime >= 0.3) {
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
        this.port.postMessage({event: 'audio_available', payload: {'audio_data': {'0': this.framesChannel0, '1': this.framesChannel1}}});
        this.clear()
        this.startTime = currentTime;
        this.microphoneState = 2;
    }

    /**
     * Puts a decibel count to the measured data.
     * @param channel0 The data from channel 0
     * @param channel1 The data from channel 1
     * @returns A decibel count and the original audios.
     */
    private measureData = (channel0: Float32Array, channel1: Float32Array): [Float32Array, Float32Array, number] => {
        let sum1 = channel0.reduce((acc, next) => acc + (next * next), 0);
        if (channel1) {
            let sum2 = channel1.reduce((acc, next) => acc + (next * next), 0);
            let sum = sum1 + sum2;
            
            let rms = Math.sqrt(sum / (channel0.length + channel1.length));
            
            let db = 20 * Math.log10(rms)
    
            return [channel0, channel1, db];
        } else {
            let rms = Math.sqrt(sum1 / channel0.length);
            let db = 20 * Math.log10(rms);
            return [channel0, channel0, db];
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
     * Collects frames into their corresponding collections.
     * Appends all data from ch0/1 to this.framesChannel0/1
     * @param ch0 The frames from channel 0.
     * @param ch1 The frames from channel 1.
     */
    private collect = (ch0: Float32Array, ch1: Float32Array) => {
        // this.framesChannel0 = Float32Array.of(...this.framesChannel0, ...ch0)
        this.framesChannel0 = this.appendFrames(this.framesChannel0, ch0);
        if (!ch1) {
            this.framesChannel1 = this.framesChannel0;
            return;
        }
        this.framesChannel1 = this.appendFrames(this.framesChannel1, ch1);
    }

    /**
     * Clears the corresponding collections.
     */
    private clear = () => {
        this.framesChannel0 = undefined;
        this.framesChannel1 = undefined;
    }
}

registerProcessor('speech-controller-dual-channel', SpeechControllerDualChannel)

