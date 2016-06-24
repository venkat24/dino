var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 720;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg.png";

//tree image
var treeReady = false;
var treeImage = new Image();
treeImage.onload = function () {
	treeReady = true;
}
treeImage.src = "images/tree.png";

// dino image
var dinoReady = false;
var dinoImage = new Image();
dinoImage.onload = function () {
	dinoReady = true;
};
dinoImage.src = "images/dino.png";

var dino = {
	speed: 17, // movement in pixels per second
	x: 100,
	y: 450,
	width: dinoImage.width,
	height: 150,
	jumping: false,
	vel: 0
};
var tree = {
	width: 138,
	height: 150,
	x: 4000,
	y: 450
};

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	if ( ( e.keycode || e.which ) == 32) {
		e.preventDefault();
	}
}, false);

addEventListener("touchstart", function (e) {
	keysDown[32] = true;
}, false);
addEventListener("keyup", function (e) {
	keysDown[e.keyCode] = false;
}, false);

var game_started = false;
var gravity = 2 ;  // 2 -> Easy --- 3 -> HARD
var keys = function () {
	if (keysDown[32]) { // Player holding space
		if(!dino.jumping) {
			pauseGame();
			if (!game_started) {
				game_started = true;
				main();
			} else {
				dino.jumping = true;
				dino.vel = -dino.speed*2;
			}
		}
	}
	if (keysDown[80]) pauseGame();
};
var xpos = 0;
var game_over=false;
var score = 0;
var factor1 = 1;
var factor2 = 1;
var pauseGame = function () {
	requestAnimationFrame(pauseGame);
}
var render = function () {
	ctx.translate(offsetX, 0);
	if (bgReady) {
		ctx.drawImage(bgImage, ((factor1-1)*25600) + 0, 0);
		ctx.drawImage(bgImage, ((factor2-1)*12800) + 12800, 0);
	}
	if (dino.y <= 0) {
		dino.y=0;
	}
	if (dino.y >= 450) {
		dino.y=450;
		dino.jumping= false;
	}
	if (dinoReady) {
		ctx.drawImage(dinoImage, dino.x, dino.y);
	}
	if (treeReady) {
		ctx.drawImage(treeImage, tree.x, tree.y);
	}
	var treeWidth=138;
	var treeHeight=150;
	var dinoWidth=120;
	var dinoHeight=130;
	if (dino.x < tree.x + treeWidth  && dino.x + dinoWidth  > tree.x &&
		dino.y < tree.y + treeHeight && dino.y + dinoHeight > tree.y) {
		if (!game_over) {
			alert("Game Over. Your score is " + (Math.floor(score)));
			location.reload();
		}
		game_over = true;
	}
	if (tree.x < (dino.x-130)) {
		tree.x+=1000 + Math.floor(Math.random()*1000);
		score++;
	}
	if (dino.x > (12800*factor1)) {
		if (factor1 <= factor2) {
			factor1++;
		} else {
			factor2++;
		}
	}
	dino.vel+=gravity;
	dino.y+=dino.vel;
	dino.x+=15;
	tree.x-=5;
};
var offsetX = -15 ;
var main = function () {
	var now = Date.now();
	var delta = now - then;
	render();
	keys();
	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();

//Splash Screen
var splashReady = false;
var splashImage = new Image();
splashImage.onload = function () {
	splashReady = true;
};
splashImage.src = "images/splash.png";
var splash = function () {
	ctx.drawImage(splashImage, 0, 0);
	keys();
	requestAnimationFrame(splash);
}
splash();