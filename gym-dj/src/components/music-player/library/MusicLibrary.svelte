<script>
	import Fa from "svelte-fa";

	import {
		faHeart,
		faPlay,
		faCompactDisc,
		faMusic,
		faRecordVinyl,
		faPlayCircle,
	} from "@fortawesome/free-solid-svg-icons";
	import {
		audioStore,
		filteredAudioStore,
		setFilteredAudioStore,
		mobileStore,
		setActiveInMobile,
		musicQueue,
		addToQueue,
	} from "../../../stores/musicStore";
	import {
		heartStore,
		findInHeartStore,
		removeFromHeartStore,
		addToHeartStore,
		addToHeartStoreFromArr,
		returnHeartedData,
	} from "../../../stores/heartStore";

	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	export let trackIndex;

	let showHearted = false;
	let searchTerm = "";
	let filteredList = [];

	addToHeartStoreFromArr();
	const updateHearted = () => {};

	const findSearchTerm = item => {
		let inName =
			item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
		let inArtist =
			item.artist.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
		if (inName || inArtist) return item;
	};
	$: {
		if (showHearted) {
			let hearted = returnHeartedData($audioStore);
			filteredList = hearted.filter(item => findSearchTerm(item));
		} else {
			filteredList = $audioStore.filter(
				item =>
					item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
					item.artist.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
			);
		}
		setFilteredAudioStore(filteredList);
	}
</script>

<div
	id="music-library"
	class={$mobileStore.active === "library" ? "active" : ""}
>
	<div class="musicList">
		<div class="music-header">
			<div class="title">
				<button
					on:click={() => {
						setActiveInMobile("playlist");
					}}
				>
					<Fa icon={faMusic} size="lg" />
				</button>
				<h2>Music Library</h2>
			</div>
			<div class="search">
				<button
					on:click={() => {
						showHearted = !showHearted;
					}}
				>
					<Fa icon={faHeart} />
				</button>
				<input
					type="text"
					name="searchIn"
					bind:value={searchTerm}
					placeholder=" Search..."
				/>
			</div>
		</div>
		<ul>
			{#each $filteredAudioStore as { name, artist, url, index }, i}
				<li>
					<div class="track-cont">
						<h3
							data-track-id={index}
							on:click={() => {
								dispatch("handle", { id: index });
							}}
							class={index == trackIndex ? "selected" : ""}
						>
							{`${name}`}
						</h3>
						<p>
							{artist}
						</p>
						<div class="btns">
							{#if $heartStore.length > 0}
								{#if $heartStore.find(val => val === index)}
									<button
										on:click={() => {
											removeFromHeartStore(index);
											showHearted = !showHearted;
											showHearted = !showHearted;
										}}
									>
										<Fa icon={faHeart} color="red" size="lg" />
									</button>
								{:else}
									<button on:click={() => addToHeartStore(index)}>
										<Fa icon={faHeart} color="white" size="lg" />
									</button>
								{/if}
							{:else}
								<button on:click={() => addToHeartStore(index)}>
									<Fa icon={faHeart} color="white" size="lg" />
								</button>
							{/if}

							<button on:click={() => addToQueue(index)}>
								<Fa icon={faCompactDisc} color="white" size="lg" />
							</button>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	@import "../../../scss/include-media";
	#music-library {
		height: 100%;
		padding: 0.2rem 0.4rem;
	}
	.musicList {
		min-width: 25vw;
		max-height: 85vh;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		box-shadow: 0 0 5px #222;
		border-radius: 0 0 5px 5px;
		background: #333;
		margin: 0.5rem auto;
		.music-header {
			width: 100%;
			background: rgb(243, 242, 242);
			flex: 0.2;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.search,
		.title {
			padding: 0 0.4rem;
			padding-top: 0.8rem;
			display: flex;
			flex-direction: row;
			justify-content: stretch;
			margin: 0.1rem auto;
		}
		ul {
			flex: 0.8;
			width: 96%;

			background: #222;
			color: #ddd;
			border-radius: 0 0 5px 5px;
			overflow-y: auto;
			li {
				line-height: 150%;
				padding: 5px 5px 5px 20px;
				border-bottom: 1px solid #ddd;
				.selected {
					color: yellow;
				}
				.track-cont {
					width: 100%;
					height: 100%;
					position: relative;
					h3 {
						padding: 0.2rem;
						cursor: pointer;
						&:hover {
							// transition: ease-in-out 0.2s;
							color: greenyellow;
							text-shadow: 1px 1px 10px rgb(150, 150, 150);
						}
					}
				}
				.btns {
					position: absolute;
					right: 0;
					top: 0;
					button {
						padding: 0.2rem;
						border: 0;
						cursor: pointer;
						background-color: transparent;
						border-radius: 50%;
						&:hover {
							transform: scale(1.2);
						}
					}
				}
			}
		}
	}
	@include media("<desktop", ">tablet") {
		.musicList {
			min-width: 25vw;
			width: 25vw;
		}
	}
	@include media("<=tablet") {
		#music-library {
			padding: 0;
		}
		.musicList {
			max-height: 80vh;
		}
	}
</style>
