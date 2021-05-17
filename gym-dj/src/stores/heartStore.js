import { writable, get } from "svelte/store";
export const heartStore = writable([]);

// Heart - Favorites
const myHeartedArr = [5, 8, 9, 13, 37, 75, 83, 94];

export const addToHeartStoreFromArr = (arr = myHeartedArr) => {
	heartStore.update(hs => [...hs, ...arr]);
};

export const addToHeartStore = song => {
	heartStore.update(hs => [...hs, song]);
};
export const removeFromHeartStore = val => {
	heartStore.update(q => {
		q.forEach((hrt, index) => {
			if (hrt === val) q.splice(index, 1);
		});
		return [...q];
	});
};
export const findInHeartStore = song => {
	let foundArr = get(heartStore).filter(el => el === song);
	return foundArr.length > 0;
};
export const returnHeartedData = data => {
	let newD = data.filter((el, index) => {
		let found = findInHeartStore(index);
		if (found) return el;
	});
	console.log("hearted data: ", data, " => ", newD);
	return newD;
};
