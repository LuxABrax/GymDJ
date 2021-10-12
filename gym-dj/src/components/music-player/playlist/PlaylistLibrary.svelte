<script>
	import PlayList from "./PlayList.svelte";
	import {
		playStore,
		setActiveInMobile,
		setPlaylists,
	} from "../../../stores/musicStore";
	import Fa from "svelte-fa";
	import {
		faMusic,
		faRecordVinyl,
		faPlayCircle,
	} from "@fortawesome/free-solid-svg-icons";
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
		min-width: 25vw;
		height: 85vh;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		box-shadow: 0 0 5px #222;
		border-radius: 0 0 5px 5px;
		background: #333;
		margin: 0.5rem 0.4rem;

		position: relative;
		.music-header {
			width: 100%;
			background: #f3f2f2;
			flex: 0.2;
			display: flex;
			align-items: center;
			justify-content: center;
			.title {
				display: flex;
				h2 {
					margin-left: 4px;
				}
			}
		}

		ul {
			flex: 0.8;
			overflow-y: auto;
			width: 100%;
		}
	}
</style>
