import { writable } from "svelte/store"

export const decibelThreshold = writable(-64);
export const currentDevice = writable('default');

export const updateDecibelThreshold = () => {
    if (window.localStorage.getItem('decibelThreshold') !== null) {
        decibelThreshold.set(Number.parseFloat(window.localStorage.getItem('decibelThreshold')!!));
    } else {
        decibelThreshold.set(-64);
    }
}

export const setDecibelThreshold = (decibels: number) => {
    window.localStorage.setItem('decibelThreshold', decibels.toString());
}

export const updateCurrentDevice = () => {
    if (window.localStorage.getItem('currentDevice') !== null) {
        currentDevice.set(window.localStorage.getItem('currentDevice')!!)
    } else {
        currentDevice.set('default');
    }
}

export const setCurrentDevice = (deviceId: string) => {
    window.localStorage.setItem('currentDevice', deviceId);
}