//#region node_modules/.nitro/vite/services/ssr/assets/types-DVai5i6l.js
function journeyImages(journey) {
	return (journey.images?.length ? journey.images : [journey.image]).filter(Boolean);
}
function journeyCover(journey) {
	return journeyImages(journey)[0] ?? "";
}
function journeyVideos(journey) {
	return (journey.videos ?? []).filter(Boolean);
}
//#endregion
export { journeyImages as n, journeyVideos as r, journeyCover as t };
