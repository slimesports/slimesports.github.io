var screen_specs = {
    "height": 400,
    "width": 800
}

var ball_specs = {
    "diameter": 25,
    "radius": 12.5,
    "top": 50,
    "left": 0
}
ball_specs.left = (screen_specs.width / 2 - ball_specs.radius);

var backboard_specs = {
    "height": 80, // 60
    "width": 7, // 5
    "top": 160, // 120
    "left": 20
}

var court_specs = {
    "height": 80,
    "width": 800,
    "top": 0,
    "left": 0
}
court_specs.top = screen_specs.height - court_specs.height;

var goaltending = {
    "height": 5,
    "width": 85,
    "top": 80,
    "left": 0
}
goaltending.top = court_specs.top + 2;

var halfcourt_specs = {
    "height": 7,
    "width": 7,
    "top": 0,
    "left": 0
}
halfcourt_specs.left = (screen_specs.width / 2 - halfcourt_specs.width / 2);
halfcourt_specs.top = court_specs.top;

var slime_radius = 40;

var rim_specs = {
    "height": 5, // 3
    "width": 55, // 41
    "top": 215, // 160
    "left": 27
}
rim_specs.left = (backboard_specs.left + backboard_specs.width);

var keys = {
    "w": false,
    "a": false,
    "s": false,
    "d": false,
    "left": false,
    "up": false,
    "right": false,
    "down": false
}

var color = {
    "white": "#FFFFFF",
    "blue": "#0000FF",
    "grey": "#999999",
    "yellow": "#FAF702",
    "orange": "#FF6103"
}

var canvas;
var stage;
var background;
var court;
var goaltendingArea;
var halfcourt;
var backboard;
var rim;
var net;
var player1;
var player2;
var ball;

//increase negative velocity each time
var GRAVITY = 0.7;
var JUMP_SPEED = 12;
var SPEED = 8;
var p1XV = 0;
var p1YV = 0;
var p2XV = 0;
var p2YV = 0;

//ball vars
var ballX = 500;
var ballY = 400;
var ballOldX = 500;
var ballOldY = 400;
var ballVX = 0;
var ballVY = 0;

var fP1Sticky = false;
var fP1Touched = false;
var fP2Sticky = false;
var fP2Touched = false;
var fhold1 = false;
var fhold2 = false;
var gameOver = false;

var FPS = 60;