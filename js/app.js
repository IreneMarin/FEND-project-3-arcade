var currentLifes = 5;
var currentKeys = 0;
var hasBlueGem = true;
var hasGreenGem = false;
var hasOrangeGem = false;
var currentLevel = 1;

document.getElementById('numberLifes').innerHTML = currentLifes;
document.getElementById('numberKeys').innerHTML = currentKeys;
document.getElementById('numberLevel').innerHTML = currentLevel;
if (hasBlueGem) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-blue.png'>";
}
if (hasGreenGem) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-green.png'>";
}
if (hasOrangeGem) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-orange.png'>";
}

// Implement the House class, which is the objective
var House = function(x,y,sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png';
}
// Draw the House on the screen
House.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Implement the Nature class, which will be obstacles
var Nature = function(x,y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png'
}
// Draw the nature on the screen
Nature.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Implement the Items class, which will be different collective items
var Items = function(x,y,sprite) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png'
}
// Draw the items on the screen
Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Construct the house
var allWalls = [];
allWalls[0] = new House(202,45,'window-tall');
allWalls[1] = new House(303,45,'door-tall-closed');
allWalls[4] = new House(404,45,'window-tall');


var allRoofs = [];
allRoofs[3] = new House(202,-46,'roof-south-west');
allRoofs[4] = new House(303,-46,'roof-south');
allRoofs[5] = new House(404,-46,'roof-south-east');


var allNature = [];
allNature[0] = new Nature(101,295,'tree-ugly');
allNature[1] = new Nature(404,460,'rock');
allNature[2] = new Nature(505,215,'tree-ugly');
allNature[3] = new Nature(0,-25,'tree-short');
allNature[4] = new Nature(101,-25,'tree-short');
allNature[5]= new Nature(505,-25,'tree-short');
allNature[6]= new Nature(606,-25,'tree-short');

var key = new Items(505,120,'key-small');
var heart = new Items(0,464,'heart-small');


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
    if (this.x > 707) {
        this.x = Math.random() * -1000;
        // The speed is random again
        this.speed = Math.floor(Math.random() * 350 + 1);
        console.log(Math.random() * -1000);
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
    this.x = 303;
    this.y = 575;
    
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
            if (this.x < 606) {
                this.x += 101;
                break;
            }
        
        // down key moves player to the south
        case 'down':
            // we check to avoid player moving off-screen
            if (this.y < 575) {
                this.y += 83;
                break;
            }
    }
}

// reset method to reset the player's position and start again
Player.prototype.reset = function() {
    currentLifes = currentLifes - 1;
    document.getElementById('numberLifes').innerHTML = currentLifes;
    this.x = 303;
    this.y = 575;
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Create 10 enemies, 2 for each row, with a random initial location
for (var i = 0; i < 10; i++) {
    if (i % 5 === 0) {
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 146);   // row 1
    } else if (i % 5 === 1) {
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 229);   // row 2
    } else if (i % 5 === 2) {
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 312);   // row 3
    } else if (i % 5 === 3) {
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 395);   // row 4
    } else {
        var enemyRandom = new Enemy(-(Math.floor(Math.random() * 400 + 100)), 478);   // row 5
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
