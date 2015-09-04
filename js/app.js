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
<<<<<<< HEAD
=======


/* Adding functionality: 
Player selection: allow the user to select the image for the player.
Score: you can implement a score for the game. It can increase each time the player reaches the water, and it can reset to 0 when collision occurs
Collectables: you can add gems to the game, allowing the player to collect them to make the game more interesting. */


/* Collission forum
https://discussions.udacity.com/t/trying-to-identify-collisions-but-how-do-i-compare-enemy-x-with-player-x/29930
https://discussions.udacity.com/t/sure-i-would-love-some-collisioncheck-help/29801
https://discussions.udacity.com/t/player-bug-collision-problem/15068
https://discussions.udacity.com/t/problems-with-checkcollisions-function/30228 */


/* Links del forum útils pels nous canvis:
https://discussions.udacity.com/t/bug-drawn-behind-gem-on-canvas/23201
https://discussions.udacity.com/t/adding-sprites-to-canvas-background/28880
https://discussions.udacity.com/t/project-3-add-scores/20978
https://discussions.udacity.com/t/creating-multiple-enemy-instances/29406
https://discussions.udacity.com/t/finite-state-machine-to-model-game-states/21955
https://discussions.udacity.com/t/start-end-the-game/21441
*/

/* Links d'altres llocs útils: 
https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub 
http://jlongster.com/Making-Sprite-based-Games-with-Canvas
https://docs.google.com/document/d/1sYjy4Swrppc6OreRy6zWQFKNnJhu1pJ9uikZPSD0HMc/pub
http://opengameart.org/
http://www.freesound.org/
http://gamedevelopment.tutsplus.com/tutorials/finite-state-machines-theory-and-implementation--gamedev-11867
http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
http://www.html5gamedevelopment.com/html5-game-tutorials/2013-06-5-part-html5-game-tutorial-galaxian-shooter
http://eloquentjavascript.net/04_data.html
http://hashrocket.com/blog/posts/using-tiled-and-canvas-to-render-game-screens
http://www.mapeditor.org/
*/

>>>>>>> origin/master
