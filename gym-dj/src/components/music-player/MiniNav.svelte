<script>
	import { setActiveInMobile } from "../../stores/musicStore";
	import Fa from "svelte-fa";
	import {
		faMusic,
		faHistory,
		faPlayCircle,
		faRecordVinyl,
	} from "@fortawesome/free-solid-svg-icons";
</script>

<section id="phoneNav">
	<button
		on:click={() => {
			setActiveInMobile("library");
		}}
	>
		<Fa icon={faMusic} size="lg" color="rgb(255, 238, 0)" />
	</button>
	<button
		on:click={() => {
			setActiveInMobile("playlist");
		}}
	>
		<Fa icon={faRecordVinyl} size="lg" color="rgb(255, 238, 0)" />
	</button>
	<button
		on:click={() => {
			setActiveInMobile("player");
		}}
	>
		<Fa icon={faPlayCircle} size="lg" color="rgb(255, 238, 0)" />
	</button>
	<button
		on:click={() => {
			setActiveInMobile("history");
		}}
	>
		<Fa icon={faHistory} size="lg" color="rgb(255, 238, 0)" />
	</button>
</section>

<style lang="scss">
	@import "../../scss/include-media";
	@include media(">=tablet") {
		#phoneNav {
			display: none;
			height: 0;
			width: 0;
		}
	}
	@include media("<tablet") {
		#phoneNav {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 8vh;
			background-color: #0c0e0c;
			padding: 0rem;

			button {
				margin: auto;
				border-radius: 50%;
				background-color: transparent;
				border: none;
				transform: scale(1.2);
				transition: ease-in-out 0.3s;
				&:focus {
					transform: scale(1.7);
				}
			}
		}
	}
</style>
