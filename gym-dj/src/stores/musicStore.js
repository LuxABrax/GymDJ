import { writable, get } from "svelte/store";
export const mobileStore = writable({
	active: "library",
});
export const audioStore = writable([]);
export const filteredAudioStore = writable([]);
export const playStore = writable([]);

export const musicDurations = writable([]);
export const musicHistory = writable([]);
export const musicQueue = writable([]);
export const moveStore = writable({
	moveActive: false,
	moveIndex1: 0,
	song: 0,
	moveIndex2: 1,
});
export const handleTrackStore = writable({
	handleActive: false,
	currentTrackIndex: 0,
	newTrackIndex: 0,
});
export const handleNewTrack = trackIndex => {
	handleTrackStore.update(handleObj => {
		handleObj.newTrackIndex = trackIndex;
		handleObj.handleActive = true;
		return { ...handleObj };
	});
};
export const getNewTrackIndex = () => {
	return get(handleTrackStore).newTrackIndex;
};

export const handleCurrentTrack = () => {
	handleTrackStore.update(handleObj => {
		handleObj.currentTrackIndex = handleObj.newTrackIndex;
		handleObj.handleActive = false;
		return { ...handleObj };
	});
};

export const setActiveInMobile = active => {
	mobileStore.update(cur => {
		cur.active = active;
		return { ...cur };
	});
	console.log(active, get(mobileStore));
};

export const setAudioStore = audioData => {
	audioData.forEach((song, index) => {
		song.index = index;
	});
	audioStore.set(audioData);
};

export const checkIfTrackIndexInList = (list, index) => {
	let foundArr = list.filter(el => el === index);
	return foundArr.length > 0;
};
export const getPlaylistFromAudioStore = list => {
	let listData = get(audioStore).filter((el, index) => {
		let found = checkIfTrackIndexInList(list, index);
		if (found) return el;
	});
	console.log("Playlist: ", listData);
	return listData;
};

export const setFilteredAudioStore = list => {
	filteredAudioStore.set(list);
};
export const findIndexInFilteredAudioWithTrackIndex = trackIndex => {
	console.log(get(filteredAudioStore));
	let filteredIndex = 0;
	let el = get(filteredAudioStore).filter((el, index) => {
		if (el.index === trackIndex) {
			console.log(el);
			console.log("ell index ", index);
			filteredIndex = index;
		}
	});
	console.log(el);
	if (el !== null) return filteredIndex;
};

export const addDuration = duration => {
	musicDurations.update(d => [...d, duration]);
	console.log(duration, get(musicDurations));
};

// History
export const isInHistory = trackIndex => {
	let his = get(musicHistory);

	let count = his.filter(el => el.index === trackIndex).length;

	if (his === undefined) return false;
	return count;
};

export const addToHistory = song => {
	// console.log("adding song to history ", song);
	musicHistory.update(his => [...his, song]);
};

export const addFinishedToHistory = time => {
	musicHistory.update(his => {
		let el = his[his.length - 1];
		el.finished = time;
		el.fH = time.getHours();
		el.fM = time.getMinutes();
		el.fS = time.getSeconds();

		console.log("Finished: ", el);
		his.pop();
		return [...his, el];
	});
};

const calcTimeSinceFinished = time => {
	let now = new Date();
	let fin = new Date(time);
	let hNow = now.getHours();
	let hFin = fin.getHours();
	let mNow = now.getMinutes();
	let mFin = fin.getMinutes();

	let h = hNow - hFin;

	if (mNow < mFin) return [h - 1, mNow + 60 - mFin];
	return [h, mNow - mFin];
};

export const updateHistoryTimes = () => {
	musicHistory.update(his => {
		his.forEach(el => {
			if (el.finished === "") return (el.passedTime = "Playing");
			let t = calcTimeSinceFinished(el.finished);
			// let t = [2, 13];
			el.passedTime = `${t[0] > 0 ? t[0] + "h " : ""} ${t[1]}min`;
			return el;
		});
		return [...his];
	});
};

// Queue
const DUMMY_ARR = [1, 4, 8, 9, 7, 13, 14, 15, 16, 17, 28, 19];

export const loadQueueFromArr = (arr = DUMMY_ARR) => {
	musicQueue.update(q => [...q, ...arr]);
};
export const loadQueueFromPlaylist = listIndex => {
	let p = get(playStore);
	console.log("Name: ", p[listIndex].name);
	loadQueueFromArr(p[listIndex].list);
};
export const loadQueueFromHistory = () => {
	let queue = [];
	get(musicHistory).forEach(el => {
		queue.push(el.index);
	});
	loadQueueFromArr(queue);
	// console.log("q", queue);
};

export const addToQueue = (song, pos = -1) => {
	if (pos === -1) {
		musicQueue.update(q => [...q, song]);
	} else {
		musicQueue.update(q => {
			q.splice(pos, 0, song);
			return [...q];
		});
	}
};
export const removeFromQueue = (pos = -1) => {
	musicQueue.update(q => {
		pos == -1 ? q.shift() : q.splice(pos, 1);
		return [...q];
	});
};
export const removeQueue = () => {
	musicQueue.set([]);
};

export const getQueLen = () => {
	let len = get(musicQueue).length;
	return len;
};
export const changePositionInQ = (pos, directionBackward) => {
	musicQueue.update(q => {
		if ((!directionBackward && pos === 0) || (directionBackward && pos === q.length - 1)) return [...q];
		let el = q.splice(pos, 1);
		directionBackward ? q.splice(pos + 1, 0, el) : q.splice(pos - 1, 0, el);
		return [...q];
	});
};
export const moveInQ = (song, index) => {
	moveStore.update(mSt => {
		let m = get(moveStore);

		if (m.moveActive) {
			m.moveIndex2 = index;
			if (m.moveIndex2 > m.moveIndex1) {
				removeFromQueue(m.moveIndex1);
				addToQueue(m.song, index - 1);
			} else {
				removeFromQueue(m.moveIndex1);
				addToQueue(m.song, index);
			}
			m.moveActive = false;
		} else {
			m.moveIndex1 = index;
			m.song = song;
			m.moveActive = true;
		}
		return { ...m };
	});
};

export const saveQueueAsPlaylist = () => {
	let q = get(musicQueue);
	console.log("Queue to playlist: \n", q);
	playStore.update(p => {
		let name = `QueuePlay ${p.length}`;
		return [...p, { name: name, list: q }];
	});
	console.log(get(playStore));
};
const PLAYLISTS = [
	{ name: "Playlist 1", list: [5, 9, 37, 13, 75, 40, 75] },
	{ name: "Playlist 2", list: [5, 9, 12, 75, 99, 37, 13, 75, 40, 75] },
	{ name: "Playlist 3", list: [5, 9, 12, 75, 99, 37, 13, 75, 40, 75] },
	{ name: "Playlist 4", list: [5, 9, 12, 75, 99, 37, 13, 75, 40, 75] },
];
export const setPlaylists = (playlists = PLAYLISTS) => {
	playStore.set(playlists);
};

export const loadPlaylistsFromArr = (arr = PLAYLISTS) => {
	playStore.update(p => {
		return [...p, ...arr];
	});
};
export const addPlaylist = (name, list) => {
	playStore.update(p => {
		return [...p, { name: name, list: list }];
	});
};
