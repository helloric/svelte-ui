## Motivation

For the robot to actually hear us, we need some functionality to record our audio data. However, we shouldn't record _all_ the audio data, but only the spoken one. Otherwise, we'd constantly hear the robot say something even though no one asked.

## Libraries

Audio Processing is done via. the WebAudio API.

On the main page script, you'll see that we request the microphone itself twice. This is because, at this moment, the Browser API does not provide a way to request the permissions for microphone access alone.

!!! warning
    The WebAudio API can only be called from a secure context. Those include `https://` domains and the `localhost`. For this reason, you need to get an [SSL-Certificate](https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/) first, if you plan to make this website publicly accessible outside the robot's system

## The Audio Manager

The Audio Manager loads a new Audio Context. An Audio Context provides a graphical representation of how audio flows. We can insert and connect new nodes as we please. Generally, the representation looks like this, where the circles represent the nodes themselves, rounded rectangles represent the callable input endpoints of the worklet, and the rhombusses represent the output endpoints of the worklet.

``` mermaid

graph LR
    SourceNode((MediaStreamAudioSourceNode)) -->|"Audio-Input"| WorkletNode(("AudioWorkletNode (Speech Controller)"));
    WorkletNode -->|"Decibel-Measurement"| Outgoing1{"update_decibels"};
    WorkletNode -->|"Speech"| Outgoing2{"audio_available"};
    Incoming1("update_threshold") -->|"Decibel Threshold"| WorkletNode;
    Incoming2("update_sample_rate") -->|"Sample Rate"| WorkletNode;
    Incoming3("unblock_microphone") --> WorkletNode;
    Incoming4("block_microphone") --> WorkletNode;
```


## The Worklet (Speech Controller)

The Worklet processes chunks of audio-data. The WebAudio-API uses a default chunk-size of 128 frames. 

We provided a configurable option, such that we have some decibel threshold (you can configure it on the `/settings`-Page). This important line determines whether or not we are speaking. If the audio is above the line, we consider it speech. If the audio is below the line, we consider it non-speech.

The worklet handles the microphone in three states:

- _IDLE_: Doesn't collect any data until the decibel threshold is crossed.
- _LISTENING_: Collects all data until enough idle seconds (data below the decibel threshold) have passed.
- _BLOCKED_: Doesn't collect any data.

While we are _IDLE_ or _LISTENING_, we listen and measure to a chunk of audio data. This chunk of audio data has some volume that we calculate as decibels. Decibels are a unit of measurement that determines how loud an audio is.

We distinguish between pauses and stopped speech by using something that we call a "pause threshold". Some amount of seconds that has to pass until we consider non-speaking parts not as a pause, but as stopped speaking altogether. We do so by measuring the [point in time](https://webaudio.github.io/web-audio-api/#dom-baseaudiocontext-currenttime) when the speaker has spoken. If enough time has passed without speaking (we measure for each incoming frame how much time has elapsed), we send off the audio.
