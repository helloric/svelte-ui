import { writable } from "svelte/store";
import { updateDecibelThreshold } from "./storage-util";

export const currentDevice = writable('default');
export const currentDecibels = writable(0);

export class AudioManager {

    /** The Audio Context to work with */
    private context : AudioContext
    
    /** The Microphone */
    private audioSource : MediaStreamAudioSourceNode | undefined
    
    /** The Speech Controller that'll send/receive data based on a decibel threshold */
    public audioWorkletNode : AudioWorkletNode | undefined

    constructor() {
        this.context = new AudioContext();
    }

    /**
     * Initializes the microphone and the Audio Worklet.
     * @param stream The Microphone Media.
     */
    initMicrophone = async (stream: MediaStream) => {
        updateDecibelThreshold();
        this.audioSource = this.context.createMediaStreamSource(stream);
        await this.context.audioWorklet.addModule('src/lib/worklets/speech-controller.ts');
        this.audioWorkletNode = new AudioWorkletNode(this.context, 'speech-controller');
        this.audioSource.connect(this.audioWorkletNode);
        this.audioWorkletNode.port.onmessage = e => {
                if (e.data['event'] === 'update_decibels') {
                    currentDecibels.set(e.data['payload']['decibels']);
                }
        }
        this.audioWorkletNode.connect(this.context.destination);
    }

    blockMicrophone = () => {
        this.audioWorkletNode?.port.postMessage({'event': 'block_microphone'})
    }
    
    unblockMicrophone = () => {
        this.audioWorkletNode?.port.postMessage({'event': 'unblock_microphone'})
    }
}