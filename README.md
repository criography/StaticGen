Static/Noise Canvas Generator
=============================

A simple 2KB library allowing you to add a old TV like noise/static effect through a canvas. It uses offscreen prerendering and tiling for better performance.

###### Please note: it will be applied to only one element—first child of a given selector query.


Usage
-----
<code>
StaticGen.init('#selector', {
	width         : 0,      /* main canvas width. Defaults to container width */
	height        : 0,      /* main canvas height. Defaults to container height */
	tileWidth     : 200,    /* unique tile width */
	tileHeight    : 200,    /* unique tile height */
	totalFrames   : 4,      /* number of total static frames */
	fps           : 8,      /* errr… number of frames per second? */
	pixelWidth    : 2,      /* single static grain width */
	pixelHeight   : 2,      /* single static grain height */
	stretchH      : 8,      /* amount of horizontal stretching applied to each static grain. Possible options: 'fit' to fit container width or int>1 */
	stretchV      : 1,      /* amount of vertical stretching applied to each static grain. Possible options: 'fit' to fit container width or int>1 */
	scanLines     : true,   /* leave a 1px high gap between {pixelHeight}px pixel rows */
	randomizeRows : true    /* should each row be randomly offset by a fraction of {pixelWidth}? */
});
</code>

## Methods

### Redraw
Redraws the canvas using a new set of options without interfering with the DOM.
<code>
	StaticGen.redraw({
		tileWidth     : 300,
		tileHeight    : 100
	});
</code>

### Pause
Pause the animation.
<code>
 StaticGen.pause();
</code>

### Pause
Resumes paused animation.
<code>
StaticGen.resume();
</code>
