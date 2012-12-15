Static/Noise Canvas Generator
=============================

A rather pointless (though perhaps someone will have a need for such a thing one day) simple 2KB library allowing you to add a old TV like noise/static effect through a canvas. It uses offscreen prerendering and tiling for increased performance.

###### Please note: it will be applied to only one element—first child of a given selector query.
###### Please note 2: the contents of the container elements will be inserted into canvas tag as a fallback in case something went terribly wrong.


Usage
-----
<pre>
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
</pre>
## Methods

### Redraw
Redraws the canvas using a new set of options without interfering with the DOM.
<pre>
<code>
StaticGen.redraw({
	tileWidth   : 300,
	tileHeight  : 100
});
</code>
</pre>

### Pause
Pause the animation.
<pre>
<code>
 StaticGen.pause();
</code>
</pre>

### Pause
Resumes paused animation.
<pre>
<code>
StaticGen.resume();
</code>
</pre>

Examples
--------
### Interactive Playground
[https://github.com/criography/StaticGen/blob/master/example/playground.html](http://htmlpreview.github.com/?https://github.com/criography/StaticGen/blob/master/example/playground.html)

### a little something with some CSS3 goodness
[https://github.com/criography/StaticGen/blob/master/example/tv.html](http://htmlpreview.github.com/?https://github.com/criography/StaticGen/blob/master/example/tv.html)
