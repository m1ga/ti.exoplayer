# ExoPlayer module for Titanium SDK

Using Androids Media3 [ExoPlayer](https://developer.android.com/guide/topics/media/exoplayer) to play audio and video streams.
> ExoPlayer supports features not currently supported by Android’s MediaPlayer API, including DASH and SmoothStreaming adaptive playbacks

Based on Media3 ExoPlayer 1.1.0. [Suppored media formats](https://developer.android.com/guide/topics/media/media-formats)

## Code

```js
import exoPlayer from 'ti.exoplayer';
const exoView = exoPlayer.createExoPlayer();
```

## Methods
* <b>play()</b>: plays the audio/video file
* <b>pause()</b>: pauses the stream
* <b>stop()</b>: stops the stream
* <b>release()</b>: releases the player. Run this when you don't need it anymore
* <b>seekTo(ms)</b>: seek to a position in the file

## Properties
* <b>audioOnly</b> (boolean, creation only): player won't create a "video surface" and safes resources.
* <b>url</b> (String): the URL of the audio/video file
* <b>playing</b> (boolean): current play status
* <b>currentPosition</b> (int): current position
* <b>duration</b> (int): duration (-1 if unavailable)
* <b>minBufferDuration</b> (int): min buffer duration in ms (default: 3000)
* <b>maxBufferDuration</b> (int): max buffer duration in ms (default: 8000)
* <b>minResumeBuffer</b> (int): min playback resume buffer duration in ms (default: 1500)
* <b>minStartBuffer</b> (int): min playback start buffer duration in ms  (default: 500)
* <b>targetBufferBytes</b> (int):  target buffer size in bytes. Only used if >-1 and other the other buffer durations will be ignored (default: -1)

## Events
* <b>playerState</b>: state (on of the constants)
* <b>metaData</b>: title, album, albumTitle, albumArtist
* <b>seek</b>: position, oldPosition

## Constants

* STATE_IDLE
* STATE_BUFFERING
* STATE_READY
* STATE_ENDED
* STATE_PLAYING


## Example

Check the `example/app.js` for code.


## Author

- Michael Gangolf ([@MichaelGangolf](https://twitter.com/MichaelGangolf) / [Web](http://migaweb.de))

<span class="badge-buymeacoffee"><a href="https://www.buymeacoffee.com/miga" title="donate"><img src="https://img.shields.io/badge/buy%20me%20a%20coke-donate-orange.svg" alt="Buy Me A Coke donate button" /></a></span>
