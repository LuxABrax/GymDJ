<script>
	import { addToQueue, loadQueueFromArr, loadQueueFromPlaylist, removeFromQueue, setActiveInMobile } from "../../stores/musicStore";
	export let randomMode;
	let devBtns = false;
	let changePositionValue = 0;
</script>

<button
	class="dev"
	on:click={() => {
		devBtns = !devBtns;
	}}
>
	DevBtns
</button>
<div class={`xtra-buttons ${devBtns ? "active" : ""}`}>
	<button
		class="rng"
		style={randomMode ? "background:green;" : "background:red;"}
		on:click={() => {
			randomMode = !randomMode;
		}}>{`RNG ${randomMode ? "ON" : "OFF"}`}</button
	>
	<button
		on:click={() => {
			removeFromQueue();
		}}>Q</button
	>
	<button
		on:click={() => {
			addToQueue(1, 0);
		}}>A</button
	>
	<button
		on:click={() => {
			loadQueueFromArr();
		}}>Load</button
	>
	<input type="number" bind:value={changePositionValue} />
	<button
		on:click={() => {
			loadQueueFromPlaylist(changePositionValue);
		}}>Load playlist</button
	>
</div>

<style lang="scss">
	.dev {
		position: absolute;
		top: 0;
		right: 0;
		margin: 0.5rem;
		z-index: 4;
	}
	.xtra-buttons {
		display: none;
		&.active {
			display: block;
			position: absolute;
			padding: 0.4rem;
			width: 90%;
			top: 10vh;
			left: 40%;
			z-index: 3;
		}
	}
	.rng {
		// position: absolute;
		// top: 1rem;
		// right: 0;
		color: white;
		font-weight: bold;
		padding: 0.2rem 0.4rem;
	}
</style>
