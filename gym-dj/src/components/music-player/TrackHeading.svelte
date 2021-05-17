<script>
	export let trackTitle;
</script>

<div>
	<h3>{trackTitle}</h3>
</div>

<style lang="scss">
	@import "../../scss/include-media";
	div {
		text-align: center;
	}

	h3 {
		padding-top: 0.5rem;
		font-size: 2rem;
		font-weight: bold;
		margin: 5px 0 10px;
	}
	@include media("<tablet") {
		div {
			max-height: 3rem;
		}
		h3 {
			font-size: 1.5rem;
			padding-top: 0.4rem;
			margin: 0.1rem auto;
		}
	}
</style>
