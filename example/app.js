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
	title: "play audio stream",
	bottom: 50
});
const btnVideo = Ti.UI.createButton({
	title: "play video",
	bottom: 90
});
const btnStop = Ti.UI.createButton({
	title: "stop",
	bottom: 10
});

btnStream.addEventListener("click", function(e) {
	exoView.url = "http://listen.181fm.com/181-oldschool_128k.mp3";
	exoView.play();
});
btnStop.addEventListener("click", function(e) {
	exoView.stop();
});

btnVideo.addEventListener("click", function(e) {
	exoView.url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
	exoView.play();
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

win.add([exoView, lbl, btnVideo, btnStream, btnStop]);
win.open();
