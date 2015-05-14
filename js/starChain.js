var JS_starChain = {};

JS_starChain.game = (function () {
	var ctx; //star context
	var frameLength = 50; //How often gameLoop refreshes 
	var star;
	var planet;
	
	function init() {
		var $canvas = $('#starChain'); //Selecting the Canvas jQuery Object
		var canvas = $canvas[0]; //selects the dom element 
		ctx = canvas.getContext('2d'); //"2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.
		star = JS_starChain.star();
		planet = JS_starChain.planet();
		bindKeyboardEvents(); //Adds event - press down of the arrow keys
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
		planet.draw(ctx);
		
		
		if (star.chainCollision()){
			alert("END!");
		}
		else {
			setTimeout(gameLoop, frameLength);
		}
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
		switch (direction) 
		{
			case 'left':
				xPos -= 3;
				//console.log(xPos);
				break;
			case 'right':
				xPos += 3;
				//console.log(xPos);
				break;
			case 'up':
				yPos -= 1.8;
				//console.log(yPos);
				break;
			case 'down':
				yPos += 1.8;
				//console.log(yPos);
				break;
			default:
				throw('Error Direction');
		}
		starDraw(ctx, xPos, yPos, 8, 9, .3); //context, x, y, size, points, fraction
	}
	
	function chainCollision () {
		var wallCollision = false;
		var starCollision = false;
		var starPos;
		
		var minX = 5;
		var minY = 5;
		
		var maxX = 295;
		var	maxY = 145;
		
		var xBounds = xPos < minX || xPos > maxX;
		var yBounds = yPos < minY || yPos > maxY;
		console.log("X: " + xPos + "  Y: " + yPos);
		if (xBounds || yBounds){
			wallCollision = true;
		}
		console.log("Wall: " + wallCollision);
		return wallCollision;
	}
	
	return {
		starDraw: starDraw,
		continueStarChain: continueStarChain,
		setDirect: setDirect,
		chainCollision: chainCollision
		};
};

JS_starChain.planet = function () {
	var position = [6, 6];
	
		function draw(ctx) {
			ctx.save();
			ctx.fillStyle = 'green'; //apple green
			ctx.beginPath();
			var radius = 8 / 2; //star size / 2
			var x = position[0] * 8 + radius;
			var y = position[1] * 8 + radius;
			ctx.arc(x, y, radius, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.restore();
		}
		return{
			draw: draw
		};
};
	

$(document).ready(function () {
	JS_starChain.game.init();
	});