<script>
	import { audioStore, getPlaylistFromAudioStore, loadQueueFromPlaylist } from "../../stores/musicStore";
	import Fa from "svelte-fa";
	import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
	export let listIndex;
	export let playlist;
	// const {name, list} = playlist;
	// export let listType = "all";
	let listIsShowing = false;
	const listData = getPlaylistFromAudioStore(playlist.list);
	const showPlayList = () => (listIsShowing = !listIsShowing);
</script>

<li class="playlist-cont">
	<button class="accordion" class:active={listIsShowing} on:click={showPlayList}>&#9776;{` ${playlist.name}`}</button>
	<button
		class="play"
		on:click={() => {
			console.log("play: ", playlist.name);
			loadQueueFromPlaylist(listIndex);
		}}
	>
		<Fa icon={faRecordVinyl} size="lg" color="white" />
	</button>
	<ul class:show-list={listIsShowing}>
		{#if listData.length > 0}
			{#each listData as { name, index }, lindex}
				<li class="playlist-song" data-track-id={index}>
					{name}
				</li>
			{/each}
		{/if}
	</ul>
</li>

<style lang="scss">
	li.playlist-cont {
		// width: 298px;
		width: 100%;
		box-shadow: 0 0 5px #222;
		border-radius: 0 0 5px 5px;
		background: #333;
		margin: 0.5rem auto;
		position: relative;
	}

	/* Style the buttons that are used to open and close the accordion panel */
	button.accordion {
		background: #222;
		color: #bbb;
		margin: 0;
		padding: 5px 15px;
		width: 100%;
		/* 		text-align: left; */
		border: none;
		outline: none;
		cursor: pointer;
		transition: 0.4s;
	}

	/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
	button.active {
		background-color: #888;
		color: black;
	}
	button.play {
		// height: 20px;
		background-color: #bbb;
		position: absolute;
		top: 0;
		right: 0;
	}

	ul {
		min-width: 330px;
		list-style-type: none;
		background: #222;
		color: #ddd;
		margin: 0;
		padding: 0;
		border-radius: 0 0 5px 5px;
		height: 0;
		overflow: auto;
		transition: height 0.3s;
	}

	li.playlist-song {
		line-height: 150%;
		padding: 5px 5px 5px 20px;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
	}

	li:active,
	li:hover {
		background-color: #444;
	}

	.show-list {
		height: 150px;
	}
</style>
