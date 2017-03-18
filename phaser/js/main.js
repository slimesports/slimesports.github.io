/*global Phaser dimensions*/

var game = new Phaser.Game(dimensions.screen.width, dimensions.screen.height, Phaser.CANVAS, 'slime-basketball', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('rim', 'assets/platform.png');
    game.load.image('slime', 'assets/slimer.png');
    game.load.image('ballImage', 'assets/ball.png');
}

var player1;
var cursors;
var spriteMaterial;
var timerDisplay;
var timeRemaining = 0;

function create() {
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = dimensions.game.gravity;
    // game.physics.p2.friction = lots;
    game.physics.p2.defaultRestitution = dimensions.game.restitution;

    createBall();
    createSlime1();
    createHoops();
    createCourt();
    createTimer();

    // Enable arrow support
    cursors = game.input.keyboard.createCursorKeys();

}

function createBall() {
    // Create ball sprite
    let ballSprite = game.add.sprite(0, 0, 'ballImage');
    ballSprite.height = dimensions.ball.diameter;
    ballSprite.width = dimensions.ball.diameter;
    ballSprite.x = (dimensions.screen.width / 2 - dimensions.ball.radius);
    ballSprite.y = dimensions.ball.top;

    //  Enable ball physics. This creates a default rectangular body.
    game.physics.p2.enable(ballSprite);
    ballSprite.body.setCircle(dimensions.ball.radius);
    ballSprite.body.setMaterial(spriteMaterial);
    return ballSprite;
}

function createSlime1() {
    //  Add player1
    player1 = game.add.sprite(dimensions.slime.left, dimensions.slime.top, 'slime');
    player1.width = dimensions.slime.radius * 2;
    player1.height = dimensions.slime.radius;

    game.physics.p2.enable(player1);
    player1.body.fixedRotation = true;
    return player1;
}

function createHoops() {
    let backboards = game.add.group();

    // Left rim
    let leftRim = backboards.create(0, 0, 'rim');
    leftRim.height = dimensions.rim.height;
    leftRim.width = dimensions.rim.width;
    leftRim.x = dimensions.rim.left + (dimensions.rim.width / 2);
    leftRim.y = dimensions.rim.top + (dimensions.rim.height / 2);

    game.physics.p2.enable(leftRim);
    leftRim.body.static = true;

    // Left backboard
    let leftBackboard = backboards.create(dimensions.backboard.left, dimensions.backboard.top, 'rim');
    leftBackboard.height = dimensions.backboard.height;
    leftBackboard.width = dimensions.backboard.width;

    game.physics.p2.enable(leftBackboard);
    leftBackboard.body.static = true;
}

function createCourt() {
    // Sprite court (hidden but functional)
    let courtSprite = game.add.sprite(0, 0, 'rim');
    courtSprite.height = dimensions.court.height;
    courtSprite.width = dimensions.court.width;
    courtSprite.x = dimensions.court.left + (dimensions.court.width / 2);
    courtSprite.y = dimensions.court.top + (dimensions.court.height / 2);

    game.physics.p2.enable(courtSprite);
    courtSprite.body.static = true;
    
    // draw visible but non-functial court
    drawCourt();

    return courtSprite;
}

function drawCourt() {
    let courtGraphic = game.add.graphics(0, 0);

    courtGraphic.beginFill(0x888888);
    courtGraphic.lineStyle(0, 0xFFFFFF, 0);
    courtGraphic.drawRect(dimensions.court.left, dimensions.court.top, dimensions.court.width, dimensions.court.height);
    courtGraphic.endFill();
    
    drawGoaltending(dimensions.goaltending.left);
    let rightGoaltendingX = (dimensions.court.width - dimensions.goaltending.width);
    drawGoaltending(rightGoaltendingX);

    return courtGraphic;
}

function drawGoaltending(x) {
    let goaltendingGraphic = game.add.graphics(0, 0);
    goaltendingGraphic.beginFill(0xFFFFFF);
    goaltendingGraphic.lineStyle(0, 0xFFFFFF, 0);
    goaltendingGraphic.drawRect(0, 0, dimensions.goaltending.width, dimensions.goaltending.height);
    goaltendingGraphic.x = x;
    goaltendingGraphic.y = dimensions.goaltending.top;
    goaltendingGraphic.endFill();

    return goaltendingGraphic;
}

function createTimer() {
    let timerStart = "0:00:00";
    timerDisplay = game.add.text(dimensions.screen.width / 2, 80, timerStart, { fill: "white" });
}

function update() {
    player1.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player1.body.moveLeft(400);
    }
    else if (cursors.right.isDown) {
        player1.body.moveRight(400);
    }

    if (cursors.up.isDown && isGrounded(player1)) {
        player1.body.velocity.y = -700;
    }
    else if (cursors.down.isDown) {
        player1.body.moveDown(400);
    }

    timeRemaining = timeRemaining + 1;
    timerDisplay.setText(timeRemaining / 100);
}

function isGrounded(player) {
    let isStill = player.body.velocity.y < 50 && player.body.velocity.y > -50;
    let jumpBoundary = dimensions.screen.height - (dimensions.slime.radius / 2) - dimensions.court.height;
    let isLow = player.position.y > jumpBoundary;

    return isLow && isStill;
}
