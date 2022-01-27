# Ti.Exoplayer - Audio/Video player for Android


Based on <a href="https://github.com/HamidrezaAmz/MagicalExoPlayer">MagicalExoPlayer</a> (Exoplayer 2.15.0)

Supports Dash, HLS, MP4, MP3

## Installation

add this to your `/app/platform/android/build.gradle`:
```
repositories {
	google();
	maven { url 'https://jitpack.io' }
}
```

## Example

```js
var win = Ti.UI.createWindow({});

var exo = require("ti.exoplayer").createVideoPlayer({
	width: 400,
	height: 225,
    url: "https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4"
});

var btn = Ti.UI.createButton({title:"pause", bottom: 0});
var btn2 = Ti.UI.createButton({title:"play", bottom: 50});

win.add([exo,btn,btn2]);

btn.addEventListener("click", function(){exo.pause();});
btn2.addEventListener("click", function(){exo.play();});
win.open();
```
