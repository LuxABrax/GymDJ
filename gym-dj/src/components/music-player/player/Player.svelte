<script>
	import TrackHeading from "./TrackHeading.svelte";
	import ProgressBarTime from "./ProgressBarTime.svelte";
	import Controls from "./Controls.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";
	import MusicQueue from "./MusicQueue.svelte";
</script>

<div class="player">
	<div class="now-playing">
		<TrackHeading {trackTitle} />

		<ProgressBarTime on:seek={seekTo} {currTimeDisplay} {totalTimeDisplay} {progress} />

		<Controls
			{isPlaying}
			on:prev={() => {
				prevOrNextAudio(true);
			}}
			on:rewind={rewindAudio}
			on:playPause={playPauseAudio}
			on:forward={forwardAudio}
			on:next={() => {
				prevOrNextAudio(false);
			}}
		/>

		<VolumeSlider on:volCh={adjustVol} />
	</div>
	<MusicQueue />
</div>
