<script>
	import { createEventDispatcher } from "svelte";

	export let currTimeDisplay;
	export let totalTimeDisplay;
	export let progress = 0;

	const dispatch = createEventDispatcher();
</script>

<section id="progress-bar">
	<div id="time">
		<span id="progress-time">{currTimeDisplay}</span>
		<span id="track-duration">{totalTimeDisplay}</span>
	</div>
	<div class="progress">
		<div class="seek_cont">
			<input type="range" min="0" max="100" bind:value={progress} class="seek_slider" on:change={() => dispatch("seek", { progress: progress })} />
		</div>
		<div id="progress-bar-cont">
			<span id="bar" style="width: {progress}%" />
		</div>
	</div>
</section>

<style>
	#progress-bar {
		padding: 0.4rem;
		margin-bottom: 0.5rem;
	}
	#time {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.progress {
		width: 100%;
		height: 15px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#progress-bar-cont {
		position: absolute;
		top: 0;
		width: 98%;
		height: 10px;
		margin: 0.5rem 0 0.5rem;
		display: flex;
		align-items: center;
		border: 1px solid #888;
		cursor: pointer;
	}

	#bar {
		width: 0%;
		height: 10px;
		background-color: #e1e0e0;
	}
	.seek_cont {
		position: absolute;
		top: 0;
		width: 100%;
		margin: 0.4rem 0 0.5rem;

		z-index: 4;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Modify the appearance of the slider */
	.seek_slider,
	.volume_slider {
		padding: 0.4em 0.1em;
		border: none;
		z-index: 5;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 5px;
		width: 100%;
		background: transparent;
		opacity: 1;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	/* Modify the appearance of the slider thumb */
	.seek_slider::-webkit-slider-thumb,
	.volume_slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 15px;
		height: 15px;
		opacity: 1;
		background: white;
		cursor: pointer;
		border-radius: 50%;
	}

	/* Change the opacity when mouse is hovered */
	.seek_slider:hover,
	.volume_slider:hover {
		/* opacity: 0.7; */
		filter: brightness(1.2);
	}
</style>
