
// JavaScript Snake example
// Author Jan Bodnar
// http://zetcode.com/javascript/snake/


// Auther Herman Ras
// Updated to work with node WSS Server & WSS Client
// updated aditional pickups

var CLIENT_ID = 0;

var canvas;
var ctx;

var head;
var apple;
var ball;
var beer;
var can;
var cookie;
var heart;
var bomb;
var score;

var dots;

var apple_x;
var apple_y;


var bonus = false;
var bonus_type = 'beer';
var bonus_img;
var bonus_x = -1;
var bonus_y = -1;
var bonus_time = 0;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;

var inGame = true;
var paused = true;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 300;
const C_WIDTH = 300;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);


function init() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    inGame = true;
    paused = true;
    score = 1;

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}

function loadImages() {

    head = new Image();
    head.src = 'img/head.png';

    ball = new Image();
    ball.src = 'img/dot.png';

    apple = new Image();
    apple.src = 'img/apple_small.png';

    beer = new Image();
    beer.src = 'img/beer_small.png';

    bonus_img = new Image();
    bonus_img.src = 'img/beer_small.png';

    can = new Image();
    can.src = 'img/can_small.png';

    cookie = new Image();
    cookie.src = 'img/cookie_small.png';

    heart = new Image();
    heart.src = 'img/heart_small.png';

    bomb = new Image();
    bomb.src = 'img/bomb_small.png';

}

function createSnake() {
    dots = 3;
    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkBonus() {
    if ((x[0] == bonus_x) && (y[0] == bonus_y)) {
        score = score + 3;
        bonus_x = -1;
        bonus_y = -1;
        
        bonus_time = 0;

        if (bonus_type === 'BEER'){
            //Send Server Drink Beer
            sendBonus(bonus_type)
        } 
        if (bonus_type === 'CAN'){
            //Send Server take a shot
            sendBonus(bonus_type)
        }
        if (bonus_type === 'COOCKIE'){
            //Send Server do a cookie
            sendBonus(bonus_type)
        }
        if (bonus_type === 'HEART'){
            //Send Server add harts
            sendBonus(bonus_type);
            if ( dots > 5){
                dots = dots - 3;
            }
        }
        if (bonus_type === 'BOMB'){
            //local cut tail
            if ( dots > 6){
                dots = Math.floor(dots/2);
            }   
        }
    }

    if (bonus_time <= 0) {
        bonus_x = -1;
        bonus_y = -1;
    }else{
        bonus_time--;
    }
}

function doDrawing() {

    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        if (bonus_x > 0 && bonus_y > 0) {
            ctx.drawImage(bonus_img, bonus_x, bonus_y);
        }

        for (var z = 0; z < dots; z++) {
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }
    } else {
        gameOver();
    }
    UpdateServer();
}

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Game over', C_WIDTH / 2, C_HEIGHT / 2);
}

function gamePause() {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText('Server Paused..', C_WIDTH / 2, C_HEIGHT / 2);
}

function showScore() {
    // clear scoreboard
    ctx.fillStyle = '#444444';
    ctx.fillRect(0, C_HEIGHT, C_WIDTH, C_HEIGHT + 10);

    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 18px serif';

    ctx.fillText("S" + CLIENT_ID + " SCORE=" + score, C_WIDTH / 2, C_HEIGHT + 11);
}

function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {
        dots++;
        score++;
        locateApple();
    }
}

function move() {
    for (var z = dots; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        x[0] += DOT_SIZE;
    }

    if (upDirection) {
        y[0] -= DOT_SIZE;
    }

    if (downDirection) {
        y[0] += DOT_SIZE;
    }
}

function checkCollision() {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
        inGame = false;
    }

    if (x[0] >= C_WIDTH) {
        inGame = false;
    }

    if (x[0] < 0) {
        inGame = false;
    }
}

function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}

function locateBonus() {
    if (bonus) {
        var r = Math.floor(Math.random() * MAX_RAND);
        bonus_x = r * DOT_SIZE;

        r = Math.floor(Math.random() * MAX_RAND);
        bonus_y = r * DOT_SIZE;

        r = Math.floor(Math.random() * 5);

        switch (r) {
            case 0:
                bonus_img = beer;
                bonus_type = 'BEER';
                break;
            case 1:
                bonus_img = can;
                bonus_type = 'CAN';
                break;
            case 2:
                bonus_img = cookie;
                bonus_type = 'COOKIE';
                break;
            case 3:
                bonus_img = heart;
                bonus_type = 'HEART';
                break;
            case 4:
                bonus_img = bomb;
                bonus_type = 'BOMB';
                break;
            default:
                bonus_img = beer;
                bonus_type = 'BEER';  
        }

        bonus = false;
        bonus_time = 50;        
    }
}

function gameCycle() {

    if (inGame) {
        checkApple();
        checkBonus();
        checkCollision();
        showScore();
        if (!paused) {
            locateBonus();
            move();
            doDrawing();
        } else {
            gamePause();
        }
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function (e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
};    
