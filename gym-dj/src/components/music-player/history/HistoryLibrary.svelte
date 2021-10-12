<script>
	import { createEventDispatcher } from "svelte";
	import Fa from "svelte-fa";
	import { faHistory } from "@fortawesome/free-solid-svg-icons";

	import {
		musicHistory,
		loadQueueFromHistory,
		mobileStore,
	} from "../../../stores/musicStore";

	const dispatch = createEventDispatcher();

	const getFinTime = time => {
		if (time === "") return "";
		let timeDate = new Date(time);
		let hours = timeDate.getHours();
		let mins = timeDate.getMinutes();
		let secs = timeDate.getSeconds();
		return `${(hours < 10 ? "0" : "") + hours}:${
			(mins < 10 ? "0" : "") + mins
		}:${(secs < 10 ? "0" : "") + secs}`;
	};
</script>

<div
	id="history-library"
	class={$mobileStore.active === "history" ? "active" : ""}
>
	<div class="historyList">
		<div class="history-header">
			<button
				on:click={() => {
					loadQueueFromHistory();
				}}
			>
				<Fa icon={faHistory} />
			</button>

			<h2>History</h2>
		</div>
		{#if $musicHistory.length > 0}
			<ul>
				{#each $musicHistory as track}
					<li>
						<h4
							on:click={() => {
								dispatch("handle", { id: track.index });
							}}
						>
							{track.name}
						</h4>
						<div class="time-cont">
							<p class="passed">{track.passedTime}</p>
							<p class="fin">
								{getFinTime(track.finished)}
							</p>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../../../scss/include-media";
	@include media("<=tablet") {
		.historyList {
			max-height: 80vh;
		}
	}
	#history-library {
		height: 100%;
		padding: 0.2rem 0.4rem;
	}
	.historyList {
		// margin: 0.4rem;

		min-width: 25vw;
		height: 85vh;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		box-shadow: 0 0 5px #222;
		border-radius: 0 0 5px 5px;
		background: #333;
		margin: 0.5rem auto;
		position: relative;
		.history-header {
			width: 100%;
			background: rgb(243, 242, 242);
			flex: 0.2;
			display: flex;
			align-items: center;
			justify-content: center;
			h2 {
				margin-top: -0.5em;
				margin-left: 4px;
			}
		}
		ul {
			flex: 0.8;
			width: 96%;
			overflow-y: auto;
			padding: 0.3rem;
			background: #222;
			color: #ddd;
			border-radius: 0 0 5px 5px;
		}
		li {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0.3rem;
			margin: 0 auto;
			padding: 5px 5px 5px 20px;
			border-bottom: 1px solid #ddd;

			text-align: center;
		}
		h4 {
			flex: 0.75;
			text-align: center;
			padding-left: 1rem;
			font-size: 1.2rem;
			cursor: pointer;
		}
		.time-cont {
			flex: 0.25;
			display: flex;
			flex-direction: column;
			width: 25%;
			.passed {
				font-size: 1.1rem;
				font-weight: 700;
			}
			.fin {
				font-size: 0.9rem;
			}
		}
	}
	@include media("<desktop", ">tablet") {
		.historyList {
			min-width: 25vw;
			width: 25vw;
			max-height: 85vh;
		}
	}
</style>
