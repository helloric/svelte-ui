// @ts-ignore
class SpeechControllerDualChannel extends AudioWorkletProcessor {

    /** The audio frames that should end up in Channel 0. */
    framesChannel0 : Float32Array = Float32Array.of();
    /** The audio frames that should end up in Channel 1. */
    framesChannel1 : Float32Array = Float32Array.of();

    /** 
     * Audio frames that are measured below a certain threshold in Channel 0. 
     * Will be cleared each time audio frames above a certain threshold are detected. 
     */
    idleFramesChannel0 : Float32Array = Float32Array.of();
    
    /** 
     * Audio frames that are measured below a certain threshold in Channel 1. 
     * Will be cleared each time audio frames above a certain threshold are detected. 
     */
    idleFramesChannel1 : Float32Array = Float32Array.of();

    /** The threshold above which audio is considered speech. */
    decibelThreshold = -64;

    /** The microphone state. (0 = IDLE, 1 = LISTENING, 2 = BLOCKED) */
    microphoneState : 0 | 1 | 2 = 2;

    /** The sampling rate. */
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
        let channel0: Float32Array = inputs[0][0];
        let channel1: Float32Array = inputs[0][1];

        let measurement = this.measureData(channel0, channel1);
        this.port.postMessage({event: 'update_decibels', payload: {'decibels': measurement[2]}});

        switch (this.microphoneState) {
            case 0:
                if (measurement[2] >= this.decibelThreshold) {
                    this.collect('frames', channel0, channel1);
                    this.microphoneState = 1;
                }
                break;
            case 1:
                this.collect('frames', channel0, channel1);
                if (measurement[2] < this.decibelThreshold) {
                    this.collect('idleFrames', channel0, channel1);
                    if (this.idleFramesChannel0.length >= this.getFrameSeconds(3)) {
                        this.send();
                    }
                } else {
                    this.clear('idleFrames')
                }
        }

        return true;
    }

    /**
     * Sends out the collected audio frames.
     */
    send() {
        this.port.postMessage({event: 'audio_available', payload: {'audio_data': {'0': this.framesChannel0, '1': this.framesChannel1}}});
        this.clear('frames')
        this.clear('idleFrames')
        this.microphoneState = 2;
    }

    /**
     * Gets a certain amount of frames over the course of n seconds.
     * @param seconds The n seconds
     * @returns A certain amount of frames over the course of n seconds.
     */
    getFrameSeconds(seconds: number) {
        return Math.round(this.sampleRate / 8 * seconds);
    }

    /**
     * Puts a decibel count to the measured data.
     * @param channel0 The data from channel 0
     * @param channel1 The data from channel 1
     * @returns A decibel count and the original audios.
     */
    private measureData = (channel0: Float32Array, channel1: Float32Array): [Float32Array, Float32Array, number] => {
        let sum1 = channel0.reduce((acc, next) => acc + (next * next), 0);
        let sum2 = channel1.reduce((acc, next) => acc + (next * next), 0);
        let sum = sum1 + sum2;
        
        let rms = Math.sqrt(sum / (channel0.length + channel1.length));
        
        let db = 20 * Math.log10(rms)

        return [channel0, channel1, db];
    }

    /**
     * Collects frames into their corresponding collections.
     * @param frames The collection to be filled
     * @param ch0 The frames from channel 0.
     * @param ch1 The frames from channel 1.
     */
    private collect = (frames: 'idleFrames' | 'frames', ch0: Float32Array, ch1: Float32Array) => {
        this[`${frames}Channel0`] = Float32Array.of(...this[`${frames}Channel0`], ...ch0)
        this[`${frames}Channel1`] = Float32Array.of(...this[`${frames}Channel1`], ...ch1)
    }

    /**
     * Clears the corresponding collections.
     * @param frames The collection to be cleared.
     */
    private clear = (frames : 'idleFrames' | 'frames') => {
        this[`${frames}Channel0`] = Float32Array.of();
        this[`${frames}Channel1`] = Float32Array.of();   
    }
}

registerProcessor('speech-controller-dual-channel', SpeechControllerDualChannel)

