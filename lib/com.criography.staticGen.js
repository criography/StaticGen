/* StaticGen 1.0 — simple canvas static noise generator (c) @criography Marek Lenik MIT License */
var StaticGen = (function(document, window){

	"use strict";

	var container,																		/* container element */
			c,																						/* main canvas element */
			ctx,																					/* main canvas's context */
			sprite,																				/* sprite (pre-render) canvas element */
			spriteCtx,																		/* sprite (pre-render) canvas's context */
			tileNumH 			= 1,														/* amount of Horizontal tile repetitions */
			tileNumV 			= 1,														/* amount of Vertical tile repetitions */
			currentFrame	= 0,														/* current assembled frame */
	
			timer					= null,													/* interval object */
	
			options 			= {	width					: 0,					/* main canvas width. Defaults to container width */
												height				: 0,					/* main canvas height.Defaults to container height */
												tileWidth     : 100,				/* unique tile width */
												tileHeight    : 100,				/* unique tile height */
												totalFrames   : 4,					/* number of total static frames */
												fps           : 1000 / 8,		/* errr… number of frames per second? */
												pixelWidth    : 1,					/* single static grain width */
												pixelHeight   : 1,					/* single static grain height */
												stretchH      : 1,					/* amount of horizontal stretching applied to each static grain. Possible options: 'fit' to fit container width or int>1 */
												stretchV      : 1,					/* amount of vertical stretching applied to each static grain. Possible options: 'fit' to fit container width or int>1 */
												scanLines     : false,			/* leave a 1px high gap between {pixelHeight}px pixel rows */
												randomizeRows : false				/* should each row be randomly offset by a fraction of {pixelWidth}? */
											};






/**-----------------------------------------------------------------------------
 * prerenderFrames
 * -----------------------------------------------------------------------------
 * prerenders all unique {options.totalFrames} number of tiles
 *
 * @private
 * -----------------------------------------------------------------------------*/

	function prerenderFrames(){
		var updatedPixelHeight = options.pixelHeight + (options.scanLines ? 1 : 0);

		for(var f = 0; f < options.totalFrames; f++){
			for(var y = 0; y < Math.ceil(options.tileHeight / updatedPixelHeight); y++){
				var horizontalOffset = options.randomizeRows ? -Math.round(Math.random() * options.pixelWidth) : 0;

				for(var x = 0; x < Math.ceil(options.tileWidth / options.pixelWidth) + (options.randomizeRows ? 1 : 0); x++){

					var color = Math.floor(Math.random() * 150);
					spriteCtx.fillStyle = "rgba(" + color + "," + color + "," + color + ",255)";
					spriteCtx.fillRect(
						horizontalOffset + x * options.pixelWidth,
						f * options.tileHeight + y * updatedPixelHeight,
						options.pixelWidth,
						options.pixelHeight
					);

				}
			}
		}
	}

/**-----------------------------------------------------------------------------
 * ENDOF: prerenderFrames
 * -----------------------------------------------------------------------------*/








/**-----------------------------------------------------------------------------
 * drawFrame
 * -----------------------------------------------------------------------------
 * cuts out a corresponding to {currentFrame} bit from sprite canvas and
 * fills main cavas with it, accordingly to rendering options.
 *
 * @private
 * -----------------------------------------------------------------------------*/

	function drawFrame(){
		var actualTileWidth		= options.tileWidth		* ( isNaN(options.stretchH) ? 1 : options.stretchH ),
				actualTileHeight	= options.tileHeight	* ( isNaN(options.stretchV) ? 1 : options.stretchV );


		for(var x = 0; x < tileNumH; x++){
			for(var y = 0; y < tileNumV; y++){

				ctx.drawImage(
					sprite,

					0, 																						/* sprite X */
					currentFrame * options.tileHeight, 						/* sprite Y */
					options.tileWidth, 														/* sprite tile Width */
					options.tileHeight,														/* sprite tile Height */

					x * actualTileWidth,													/* canvas X */
					y * actualTileHeight,													/* canvas Y */
					(options.stretchH === 'fit' ?									/* canvas tile Width */
						options.width :
							(options.stretchH > 1 ? actualTileWidth : options.tileWidth)
					),
					(options.stretchV === 'fit' ?									/* canvas tile Height */
						options.height :
							(options.stretchV > 1 ? actualTileHeight : options.tileHeight)
					)
				);

			}
		}

		currentFrame++;
		if(currentFrame === options.totalFrames){
			currentFrame = 0;
		}

	}

/**-----------------------------------------------------------------------------
 * ENDOF: drawFrame
 * -----------------------------------------------------------------------------*/







/**-----------------------------------------------------------------------------
 * createCanvas
 * -----------------------------------------------------------------------------
 * generates canvas and optionally inserts it to the DOM with a css class 'static'
 *
 * @private
 * @param {int} width Canvas width
 * @param {int} height Canvas height
 * @param {boolean} addToDOM should it be injected into DOM?
 * @param {boolean} replaceContent Defines whether container element's innerHTML should be inserted into the canvas tag as a fallback.
 * @return {object} canvas element
 * -----------------------------------------------------------------------------*/

	function createCanvas(width, height, addToDOM, replaceContent){
		var canvas		= document.createElement('canvas');

		canvas.width	= width;
		canvas.height = height;

		/* grab existing content and inject it into canvas */
		/* insert canvas into DOM                          */
		canvas.classList.add('static');

		if(replaceContent){
			canvas.innerHTML = container.innerHTML;
			container.innerHTML = '';
		}

		if(addToDOM){
			container.appendChild(canvas);
		}

		return canvas;
	}

/**-----------------------------------------------------------------------------
 * ENDOF: createCanvas
 * -----------------------------------------------------------------------------*/






/**-----------------------------------------------------------------------------
 * killTimer
 * -----------------------------------------------------------------------------
 * removes timer and effectively stops the animation
 *
 * @private
 * -----------------------------------------------------------------------------*/

	function killTimer(){
		window.clearInterval(timer);
	}

/**-----------------------------------------------------------------------------
 * ENDOF: killTimer
 * -----------------------------------------------------------------------------*/







/**-----------------------------------------------------------------------------
 * startTimer
 * -----------------------------------------------------------------------------
 * initialises the timer
 *
 * @private
 * -----------------------------------------------------------------------------*/

	function startTimer(){
		timer = window.setInterval(drawFrame, options.fps);
	}

/**-----------------------------------------------------------------------------
 * ENDOF: startTimer
 * -----------------------------------------------------------------------------*/









/**-----------------------------------------------------------------------------
 * init
 * -----------------------------------------------------------------------------
 * 1. parses options
 * 2. updates vars
 * 3. calls all preparation methods
 * 4. inits timer -> animation
 *
 * @private
 * -----------------------------------------------------------------------------*/

	function init(selector, extended){

		/* proceed only if container was specified and exists */
		if(container = document.querySelector(selector)){



			/* extend default options with whatever parameters passed through */
			if(extended){

				for(var i in extended){
					if(extended.hasOwnProperty(i) && typeof options[i] !== "undefined"){

						options[i] = extended[i];

						/* calculate fps timing */
						if(i === 'fps'){
							options.fps = 1000 / extended.fps;
						}

					}
				}
			}

			/* if not set specifically, define main canvas dimensions based on container size */
			if(options.width === 0){
				options.width	= container.offsetWidth;
			}
			if(options.height === 0){
				options.height = container.offsetHeight;
			}


			/* correct tileSizes if larger than actual canvas */
			options.tileWidth		= Math.min(options.tileWidth, options.width);
			options.tileHeight	= Math.min(options.tileHeight, options.height);


			/* correct tileSizes if larger than actual canvas */
			options.tileWidth		= Math.min(options.tileWidth, options.width);
			options.tileHeight	= Math.min(options.tileHeight, options.height);

			/* calculate amount of tiles per frame */
			tileNumH = (options.width === options.tileWidth 	|| options.stretchH === 'fit') ? 1 : Math.ceil(options.width / options.tileWidth * options.stretchH);
			tileNumV = (options.height === options.tileHeight || options.stretchV === 'fit') ? 1 : Math.ceil(options.height / options.tileHeight * options.stretchV);



			if(!c && !sprite){
				/* set up rendering canvas, insert into DOM and replace contents */
				c		= createCanvas(options.width, options.height, true, true);
				ctx = c.getContext('2d');

				/* set up the offscreen canvas */
				sprite		= createCanvas(options.tileWidth, options.tileHeight * options.totalFrames);
				spriteCtx = sprite.getContext('2d');
			}


			/* render frames to offcanvas element */
			prerenderFrames();


			/* run it, sister */
			startTimer();


		}

	}

/**-----------------------------------------------------------------------------
 * ENDOF: init
 * -----------------------------------------------------------------------------*/






	return{
		init  : function(selector, extended){
							init(selector, extended);
						},
		redraw: function(extended){
							killTimer();

							ctx.clearRect(0, 0, c.width, c.height);

							sprite.width	= extended.tileWidth;
							sprite.height	= extended.tileHeight*extended.totalFrames;

							init( ( container.id ? '#'+container.id : '.'+container.classList[0] ) , extended);
						},
		pause : function(){
							killTimer();
							c.classList.add("paused");
						},

		resume: function(){
							startTimer();
							c.classList.remove("paused");
						}
	};

})(document, window);