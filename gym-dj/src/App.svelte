<script>
	import Router from "svelte-spa-router";
	import NavBar from "./components/NavBar.svelte";

	import MusicPlayer from "./routes/MusicPlayer.svelte";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
	import Profile from "./routes/Profile.svelte";
	import NotFound from "./routes/NotFound.svelte";

	const routes = {
		"/": Home,
		"/musicplayer": MusicPlayer,
		"/login": Login,
		"/profile/:id": Profile,
		"*": NotFound,
	};
</script>

<main>
	<NavBar />
	<Router {routes} />
</main>

<style lang="scss" global>
	// @import "./scss/global.scss";

	main {
		height: 100%;
		width: 100%;
		// padding: 0.4rem;
		// max-width: 240px;
		margin: 0 auto;
	}

	// h1 {
	// 	color: #ff3e00;
	// 	text-transform: uppercase;
	// 	font-size: 4em;
	// 	font-weight: 100;
	// }

	// @media (min-width: 640px) {
	// 	main {
	// 		// max-width: none;
	// 	}
	// }
</style>
