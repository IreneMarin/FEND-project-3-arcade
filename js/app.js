// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here
    
    // Setting the Enemy initial location
    this.x = x;
    this.y = y;
    
    // Setting the speed, random and different for each bug.
    this.speed = Math.floor(Math.random() * 350 + 1);
    console.log(Math.floor(Math.random() * 350 +1));
    
    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers
    
    // Updates the Enemy location
    this.x += this.speed * dt;
    
    // Handles collision with the Player    
    if (
		player.x <= (this.x + 50)
		&& this.x <= (player.x + 50)
		&& player.y <= (this.y + 41)
		&& this.y <= (player.y + 41)
	) {
		player.reset();
	}
    
    // If the Enemy goes off screen, we reset the position to start again
    // This way there are always bugs coming the way
    if (this.x > 909) {
        this.x = Math.random() * -1200;
        // The speed is random again
        this.speed = Math.floor(Math.random() * 350 + 1);
        console.log(Math.random() * -1200);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Implement the Player class
var Player = function() {
    // Setting the Player initial location
    // at the bottom center of the screen
    this.x = 404;
    this.y = 660;
    
    // Loading the image by setting this.sprite
    this.sprite = 'images/char-boy.png';
}

// Update the player's position
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handleInput method receives the user input with parameter 'allowedKeys'
// 'allowedKeys' is the key that was press in the keyboard
// the Player moves accordingly to that input
Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys) {
        
        // left key moves player to the west
        case 'left':
            // we check to avoid player moving off-screen
            if (this.x > 0) {
                this.x -= 101;
                break;
            }
        
        // up key moves player to the north
        case 'up':
            //we check to avoid player moving off-screen
            if (this.y > 0) {
                this.y -= 83;
                break;
            } else { // if player is in the water, we reset the game
                player.reset();
            }
        
        // right key moves player to the east
        case 'right':
            // we check to avoid player moving off-screen
            if (this.x < 808) {
                this.x += 101;
                break;
            }
        
        // down key moves player to the south
        case 'down':
            // we check to avoid player moving off-screen
            if (this.y < 800) {
                this.y += 83;
                break;
            }
    }
}

// reset method to reset the player's position and start again
Player.prototype.reset = function() {
    this.x = 404;
    this.y = 415;
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Create 12 enemies, 2 for each row, with a random initial location
for (var i = 0; i < 12; i++) {
    if (i % 6 === 0) {  // row 1
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 63);
    } else if (i % 6 === 1) {  // row 2
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 146);
    } else if (i % 6 === 2) {  // row 3
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 229);
    } else if (i % 6 === 3) {  // row 4
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 312);
    } else if (i % 6 === 4) {  // row 5
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 395);
    } else {  // row 6
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 478);
    }
    allEnemies[i] = enemyRandom;
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
