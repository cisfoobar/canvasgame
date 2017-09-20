console.log('Dumb Game loaded!');

var canvas = document.getElementById('canvas'); // get canvas element
var ctx = canvas.getContext('2d');
var playerX = 0;
var playerY = 0;
var accelX = 0;
var accelY = 0;
const playerSize = 50;
const acceleration = 5;
const friction = 0.1;
const projectileSpeed = 5;

function init() {
    // this runs first
    canvas.width = document.body.clientWidth - 20;
    canvas.height = document.body.clientHeight - 20;
    ctx.fillStyle = 'green';
    ctx.fillRect(playerX, playerY, playerSize, playerSize);
    addListeners();
}

init();

var projectiles = [];

function CircleShot(x, y, clickX, clickY) {
    this.x = x + 25;
    this.y = y + 25;
    this.lifetime = 200;
    // var angle = Math.atan((this.y - clickY) / (this.x - clickX));
    // console.log(angle);
    // this.yVel = Math.sin(angle) * -1 * projectileSpeed;
    // this.xVel = Math.cos(angle) * -1 * projectileSpeed;
    var xDistance = this.x - clickX;
    var yDistance = this.y - clickY;
    // this.gradient = yDistance/xDistance;
    // this.yVel = this.gradient;
    // if (this.x < clickX) {
    //     this.xVel = 1;
    // } else {
    //     this.xVel = -1;
    //     this.yVel *= -1;
    // }

    // Initialize projectile speed
    this.xVel =
        xDistance *
        projectileSpeed /
        Math.sqrt(xDistance ** 2 + yDistance ** 2);
    this.yVel =
        yDistance *
        projectileSpeed /
        Math.sqrt(xDistance ** 2 + yDistance ** 2);
    this.render = function() {
        console.log(this.xVel);
        console.log(this.yVel);
        this.x -= this.xVel;
        this.y -= this.yVel;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.stroke();
        if (
            this.x < 0 ||
            this.y < 0 ||
            this.x > canvas.width ||
            this.y > canvas.height
        ) {
            this.lifetime = 0;
        }
    };
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < projectiles.length; i++) {
        if (projectiles[i].lifetime > 0) {
            projectiles[i].render();
        } else {
            projectiles.splice(i, 1);
        }
    }
    ctx.fillRect(playerX, playerY, playerSize, playerSize);
}

function addListeners() {
    addEventListener('keydown', function(event) {
        var keyCode = event.keyCode; // number
        if (keyCode == 87) {
            accelY -= acceleration;
        }
        if (keyCode == 65) {
            accelX -= acceleration;
        }
        if (keyCode == 83) {
            accelY += acceleration;
        }
        if (keyCode == 68) {
            accelX += acceleration;
        }
    }); // calls when keydown
    canvas.addEventListener('click', function(event) {
        projectiles.push(
            new CircleShot(playerX, playerY, event.clientX, event.clientY)
        );
    });
}

function gameLoop() {
    // render player
    render();
    // update game data
    playerX += accelX;
    playerY += accelY;
    if (accelX < 0) {
        accelX += friction;
    } else if (accelX > 0) {
        accelX -= friction;
    }
    if (accelY < 0) {
        accelY += friction;
    } else if (accelY > 0) {
        accelY -= friction;
    }

    if (playerX > canvas.width - 50) {
        accelX = -Math.abs(accelX);
    } else if (playerX < 0) {
        accelX = Math.abs(accelX);
    }
    if (playerY > canvas.height - 50) {
        accelY = -Math.abs(accelY);
    } else if (playerY < 0) {
        accelY = Math.abs(accelY);
    }
    if (Math.abs(accelX) < 0.1) {
        accelX = 0;
    }
    if (Math.abs(accelY) < 0.1) {
        accelY = 0;
    }
}

// ctx.fillStyle = 'green';
// ctx.fillRect(0, 0, 64, 64)

setInterval(gameLoop, 10);
