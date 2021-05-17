<script>
	let loggedIn = true;
	import { push } from "svelte-spa-router";
</script>

<nav>
	<ul>
		<li><button on:click={() => push("/")}> Naslovna </button></li>
		<li>
			<button on:click={() => push("/musicplayer")}> Music Player </button>
		</li>
		<li><button on:click={() => push("/profile/1")}> Profil </button></li>
		<li>
			<button on:click={() => push("/login")} class={`logBtn ${loggedIn ? "lIn" : "lOut"}`}>
				{`${loggedIn ? "Log Out" : "Log In"}`}
			</button>
		</li>
	</ul>
</nav>

<style lang="scss">
	@import "../scss/include-media";
	nav {
		width: 100%;
		height: 10vh;
		background-color: #9dc5c3;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
		box-shadow: 1px 1px 20px 9dc5c3;
		background-color: #0c0e0cde;
		// background-image: linear-gradient(180deg, #8ed8d6 0%, #38bab7 64%);
		// background-image: linear-gradient(180deg, #f34551 0%, #d8323c 64%);
		ul {
			width: 80%;
			height: 100%;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
			li {
				height: 100%;
			}
			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
				padding: 0.4rem 0.8rem;
				margin: auto;
				// width: 15%;
				height: 100%;
				// color: white;
				color: rgb(255, 238, 0);
				font-size: 1.1rem;
				font-weight: bold;
				transition: ease-in-out 0.2s;
				&:hover {
					transform: scale(1.2);
					filter: brightness(1.2);
				}
			}
		}
	}
	@include media("<tablet") {
		nav {
			height: 10vh;
			margin-bottom: 0;
			ul {
				width: 90%;
				button {
					padding: 0.2rem 0.2rem;
					// font-size: 1rem;
				}
			}
		}
	}
</style>
