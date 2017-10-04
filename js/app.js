// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Randomly choose an enemy's starting position and row
    var startPosition = [-100,-200,-300];
    var startRow = [65,147,230];
    this.x = startPosition[Math.floor(Math.random()*startPosition.length)];
    this.y = startRow[Math.floor(Math.random()*startRow.length)];

    // Set a random speed between 1 and 5 for the enemy
    this.speed = Math.random()*5 + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 1010) {
      (this.x += this.speed) * dt;
    } else {
      this.x = -100;
      (this.x += this.speed) * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Load image for player
    this.sprite = 'images/char-horn-girl.png';
    this.x = 505;
    this.y = 404;
    this.score = 0;
    this.starsCollected = 0;
};

Player.prototype.update = function(dt) {
    if (this.y < 5) {
        this.reset();
        this.score++;
    }
};

// Method will bring Player back to starting position
Player.prototype.reset = function() {
    this.x = 505;
    this.y = 404;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) {
              this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
              this.y -= 80;
          }
            break;
        case 'right':
            if (this.x < 909) {
              this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 400) {
              this.y += 80;
            }
    }
};

// Check for collisions between the player and enemies
Player.prototype.checkCollisions = function(enemyArray) {
    for (var enemy = 0; enemy < enemyArray.length; enemy++) {
        if ((enemyArray[enemy].x + 98) > (this.x + 16) &&
            (enemyArray[enemy].x) < (this.x + 84) &&
            (enemyArray[enemy].y + 92) > (this.y + 10) &&
            (enemyArray[enemy].y + 26) < (this.y + 87)) {
                this.reset();
                this.score--;
                console.log('Collision detected!');
        }
    }
};

// New object class created for additional game play objective
var Stars = function(x) {
    this.sprite = 'images/Star.png';
    this.x = x;
    this.y = -3;
};

Stars.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to give player credit for each star 'collected'
Stars.prototype.collect = function(player) {
    if ((this.x + 95) > (player.x + 16) &&
        (this.x + 10) < (player.x + 84) &&
        (this.y + 84) > (player.y + 10) &&
        (this.y + 15) < (player.y + 87)) {
            this.y = -300;
            player.score++;
            player.starsCollected++;
            player.reset();
    }
};

// Function will alert user when all objectives
// have been achieved, and then reset game play
Stars.prototype.win = function(player) {
    if (player.starsCollected === allStars.length) {
        alert('Congratulations! You\'ve collected all the Stars!' +
            '\nPlayer score: ' + player.score +
            '\nGame Over.');
        player.reset();
        player.starsCollected = 0;
        player.score = 0;
        allStars.forEach(function(star) {
            star.y = -3;
        });
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var enemyFour = new Enemy();
var enemyFive = new Enemy();
var starOne = new Stars(101);
var starTwo = new Stars(303);
var starThree = new Stars(505);
var starFour = new Stars(707);
var starFive = new Stars(909);

var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive];
var allStars = [starOne, starTwo, starThree, starFour, starFive];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
