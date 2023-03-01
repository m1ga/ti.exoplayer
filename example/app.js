 
var win = Ti.UI.createWindow({});
 var exo = require("ti.exoplayer").createVideoPlayer({
width: 400,
height: 225,
url: "https://streamer.radio.co/s6832865c1/listen"
});
 var btn = Ti.UI.createButton({title:"pause", bottom: 0});
var btn2 = Ti.UI.createButton({title:"play", bottom: 50});
 win.add([exo,btn,btn2]);
 btn.addEventListener("click", function(){exo.pause();});
btn2.addEventListener("click", function(){exo.play();});
win.open();
