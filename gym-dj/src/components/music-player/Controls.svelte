<script>
	import { createEventDispatcher } from "svelte";
	import Fa from "svelte-fa";
	import { faPlay, faBackward, faForward, faPause, faPauseCircle, faStepForward, faFastForward, faFastBackward, faStepBackward } from "@fortawesome/free-solid-svg-icons";

	let dispatch = createEventDispatcher();

	export let isPlaying;
</script>

<div id="btn-cont">
	<!-- <Fa icon={faPauseCircle} />
	<Fa icon={faStepBackward} />
	<Fa icon={faFastBackward} />
	<Fa icon={faStepForward} /> -->
	<button id="prev" on:click={() => dispatch("prev")}>
		<Fa icon={faStepBackward} />
	</button>
	<div class="mid rewind">
		<button id="rewind6" on:click={() => dispatch("rewind", { multiplier: 6 })}>
			<Fa icon={faBackward} />
		</button>
		<button id="rewind3" on:click={() => dispatch("rewind", { multiplier: 3 })}>
			<Fa icon={faBackward} />
		</button>
		<button id="rewind" on:click={() => dispatch("rewind", { multiplier: 1 })}>
			<Fa icon={faBackward} />
		</button>
	</div>
	<button id="play" on:click={() => dispatch("playPause")}>
		{#if isPlaying}
			<Fa icon={faPause} />
		{:else}
			<Fa icon={faPlay} />
		{/if}
	</button>
	<div class="mid foward">
		<button id="forward" on:click={() => dispatch("forward", { multiplier: 1 })}>
			<Fa icon={faForward} />
		</button>
		<button id="forward3" on:click={() => dispatch("forward", { multiplier: 3 })}>
			<Fa icon={faForward} />
		</button>
		<button id="forward6" on:click={() => dispatch("forward", { multiplier: 6 })}>
			<Fa icon={faForward} />
		</button>
	</div>
	<!-- <button id="forward" on:click={() => dispatch("forward", { multiplier: 6 })}>
		<Fa icon={faFastForward} />
	</button> -->
	<button id="next" on:click={() => dispatch("next")}>
		<Fa icon={faStepForward} />
	</button>
</div>

<style lang="scss">
	#btn-cont {
		display: flex;
		justify-content: space-around;
	}

	button {
		color: white;

		width: 37px;
		border: none;
		font-size: 2.3rem;
		padding: 0;
		cursor: pointer;
		// margin: 0;
		background-color: transparent;
	}
	.foward,
	.rewind {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		button {
			margin: auto 0.1rem;
		}
	}
	#rewind3,
	#forward3 {
		transform: scale(0.8);
	}

	#rewind,
	#forward {
		transform: scale(0.6);
	}

	button:active {
		font-size: 2.2rem;
		background-color: transparent;
	}

	button img {
		width: 100%;
	}
</style>
