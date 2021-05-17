<script>
	import { audioData } from "./audioData.js";

	import TrackHeading from "./TrackHeading.svelte";
	import ProgressBarTime from "./ProgressBarTime.svelte";
	import Controls from "./Controls.svelte";
	import VolumeSlider from "./VolumeSlider.svelte";
	import MusicQueue from "./MusicQueue.svelte";
	import {
		addToHistory,
		addFinishedToHistory,
		isInHistory,
		musicQueue,
		removeFromQueue,
		updateHistoryTimes,
		setAudioStore,
		audioStore,
		filteredAudioStore,
		findIndexInFilteredAudioWithTrackIndex,
		getQueLen,
		mobileStore,
		loadPlaylistsFromArr,
	} from "../../stores/musicStore";
	import { volumeStore } from "../../stores/volumeStore";

	import { onDestroy } from "svelte";
	import { getNewTrackIndex, handleCurrentTrack, handleTrackStore } from "../../stores/musicStore";

	// Get Audio track
	let trackIndex = 1;
	let randomMode = true;
	let audioFile = new Audio(audioData[trackIndex].url);
	let trackTitle = audioData[trackIndex].name;
	setAudioStore(audioData);
	loadPlaylistsFromArr();
	let songsPlayed = 0;

	const loadTrack = () => {
		console.log("Audio file:\n");
		console.log(audioFile);

		let now = new Date();
		if (songsPlayed > 0) {
			addFinishedToHistory(now);
			updateHistoryTimes();
		}

		// console.log("in history: ", isInHistory(trackIndex));
		audioFile = new Audio(audioData[trackIndex].url);
		audioFile.onloadedmetadata = () => {
			totalTrackTime = audioFile.duration;
			updateTime();
		};
		// console.log(audioFile);
		// console.log(audioData[trackIndex].url);
		songsPlayed++;
		trackTitle = audioData[trackIndex].name;
		let artist = audioData[trackIndex].artist;
		let audioUrl = audioData[trackIndex].url;

		now = new Date();
		addToHistory({
			index: trackIndex,
			name: trackTitle,
			duration: totalTrackTime,
			started: now,
			finished: "",
			passedTime: "",
			artist: artist,
			url: audioUrl,
		});
		adjustVol();
	};

	const autoPlayNextTrack = () => {
		if ($musicQueue.length > 0) {
			trackIndex = $musicQueue[0];
			removeFromQueue();
		} else {
			trackIndex <= audioData.length - 1 ? (trackIndex += 1) : (trackIndex = 0);
			if (randomMode) trackIndex = Math.floor(Math.random() * (audioData.length - 1));
		}
		loadTrack();
		audioFile.play();
		isPlaying = true;
		toggleTimeRunning();
	};

	// Track Duration and Progress Bar
	let totalTrackTime;
	$: console.log(totalTrackTime);
	audioFile.onloadedmetadata = () => {
		totalTrackTime = audioFile.duration;
		updateTime();
	};

	let totalTimeDisplay = "loading...";
	let currTimeDisplay = "0:00:00";
	let progress = 0;
	let trackTimer;
	function updateTime() {
		progress = audioFile.currentTime * (100 / totalTrackTime);

		let currHrs = Math.floor(audioFile.currentTime / 60 / 60);
		let currMins = Math.floor(audioFile.currentTime / 60);
		let currSecs = Math.floor(audioFile.currentTime - currMins * 60);

		let durHrs = Math.floor(totalTrackTime / 60 / 60);
		let durMins = Math.floor((totalTrackTime / 60) % 60);
		let durSecs = Math.floor(totalTrackTime - durHrs * 60 * 60 - durMins * 60);

		if (currSecs < 10) currSecs = `0${currSecs}`;
		if (durSecs < 10) durSecs = `0${durSecs}`;
		if (currMins < 10) currMins = `0${currMins}`;
		if (durMins < 10) durMins = `0${durMins}`;

		currTimeDisplay = `${currHrs}:${currMins}:${currSecs}`;
		totalTimeDisplay = `${durHrs}:${durMins}:${durSecs}`;

		if (audioFile.ended) {
			let now = new Date();
			console.log(now);
			// console.log("min ", now.minute, " sec ", now.second);
			// console.log(now);
			toggleTimeRunning();
		}
	}

	const toggleTimeRunning = () => {
		if (audioFile.ended) {
			isPlaying = false;
			clearInterval(trackTimer);
			console.log(`Ended = ${audioFile.ended}`);
			autoPlayNextTrack();
		} else {
			trackTimer = setInterval(updateTime, 100);
		}
	};

	$: if (songsPlayed > 2) {
		let test = setInterval(updateHistoryTimes, 60000);
	}
	// Controls
	let isPlaying = false;
	$: console.log(`isPlaying = ${isPlaying}`);

	const playPauseAudio = () => {
		if (audioFile.paused) {
			toggleTimeRunning();
			audioFile.play();
			isPlaying = true;
		} else {
			toggleTimeRunning();
			audioFile.pause();
			isPlaying = false;
		}
	};

	const prevOrNextAudio = prevTrue => {
		isPlaying = false;
		audioFile.pause();
		let indexInStore = findIndexInFilteredAudioWithTrackIndex(trackIndex);
		let newIndex;

		if ($musicQueue.length > 0) {
			newIndex = $musicQueue[0];
			removeFromQueue();
		} else {
			if (prevTrue) {
				newIndex = $filteredAudioStore[indexInStore - 1].index;
			} else {
				newIndex = $filteredAudioStore[indexInStore + 1].index;
			}
		}
		trackIndex = newIndex;
		loadTrack();
		playPauseAudio();
	};

	const rewindAudio = e => (audioFile.currentTime -= 10 * e.detail.multiplier);
	const forwardAudio = e => (audioFile.currentTime += 10 * e.detail.multiplier);

	const seekTo = e => {
		let seek = (e.detail.progress / 100) * totalTrackTime;
		audioFile.currentTime = seek;
		updateTime();
	};

	// Volume Slider
	const adjustVol = () => (audioFile.volume = $volumeStore / 100);

	// Playlist
	const handleTrack = () => {
		if (!isPlaying) {
			trackIndex = getNewTrackIndex();

			loadTrack();
			playPauseAudio();
			handleCurrentTrack();
		} else {
			isPlaying = false;
			audioFile.pause();
			trackIndex = getNewTrackIndex();

			loadTrack();
			playPauseAudio();
			handleCurrentTrack();
		}
	};
	$: if ($handleTrackStore.handleActive) {
		handleTrack();
	}
	onDestroy(() => {
		isPlaying = false;
		audioFile.pause();
	});
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

<style lang="scss">
	@import "../../scss/include-media";
	@include media("<=tablet") {
		.now-playing {
			max-height: 40vh;
			padding-bottom: 2rem;
		}
	}
	@include media(">tablet") {
		.now-playing {
			max-height: 40vh;
		}
	}
</style>
