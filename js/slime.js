createjs.Ticker.setFPS(FPS);
createjs.Ticker.addEventListener("tick", new_frame);

function init() {
    //setting the stage
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

    drawBackground();
    drawCourt();
    drawGoaltending();
    drawHalfcourt();
    drawBackboard();
    drawRim();
    drawBall();
    drawPlayer1();
    drawPlayer2();

    //anytime a key is pressed or release we need to check and set it
    document.addEventListener("keydown", setDownKey, false);
    document.addEventListener("keyup", setUpKey, false);
}

function new_frame() {
    move_slimes();
    move_ball();
    stage.update();
    createjs.Ticker.setFPS(document.getElementById('FPS').value);
}

function gameStart() {

}

function move_ball() {
    /*var i = (30 * screen_specs.height) / 1000;
    var j = (ballOldX * screen_specs.width) / 1000;
    var k = (4 * screen_specs.height) / 5 - (ballOldY * screen_specs.height) / 1000;
*/
    ballVY--;
    ball.y -= ballVY;
    ball.x += ballVX;

    if (!gameOver) {
        var l = (ball.x - player1.x);
        var i1 = (ball.y - player1.y);
        var j1 = l * l + i1 * i1;
        var k1 = ballVX - p1XV;
        var l1 = ballVY - p1YV;

        if (ball_collision(player1)) {
            var i2 = Math.sqrt(j1);
            var k2 = (l * k1 + i1 * l1) / i2;
            ball.x = player1.x + (l * 63) / i2;
            ball.y = player1.y - ((i1 * 125) / i2);
            if (k2 <= 0) {
                if (!fP2Sticky) {
                    ballVX += ((p1XV - (2 * l * k2) / i2) * 7) / 10;
                    ballVY += p1YV - (2 * i1 * k2) / i2;
                } else {
                    ballVX = 0;
                    ballVY = 0;
                }
                if (ballVX < -15) {
                    ballVX = -15;
                }
                if (ballVX > 15) {
                    ballVX = 15;
                }
                if (ballVY < -22) {
                    ballVY = -22;
                }
                if (ballVY > 22) {
                    ballVY = 22;
                }
            }
            fP2Touched = true;
            if (fhold2) {
                ballVX = -15;
                ballVY = 25;
            }
        }

        l = (ball.x - player2.x);
        i1 = (ball.y - player2.y);
        j1 = l * l + i1 * i1;
        k1 = ballVX - p2XV;
        l1 = ballVY - p2YV;

        // collision detection: player 2 and ball
        if (ball_collision(player2)) {
            var j2 = Math.sqrt(j1);
            var l2 = (l * k1 + i1 * l1) / j2;
            ball.x = player2.x + (l * 63) / j2;
            ball.y = player2.y - ((i1 * 125) / j2);
            if (l2 <= 0) {
                if (!fP2Sticky) {
                    ballVX += ((p2XV - (2 * l * l2) / j2) * 7) / 10;
                    ballVY += p2YV - (2 * i1 * l2) / j2;
                } else {
                    ballVX = 0;
                    ballVY = 0;
                }
                if (ballVX < -15) {
                    ballVX = -15;
                }
                if (ballVX > 15) {
                    ballVX = 15;
                }
                if (ballVY < -22) {
                    ballVY = -22;
                }
                if (ballVY > 22) {
                    ballVY = 22;
                }
            }
            fP2Touched = true;
            if (fhold2) {
                ballVX = -15;
                ballVY = 25;
            }
        }
        // readjust these for your court size, accounts for ball hitting wall
        if (ball.x < -ball_specs.radius) {
            ball.x = -ball_specs.radius;
            ballVX = -ballVX;
        }
        if (ball.x > (screen_specs.width - 2 * ball_specs.radius)) {
            ball.x = (screen_specs.width - 2 * ball_specs.radius);
            ballVX = -ballVX;
        }
        // hitting backboard?
        if (-ball.y >= backboard_specs.height && -ball.y <= backboard_specs.top) {
            if (ball.x <= backboard_specs.left) {
                ball.x = backboard_specs.left;
                ballVX = -ballVX;
            }
            if (ball.x >= 960) {
                ball.x = 960;
                ballVX = -ballVX;
            }
        }
        // checking if it goes through the hoop?
        if (-ball.y >= 252 && -ball.y <= 274) {
            if (ball.x <= 115 && ball.x >= 90) {
                if (ballOldX >= 115) {
                    ball.x = 115;
                    ballVX = -ballVX;
                } else
                if (ballOldX <= 90) {
                    ball.x = 90;
                    ballVX = -ballVX;
                }
                if (ballOldY >= 274) {
                    ball.y = -274;
                }
                if (ballOldY <= 252) {
                    ball.y = -252;
                }
                ballVY = -ballVY;
            }
            //checking for the other hoop
            if (ball.x <= 907 && ball.x >= 891) {
                if (ballOldX >= 907) {
                    ballOldX = 903;
                    ballVX = -ballVX;
                } else
                if (ballOldX <= 891) {
                    ballOldX = 891;
                    ballVX = -ballVX;
                }
                // will this even happen inside this outer loop, line 260
                if (ballOldY >= 274) {
                    ball.y = -274;
                }
                if (ballOldY <= 252) {
                    ball.y = -252;
                }
                ballVY = -ballVY;
            }
            if (ball.x <= 45) {
                if (ballOldY >= 274) {
                    ball.y = -274;
                }
                if (ballOldY <= 252) {
                    ball.y = -252;
                }
                ball.x = 45;
                ballVY = -ballVY;
                ballVX = -ballVX + 1;
            }
        }
        //checking if it's hitting the ground
        if (-ball.y < 12.5) {
            ball.y = -12.5;
            ballVY = (-ballVY * 7) / 10;
            ballVX = (ballVX * 7) / 10;
        }
    }
    /*j = ball.x;
    k = 4 / 5 - ball.y;
    */
    //figure out how this all shakes out with EaselJS

    //screen.setColor(Color.yellow);
    //screen.fillOval(j - i, k - i, i * 2, i * 2);
}

function ball_collision(player) {
    var x1 = ball.x;
    var y1 = ball.y;
    var radius1 = ball_specs.radius;
    var x2 = player.x;
    var y2 = player.y;
    var radius2 = slime_radius;

    console.log('ball.x = ' + x1);
    console.log('ball.y = ' + y1);
    console.log('slime.x = ' + x2);
    console.log('slime.y = ' + y2);
    console.log('ball.radius = ' + radius1);
    console.log('slime.radius = ' + radius2);
    if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < (radius1 + radius2)) {
        console.log("The 2 circles are colliding!");
        return true;
    }
    console.log('no collision');
    return false;
}

function move_slimes() {
    if (keys.a === true) {
        move_player(1, "left");
    } else if (keys.d === true) {
        move_player(1, "right");
    } else {
        p1XV = 0;
    }

    if (keys.w === true) {
        jump(1);
    }

    if (keys.left === true) {
        player_move(2, "left");
    } else if (keys.right === true) {
        player_move(2, "right");
    } else {
        p2XV = 0;
    }
    if (keys.up === true) {
        jump(2);
    }

    /*Player 1*/
    //move according to x velociy
    player1.x += p1XV;
    //if he's out of the screen, bring him back
    keep_slime_on_court(player1);
    //if he has vertical velocity, move him and decrease the velocity
    if (p1YV != 0) {
        p1YV = p1YV - GRAVITY;
        player1.y -= p1YV;
        if (player1.y > 0) {
            player1.y = 0;
            p1YV = 0;
        }
    }

    /*Player 2*/
    //move according to x velocity
    player2.x += p2XV;
    keep_slime_on_court(player2);
    //if he has vertical velocity, move him and decrease the velocity
    if (p2YV != 0) {
        p2YV = p2YV - GRAVITY;
        player2.y -= p2YV;
        //notice the greater than sign because the canvas is drawn from the top down
        if (player2.y > 0) {
            player2.y = 0;
            p2YV = 0;
        }
    }
}

function keep_slime_on_court(player) {
    if (player.x > (800 - 2 * slime_radius)) {
        player.x = (800 - 2 * slime_radius);
    }
    if (player.x < -slime_radius) {
        player.x = -slime_radius;
    }
}

function setRelativeValues() {
    court_specs.top = screen_specs.height - court_specs.height;
    goaltending.top = court_specs.top + 2;
    halfcourt_specs.left = (screen_specs.width / 2 - halfcourt_specs.width / 2);
    halfcourt_specs.top = goaltending.top;
    ball_specs.left = (screen_specs.width / 2 - ball_specs.radius);
    rim_specs.left = (backboard_specs.left + 7);
}

function move_player(player_num, direction) {
    if (player_num === 1) {
        p1XV = direction == "left" ? -SPEED : SPEED;
    }
    else if (player_num === 2) {
        p2XV = direction == "left" ? -SPEED : SPEED;
    }
}

function jump(player_num) {
    if (player_num === 1) {
        p1YV = player1.y === 0 ? JUMP_SPEED : p1YV;
    }
    else if (player_num === 2) {
        p2YV = player2.y === 0 ? JUMP_SPEED : p2YV;
    }
}

function setDownKey(event) {
    var key = event.keyCode;
    if (key === 87) { //key = w
        keys.w = true;
    } else if (key === 65) { //key = a
        keys.a = true;
    } else if (key === 68) { //key = d
        keys.d = true;
    } else if (key === 83) { //key = s
        keys.s = true;
    } else if (key === 38) { //key = up
        keys.up = true;
    } else if (key === 37) { //key = left
        keys.left = true;
    } else if (key === 39) { //key = right
        keys.right = true;
    } else if (key === 40) { //key = down
        keys.down = true;
    }
}

function setUpKey(event) {
    var key = event.keyCode;
    if (key === 87) { //key = w
        keys.w = false;
    } else if (key === 65) { //key = a
        keys.a = false;
    } else if (key === 68) { //key = d
        keys.d = false;
    } else if (key === 83) { //key = s
        keys.s = false;
    } else if (key === 38) { //key = up
        keys.up = false;
    } else if (key === 37) { //key = left
        keys.left = false;
    } else if (key === 39) { //key = right
        keys.right = false;
    } else if (key === 40) { //key = down
        keys.down = false;
    }
}