<script>
	import Fa from "svelte-fa";
	import {
		faRecordVinyl,
		faChevronLeft,
		faChevronRight,
		faTimes,
		faArrowsAlt,
	} from "@fortawesome/free-solid-svg-icons";
	import {
		isInHistory,
		musicQueue,
		addToQueue,
		removeFromQueue,
		changePositionInQ,
		moveInQ,
		moveStore,
		loadQueueFromArr,
		saveQueueAsPlaylist,
		loadQueueFromPlaylist,
		removeQueue,
		audioStore,
		filteredAudioStore,
		findIndexInFilteredAudioWithTrackIndex,
		getQueLen,
	} from "../../../stores/musicStore";

	let buttonsOn = [];
	let btnState = true;
	$: for (let i = 0; i < getQueLen(); i++) {
		buttonsOn[i] = false;
	}
	const turnAllButtonsOn = onOff => {
		if (onOff) {
			buttonsOn.forEach(value => {
				value = true;
				return value;
			});
		} else {
			buttonsOn.forEach(value => {
				value = false;
				return value;
			});
		}
	};
</script>

{#if $musicQueue.length > 0}
	<div class="queue-header">
		<button
			class=""
			on:click={() => {
				removeQueue();
			}}
		>
			<Fa icon={faTimes} size="lg" color="red" />
		</button>
		<button
			class=""
			on:click={() => {
				if (btnState) {
					turnAllButtonsOn(false);
				} else {
					turnAllButtonsOn(true);
				}
			}}
		>
			<Fa icon={faArrowsAlt} size="lg" color="green" />
		</button>
		<button
			class=""
			on:click={() => {
				saveQueueAsPlaylist();
			}}
		>
			<Fa icon={faRecordVinyl} size="lg" color="yellow" />
		</button>
	</div>
	<ul class="queueM">
		{#each $musicQueue as i, index}
			<li
				on:mouseover={() => {
					buttonsOn[index] = true;
				}}
				on:mouseleave={() => {
					buttonsOn[index] = false;
				}}
			>
				<h4
					on:click={() => {
						console.log("buttom active");
						// buttonsOn[0] == false ? turnAllButtonsOn(true) : turnAllButtonsOn(false);
						console.log("butt", buttonsOn);
						moveInQ(i, index);
						console.log("moved: ", index);
					}}
					class={`${
						$moveStore.moveActive
							? $moveStore.moveIndex1 === index
								? "moveFrom"
								: "moveTo"
							: ""
					}`}
				>
					{$audioStore[i].name}
				</h4>
				{#if buttonsOn[index]}
					<div class="qBtns">
						{#if index != 0}
							<button
								class="qPos qL"
								on:click={() => {
									changePositionInQ(index, false);
								}}
							>
								<Fa icon={faChevronLeft} size="sm" color="white" />
								<Fa icon={faChevronRight} size="sm" color="white" />
							</button>
						{/if}

						<button
							class="qRem"
							on:click={() => {
								removeFromQueue(index);
							}}
						>
							<Fa icon={faTimes} size="lg" color="red" />
						</button>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	@import "../../../scss/include-media";
	.queue-header {
		max-height: 8vh;
		button {
			padding: 0;
			margin: 0;
		}
	}
	.qBtns {
		pointer-events: none;
	}
	.queueM {
		margin: 0.2rem;
		padding: 0.8rem;

		max-height: 50vh;
		overflow: auto;
		display: flex;
		flex-flow: row wrap;

		li {
			flex: 0.2;
			min-width: 20%;
			min-height: 60px;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: start;
			h4 {
				padding: 0.4rem;
				padding-right: 0;
				margin: 0 auto;
				margin-top: 0.2rem;
				text-align: center;
				cursor: pointer;
				&.moveFrom {
					color: yellow;
				}
				&.moveTo {
					color: lightgreen;
					&:hover {
						color: limegreen;
					}
				}
				&:hover {
					color: yellow;
				}
			}
			button {
				border-radius: 50%;
				opacity: 0.7;
				margin: 0;
				padding: 0.2rem;
				// height: 28px;
				width: auto;
				border: none;
				&:hover {
					cursor: pointer;
					opacity: 1;
					filter: brightness(1.2);
					// box-shadow: 1px 1px 2px 30px red;
				}
				&:active {
					opacity: 1;
				}
			}
		}
	}

	@include media("<tablet") {
		.queueM {
			flex-flow: column-reverse;
			padding: 0.2rem;
			li {
				width: 100%;
				min-height: 1.8rem;
				// flex: 0.3;
				margin: 0 auto;
				padding: 0;
				h4 {
					padding: 0;
					margin: 0.2rem auto;
				}
			}
			margin-bottom: 0.4rem;
			max-height: 42vh;
		}
	}
	.qBtns {
		position: absolute;
		top: 0;
		z-index: 3;
		height: 32px;
		width: 100%;
	}
	.qRem {
		pointer-events: all;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-10px) translateY(-0.8rem);
		&:hover {
			transform: translateX(-10px) translateY(-0.8rem) scale(1.4);
		}
		background-color: transparent;
	}
	.qPos {
		pointer-events: all;

		height: 100%;
		&:hover {
			transform: scale(1.5);
		}
		position: absolute;
		&.qL {
			top: 0;
			left: -0.4rem;
			padding: 0.2rem;
			background-color: transparent;
		}
		&.qL2 {
			top: -0.8rem;
			left: 1.4rem;
			padding: 0.2rem;
			background-color: transparent;
		}
	}
	@include media(">tablet", "<1240px") {
		.queueM {
			li {
				// flex: 0.3;
				min-width: 33%;
			}
		}
	}
</style>
