<script>
	import Fa from "svelte-fa";
	import {
		faVolumeDown,
		faVolumeMute,
		faVolumeUp,
		faVolumeOff,
	} from "@fortawesome/free-solid-svg-icons";
	import { setVolumeStore, volumeStore } from "../../../stores/volumeStore";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<div class="slidecontainer">
	<!-- <label for="volume-slider">0</label> -->
	{#if $volumeStore === 0}
		<Fa icon={faVolumeMute} />
	{:else if $volumeStore < 25}
		<Fa icon={faVolumeOff} />
	{:else if $volumeStore < 60}
		<Fa icon={faVolumeDown} />
	{:else}
		<Fa icon={faVolumeUp} />
	{/if}
	<input
		id="myRange"
		class="slider"
		type="range"
		min="0"
		max="100"
		step="1"
		name="volume"
		bind:value={$volumeStore}
		on:change={() => {
			dispatch("volCh");
		}}
	/>

	<label for="volume-slider">{$volumeStore}</label>
</div>

<style>
	.slidecontainer {
		width: 95%; /* Width of the outside container */
		margin: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.slidecontainer label {
		width: 20px;
		text-align: center;
	}

	/* The slider itself */
	.slider {
		-webkit-appearance: none; /* Override default CSS styles */
		appearance: none;
		/* width: 200px; Full-width */
		width: 90%;
		height: 0.5rem; /* Specified height */
		margin: 0 5px;
		padding: 0;
		background: #d3d3d3; /* Grey background */
		outline: none; /* Remove outline */
		opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
		-webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
		transition: opacity 0.2s;
	}

	/* Mouse-over effects */
	.slider:hover {
		opacity: 1; /* Fully shown on mouse-over */
	}

	/* The thumb slider handle */
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		width: 17px; /* Set a specific slider handle width */
		height: 17px; /* Slider handle height */
		border-radius: 50%;
		background: #888; /* Green background */
		cursor: pointer; /* Cursor on hover */
		transition: background 0.2s;
	}

	.slider::-moz-range-thumb {
		width: 17px; /* Set a specific slider handle width */
		height: 17px; /* Slider handle height */
		background: #4caf50; /* Green background */
		cursor: pointer; /* Cursor on hover */
	}
</style>
