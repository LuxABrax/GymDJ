<script>
	import PlayList from "./PlayList.svelte";
	import { playStore, setActiveInMobile, setPlaylists } from "../../stores/musicStore";
	import Fa from "svelte-fa";
	import { faMusic, faRecordVinyl, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
	import { onMount } from "svelte";

	onMount(() => {
		setPlaylists();
	});
</script>

<div class="playlist-library">
	<div class="music-header">
		<div class="title">
			<button
				on:click={() => {
					setActiveInMobile("library");
				}}
			>
				<Fa icon={faMusic} size="lg" />
			</button>
			<h2>Music Library</h2>
		</div>
	</div>

	<ul>
		{#if $playStore.length > 0}
			{#each $playStore as playlist, listIndex}
				<PlayList {playlist} {listIndex} />
			{/each}
		{/if}
	</ul>
</div>

<style lang="scss">
	.playlist-library {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		ul {
			max-height: 70vh;
			overflow-y: auto;
		}
	}
</style>
