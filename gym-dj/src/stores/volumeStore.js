import { writable } from "svelte/store";

export const volumeStore = writable(50);

export const setVolumeStore = volume => {
	volumeStore.update(vol => (vol = volume));
};
