!!! warning
    The WebAudio API can only be called from a secure context. Those include `https://` domains and the `localhost`. For this reason, you need to get an [SSL-Certificate](https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/) first, if you plan to make this website publicly accessible outside the robot's system. 

Audio Processing is done via. the WebAudio API.

On the main page script, you'll see that we request the microphone itself twice. This is because, at this moment, the Browser API does not provide a way to request the permissions for microphone access alone.

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

