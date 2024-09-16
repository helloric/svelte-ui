<script lang="ts">
	import { currentDecibels, AudioManager } from "$lib/audio_manager";
	import Slider from "$lib/components/Slider.svelte";
	import { currentDevice, decibelThreshold, setCurrentDevice, setDecibelThreshold, updateCurrentDevice, updateDecibelThreshold } from "$lib/storage-util";
	import { onMount, type ComponentEvents } from "svelte";
	import { writable, type Writable } from "svelte/store";

    let inputDevices : Writable<MediaDeviceInfo[]> = writable([]);
    let selected : Writable<MediaDeviceInfo> = writable();
    let deviceList : MediaDeviceInfo[] = [];
    let selectedDevice : MediaDeviceInfo;
    let decibels : number = 0;
    let dbThreshold : number = $decibelThreshold;

    onMount(async () => {
        updateDecibelThreshold();
        updateCurrentDevice();

        inputDevices.subscribe((array) => deviceList = array);
        currentDecibels.subscribe((val) => decibels = val);
        decibelThreshold.subscribe((val) => dbThreshold = val);
        
        selected.subscribe((val) => selectedDevice = val);
        let deviceInfos = await navigator.mediaDevices.enumerateDevices();
        selected.set(deviceInfos.find(devInfo => devInfo.deviceId === $currentDevice)!!);
        inputDevices.set(deviceInfos.filter(device => device.kind === "audioinput"));
        let stream = await navigator.mediaDevices.getUserMedia({audio: {deviceId: $currentDevice}});
        
        let microphone = new AudioManager();
        await microphone.initMicrophone(stream);
    });

    

    const onSliderDroppedOff = (event: ComponentEvents<Slider>['dropoff']) => {
        console.log(event.detail.toString());
        setDecibelThreshold(event.detail.toString());
    }

    const changeDevice = () => {
        setCurrentDevice(selectedDevice.deviceId);
    }

</script>

<h1>Select Input Device: </h1>

<select bind:value={selectedDevice} on:change={_ => changeDevice()}>
    {#each deviceList as device}
        <option value={device}>
            {device.label}
        </option>
    {/each}
</select>

<h1>Select Decibel Threshold:</h1>

<Slider lowerRange={-100} upperRange={0} backgroundValue={decibels} bind:defaultValue={dbThreshold} on:dropoff={onSliderDroppedOff}></Slider>