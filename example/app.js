import exoPlayer from 'ti.exoplayer';
const win = Ti.UI.createWindow();
const exoView = exoPlayer.createExoPlayer({
	url: "http://listen.181fm.com/181-oldschool_128k.mp3",
	width: 400,
	height: 200,
	top: 10,
	// audioOnly: true
});
const lbl = Ti.UI.createLabel({
	top: 230,
	left: 10,
	text: "-"
})
const btnStream = Ti.UI.createButton({
	title: "load audio stream",
	bottom: 50
});
const btnVideo = Ti.UI.createButton({
	title: "load video",
	bottom: 90
});
const btnCurrent = Ti.UI.createButton({
	title: "current position/duration",
	bottom: 130
});
const bottomMenu = Ti.UI.createView({
	bottom: 10,
	layout: "horizontal",
	height: 40,
	width: Ti.UI.SIZE
})
const btnStop = Ti.UI.createButton({
	title: "stop",
	right: 2
});
const btnPause = Ti.UI.createButton({
	title: "pause",
	right: 2
});
const btnPlay = Ti.UI.createButton({
	title: "play",
	right: 2
});
const btnIsPlaying = Ti.UI.createButton({
	title: "is playing?"
});

btnStream.addEventListener("click", function(e) {
	exoView.url = "http://listen.181fm.com/181-oldschool_128k.mp3";
	exoView.play();
});
btnStop.addEventListener("click", function(e) {
	exoView.stop();
});
btnPause.addEventListener("click", function(e) {
	exoView.pause();
});
btnPlay.addEventListener("click", function(e) {
	exoView.play();
});
btnIsPlaying.addEventListener("click", function(e) {
	alert("is playing? " + exoView.playing);
});

btnVideo.addEventListener("click", function(e) {
	exoView.url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
	exoView.play();
});

btnCurrent.addEventListener("click", function(e) {
	console.log(exoView.currentPosition + " of " + exoView.duration);
});

exoView.addEventListener("metaData", function(e) {
	let str = "";
	if (e.album) str += e.album;
	if (e.title) str += e.title;
	lbl.text = str;
})

exoView.addEventListener("seek", function(e) {
	console.log(e.oldPosition, "->", e.position);
})

exoView.addEventListener("playerState", function(e) {
	if (e.state != undefined) {
		console.log("state", e.state);
	}
	if (e.playing) {
		console.log("is playing", e.playing);
	}
})

win.addEventListener("open", function() {});

bottomMenu.add([btnPlay, btnStop, btnPause, btnIsPlaying]);
win.add([exoView, lbl, btnVideo, btnStream, bottomMenu,btnCurrent]);
win.open();
