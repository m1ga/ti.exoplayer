# Ti.ExoPlayer

A Titanium Android module for HLS, DASH, and MP4 video playback powered by [AndroidX Media3 ExoPlayer](https://developer.android.com/media/media3/exoplayer). Built as a drop-in alternative to `Ti.Media.VideoPlayer` for Android, with full HLS/DASH support, token-authenticated streams, and fine-grained playback control.

![Titanium](https://img.shields.io/badge/Titanium-13.1.1.GA+-red.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![Media3](https://img.shields.io/badge/Media3-1.9.2-blue.svg)
![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)
![Maintained](https://img.shields.io/badge/Maintained-Yes-green.svg)

---

## Why Ti.ExoPlayer?

`Ti.Media.VideoPlayer` on Android uses the platform's native `MediaPlayer`, which has known limitations:

| Feature | Ti.Media.VideoPlayer | Ti.ExoPlayer |
|---|---|---|
| HLS (.m3u8) | ⚠️ Unreliable | ✅ Full support |
| DASH (.mpd) | ❌ | ✅ Full support |
| Authenticated streams (JWT tokens) | ❌ | ✅ |
| Custom HTTP headers | ❌ | ✅ |
| Playback speed control | ❌ | ✅ |
| Detailed error events | ❌ | ✅ |
| Progress events | ❌ | ✅ |

---

## Requirements

- Titanium SDK **13.1.1+**

---

## Installation

### 1. Copy the module

Copy the module to your project's  `modules/android/`  folder

### 2. Add to `tiapp.xml`

```xml
<modules>
    <module platform="android">ti.exoplayer</module>
</modules>
```

---

## Quick Start

```javascript
const ExoPlayer = require('ti.exoplayer');

const player = ExoPlayer.createExoPlayer({
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
    scalingMode: ExoPlayer.SCALING_MODE_CROP,
    autoplay: true,
    repeat: true,
    muted: true,
    showControls: false
});

win.add(player);
```

---

## API Reference

### Creation Properties

All properties can be set at creation time via `createExoPlayer({...})` or dynamically via setters.

| Property | Type | Default | Description |
|---|---|---|---|
| `url` | String | — | Media URL (HLS, DASH, MP4, etc.) |
| `autoplay` | Boolean | `false` | Start playback immediately when ready |
| `volume` | Number | `1.0` | Playback volume (0.0 to 1.0) |
| `muted` | Boolean | `false` | Mute audio without changing volume |
| `playbackSpeed` | Number | `1.0` | Playback rate (e.g. `0.5`, `1.0`, `2.0`) |
| `repeat` | Boolean | `false` | Loop playback indefinitely |
| `showControls` | Boolean | `true` | Show/hide native player controls |
| `scalingMode` | Constant | `SCALING_MODE_FIT` | Video scaling strategy |
| `headers` | Object | — | Custom HTTP headers for all requests |
| `userAgent` | String | — | Custom User-Agent header |
| `crossProtocolRedirects` | Boolean | `false` | Allow HTTP→HTTPS redirects |
| `minBufferDuration` | Number | `3000` | Minimum buffer before playback (ms) |
| `maxBufferDuration` | Number | `8000` | Maximum buffer size (ms) |
| `minStartBuffer` | Number | `500` | Buffer needed to start playback (ms) |
| `minResumeBuffer` | Number | `1500` | Buffer needed to resume after stall (ms) |
| `audioOnly` | Boolean | `false` | Use audio-only layout (no video surface) |

### Scaling Mode Constants

```javascript
ExoPlayer.SCALING_MODE_FIT    // Fit video inside player, letterbox/pillarbox
ExoPlayer.SCALING_MODE_FILL   // Stretch to fill, may distort aspect ratio
ExoPlayer.SCALING_MODE_CROP   // Crop to fill, no distortion (zoom)
```

### Methods

```javascript
player.play()           // Start or resume playback
player.pause()          // Pause playback
player.stop()           // Stop playback and reset position
player.seekTo(ms)       // Seek to position in milliseconds
player.release()        // Release all resources (call when done)
```

### Gettable / Settable Properties

```javascript
player.url              // Get or set the media URL
player.volume           // Get or set volume (0.0–1.0)
player.muted            // Get or set muted state
player.playbackSpeed    // Get or set playback speed
player.repeat           // Get or set repeat mode
player.scalingMode      // Get or set scaling mode
player.showControls     // Get or set controls visibility

// Read-only
player.playing          // Boolean — true if currently playing
player.currentPosition  // Current playback position in ms
player.duration         // Total duration in ms (-1 if unknown)
```

### Events

#### `playerState`

Fires on every playback state change.

```javascript
player.addEventListener('playerState', function(e) {
    switch (e.state) {
        case ExoPlayer.STATE_IDLE:      // Player is idle
        case ExoPlayer.STATE_BUFFERING: // Buffering
        case ExoPlayer.STATE_READY:     // Ready to play
        case ExoPlayer.STATE_ENDED:     // Playback finished
        case ExoPlayer.STATE_PLAYING:   // e.playing = true/false
    }
});
```

#### `error`

Fires when the player encounters a fatal error.

```javascript
player.addEventListener('error', function(e) {
    console.error('Code:', e.code);
    console.error('Message:', e.message);
    console.error('Cause:', e.cause);
});
```

#### `progress`

Fires every 250ms during playback.

```javascript
player.addEventListener('progress', function(e) {
    console.log('Position:', e.position, 'ms');
    console.log('Duration:', e.duration, 'ms');
    
    const percent = (e.position / e.duration) * 100;
    progressBar.value = percent;
});
```

#### `seek`

Fires when the playback position changes due to a seek.

```javascript
player.addEventListener('seek', function(e) {
    console.log('Seeked from', e.oldPosition, 'to', e.position);
});
```

#### `metaData`

Fires when media metadata is available (from HLS/DASH stream tags).

```javascript
player.addEventListener('metaData', function(e) {
    console.log('Title:', e.title);
    console.log('Album:', e.album);
    console.log('Artwork URL:', e.artworkUrl);
});
```

### State Constants

```javascript
ExoPlayer.STATE_IDLE        // 1 — No media loaded
ExoPlayer.STATE_BUFFERING   // 2 — Loading/buffering
ExoPlayer.STATE_READY       // 3 — Ready to play
ExoPlayer.STATE_ENDED       // 4 — Playback complete
ExoPlayer.STATE_PLAYING     // 5 — Playing or paused state change
```

---

## Usage Examples

### HLS Stream with JWT Token

```javascript
const ExoPlayer = require('ti.exoplayer');

const player = ExoPlayer.createExoPlayer({
    url: 'https://cdn.example.com/live/stream.m3u8?token=eyJ...',
    width: Ti.UI.FILL,
    height: 300,
    scalingMode: ExoPlayer.SCALING_MODE_FIT,
    autoplay: true,
    showControls: true
});
```

### Background Video Loop (TikTok/Reels style)

```javascript
const player = ExoPlayer.createExoPlayer({
    url: videoUrl,
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
    scalingMode: ExoPlayer.SCALING_MODE_CROP,
    autoplay: false,   // control manually
    repeat: true,
    muted: true,
    showControls: false,
    touchEnabled: false,
    bubbleParent: false,
    zIndex: 0
});
```

### Stream with Custom Headers

```javascript
const player = ExoPlayer.createExoPlayer({
    url: 'https://protected.example.com/video.m3u8',
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'X-Custom-Header': 'value'
    },
    userAgent: 'MyApp/1.0 (Android)',
    autoplay: true
});
```

### Progress Bar Integration

```javascript
const player = ExoPlayer.createExoPlayer({ url: videoUrl });
const progressBar = Ti.UI.createSlider({ min: 0, max: 100, value: 0 });

player.addEventListener('progress', function(e) {
    if (e.duration > 0) {
        progressBar.value = (e.position / e.duration) * 100;
    }
});

progressBar.addEventListener('change', function(e) {
    if (player.duration > 0) {
        player.seekTo(Math.floor((e.value / 100) * player.duration));
    }
});
```

### Full Lifecycle Management

```javascript
const ExoPlayer = require('ti.exoplayer');
let player = null;

win.addEventListener('open', function() {
    player = ExoPlayer.createExoPlayer({
        url: videoUrl,
        autoplay: true
    });
    win.add(player);
});

win.addEventListener('close', function() {
    if (player) {
        player.stop();
        player.release();
        player = null;
    }
});

Ti.Android.currentActivity.addEventListener('pause', function() {
    if (player) player.pause();
});

Ti.Android.currentActivity.addEventListener('resume', function() {
    if (player) player.play();
});
```
---


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---