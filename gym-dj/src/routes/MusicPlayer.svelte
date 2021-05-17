<script>
	import { audioData } from "../components/music-player/audioData.js";

	import DevButtons from "../components/music-player/DevButtons.svelte";

	import Player from "../components/music-player/Player.svelte";
	import MusicLibrary from "../components/music-player/MusicLibrary.svelte";
	import HistoryLibrary from "../components/music-player/HistoryLibrary.svelte";
	import PlaylistLibrary from "../components/music-player/PlaylistLibrary.svelte";

	import MiniNav from "../components/music-player/MiniNav.svelte";

	import { mobileStore, handleNewTrack } from "../stores/musicStore";

	// Get Audio track
	let trackIndex = 1;
	let randomMode = true;

	// Playlist
	const handleTrack = e => {
		if (e.target === null) {
			trackIndex = Number(e.detail.id);
		} else {
			trackIndex = Number(e.target.dataset.trackId);
		}
		handleNewTrack(trackIndex);
	};
</script>

<div class="music-player">
	<DevButtons {randomMode} />
	<section id="playlist-cont" class={$mobileStore.active === "playlist" ? "active" : ""}>
		<PlaylistLibrary />
	</section>
	<sectio id="library-cont" class={$mobileStore.active === "library" ? "active" : ""}>
		<MusicLibrary {trackIndex} {audioData} on:handle={handleTrack} />
	</sectio>
	<section id="player-cont" class={$mobileStore.active === "player" ? "active" : ""}>
		<Player />
	</section>
	<section id="history-cont" class={$mobileStore.active === "history" ? "active" : ""}>
		<HistoryLibrary on:handle={handleTrack} />
	</section>
	<MiniNav />
</div>

<style lang="scss">
	@import "../scss/include-media";
	@include media("<tablet") {
		#library-cont,
		#history-cont,
		#playlist-cont {
			display: none;
			height: 0;
			width: 0;
			&.active {
				display: block;
				height: 82vh;
				width: 100%;
				transition: 2s ease-in-out;
			}
		}
		#player-cont {
			display: none;
			height: 0;
			width: 0;
			&.active {
				display: flex;
				flex-direction: column-reverse;
				height: 80vh;
				width: 100%;
			}
		}
		.active {
			display: flex;
			flex-direction: column-reverse;
			height: 80vh;
			width: 100%;
		}
		.music-player {
			max-height: 82vh;
			// max-height: 82vh;
			padding: 0 0.2rem;
			margin-bottom: 0.4rem;
		}
	}

	.music-player {
		width: 100%;
		height: 88vh;
		padding: 0.2rem;
		// flex-direction: column;
		// align-items: space-around;
		// justify-content: space-around;
	}
	#player-cont {
		padding: 0.7rem 1.5rem 0;
		box-shadow: 0 0 5px black;
		background: #222;
		color: #bbb;
		border-radius: 5px 5px 0 0;
	}
	@include media(">tablet") {
		.music-player {
			// height: 85%;
			max-height: 90vh;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-around;
			// padding: 20px 0 0 0;
			background-color: rgb(242, 242, 242);
		}

		#player-cont {
			width: 100%;
			height: 88vh;
			// margin-top: 1.5rem;
			// height: 100%;
			padding: 0.25rem;
		}

		#library-cont,
		#playlist-cont {
			display: none;
			height: 0;
			width: 0;
			&.active {
				display: block;
				height: 82vh;
				width: 40%;
				transition: 2s ease-in-out;
			}
		}
	}
</style>
