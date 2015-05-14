var JS_starChain = {};

JS_starChain.game = (function () {
	var ctx; //star context
	var frameLength = 50;
	var star;
	var test = 'test';
	function init() {
		var $canvas = $('#starChain'); //Selecting the Canvas jQuery Object
		var canvas = $canvas[0]; //selects the dom element 
		ctx = canvas.getContext('2d'); 
		star = JS_starChain.star();
		bindKeyboardEvents();
		gameLoop();
		//$canvas.attr('height', 100%); //attr = appends into selected <> tags
		//$canvas.attr('width', 100%); 
		//ctx.fillStyle = '#E0E0EB';
		//ctx.fillRect(0, 0, 100%, 100%);
	}
	
	function gameLoop() {
		ctx.clearRect(0,0,500,500); //may need to make dynamic depending on screen size
		ctx.fillStyle = '#FFD700'; //Gold Star
		//ctx.fillRect(xPos, yPos, 5, 2);
		// call the function by using 
		//star(canvas, x of center, y of center, radius, number of points, 
		//fraction of radius for inset)
		star.continueStarChain(ctx);
		setTimeout(gameLoop, frameLength);
	}
		return {
			init: init
		};
		
	function bindKeyboardEvents () {
		var directionKeys = {
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down'
		};
			
		$(document).keydown(function (event) {
			var key = event.which;
			var direct = directionKeys[key];
			if(direct) {
				star.setDirect(direct);
				event.preventDefault();
			}
			else if ( key === 32 ) {
				restart();
			}
		});
	}
})();

JS_starChain.star = function () {
	var posArray = [];
	var game = JS_starChain.game;
	var direction = 'right';
	var nextDirect = direction;
	var xPos = 30; //starting x position
	var yPos = 30; //starting y position
		//pos
	console.log(direction);
	function setDirect(newDirect) {
		var setDirections;
		switch(direction)
		{
			case 'up':
			case 'down':
				setDirections = ['left', 'right'];
				break;
			case 'left':
			case 'right':
				setDirections = ['up', 'down'];
				break;
			default:
				throw('Error Direction');
		}
		if (setDirections.indexOf(newDirect) > -1) {
			nextDirect = newDirect;
		}
	}
	
	function starDraw(ctx, x, y, r, p, m){
		ctx.save();
		ctx.beginPath();
		ctx.translate(x, y);
		ctx.moveTo(0,0-r);
		for (var i = 0; i < p; i++)
		{
			ctx.rotate(Math.PI / p);
			ctx.lineTo(0, 0 - (r*m));
			ctx.rotate(Math.PI / p);
			ctx.lineTo(0, 0 - r);
		}
		ctx.fill();
		ctx.restore();
	}
	
	function continueStarChain(ctx) {
		var forwardStar;
		direction = nextDirect;
		console.log("continueStarChain " + direction);
		switch (direction) 
		{
			case 'left':
				xPos -= 1;
				console.log(xPos);
				break;
			case 'right':
				xPos += 1;
				console.log(xPos);
				break;
			case 'up':
				yPos -= 1;
				console.log(yPos);
				break;
			case 'down':
				yPos +=1;
				console.log(yPos);
				break;
			default:
				throw('Error Direction');
		}
		starDraw(ctx, xPos, yPos, 4, 5, .5);
	}
	
	return {
		starDraw: starDraw,
		continueStarChain: continueStarChain,
		setDirect: setDirect
		};
};

$(document).ready(function () {
	JS_starChain.game.init();
	});