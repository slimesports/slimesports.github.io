function drawBackground() {
    background = new createjs.Shape();
    background.graphics.f(color.blue).r(0, 0, screen_specs.width, screen_specs.height);
    stage.addChild(background);
}

function drawCourt() {
    //draw the court on the bottom
    court = new createjs.Shape();
    court.graphics.f(color.grey).r(court_specs.left, court_specs.top, court_specs.width, court_specs.height);
    stage.addChild(court);
}

function drawGoaltending() {
    goaltendingArea = new createjs.Shape();
    goaltendingArea.graphics.f(color.white).r(goaltending.left, goaltending.top, goaltending.width, goaltending.height);
    stage.addChild(goaltendingArea);
}

function drawHalfcourt() {
    halfcourt = new createjs.Shape();
    halfcourt.graphics.f(color.white).r(halfcourt_specs.left, halfcourt_specs.top, halfcourt_specs.width, halfcourt_specs.height);
    stage.addChild(halfcourt);
}

function drawBackboard() {
    backboard = new createjs.Shape();
    backboard.graphics.f(color.white).r(backboard_specs.left, backboard_specs.top, backboard_specs.width, backboard_specs.height);
    stage.addChild(backboard);
}

function drawRim() {
    rim = new createjs.Shape();
    rim.graphics.f(color.orange).r(rim_specs.left, rim_specs.top, rim_specs.width, rim_specs.height);
    stage.addChild(rim);
}

function drawBall() {
    ball = new createjs.Shape();
    ball.graphics.f(color.yellow).dc(0, court_specs.top, ball_specs.radius);
    ball.x = ball_specs.left;
    ball.y = -(court_specs.top - ball_specs.top);
    stage.addChild(ball);
}

function drawPlayer1() {
    player1 = new createjs.Shape();
    player1.graphics.f(color.yellow).arc(0, court_specs.top, slime_radius, Math.PI, 0);
    player1.x = (320 - slime_radius);
    stage.addChild(player1);
}

function drawPlayer2() {
    player2 = new createjs.Shape();
    player2.graphics.f(color.orange).arc(0, court_specs.top, slime_radius, Math.PI, 0);
    player2.x = (screen_specs.width - 320 - slime_radius);
    stage.addChild(player2);
}