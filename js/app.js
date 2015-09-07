/* ----------- GLOBAL VARIABLES --------------- */

var CURRENT_LIFES = 5;      // number of current lifes
var CURRENT_KEYS = 0;       // number of current keys
var HAS_BLUE_GEM = false;    // has picked the blue gem
var HAS_GREEN_GEM = false;   // has picked the green gem
var CURRENT_LEVEL = 0;      // level of the screen
var HERO = "char-horn-girl";// choosen hero
var DIFFICULTY = 0;         // choosen level of difficulty
var PREVIOUS_X = 0;         // set previous X each time we update
var PREVIOUS_Y = 0;         // set previous y each time we update

// Put the variables on screen in the menu
document.getElementById('numberLifes').innerHTML = CURRENT_LIFES.toString();
document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
document.getElementById('numberLevel').innerHTML = CURRENT_LEVEL.toString();
if (HAS_BLUE_GEM) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-blue.png'>";
}
if (HAS_GREEN_GEM) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-green.png'>";
}


/* -------------- OBSTACLES & ITEMS ---------------- */

// Implement the Items class, with the stuff to pick up
var Items = function(x,y,sprite,item) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png';
    this.item = item;
}
// Draw the items on the screen
Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Find another way to create the obstacles? More efficient? hola?
if (CURRENT_LEVEL === 2) {
    
    /* --------- LEVEL 2 CANVAS ------------ */
    
    // Build the house, put the trees and the rocks
    var allObstacles = [];
    allObstacles[0] = new Items(0, 45, 'wood-block', 'house');
    allObstacles[1] = new Items(101, 60, 'door-tall-closed', 'door');
    allObstacles[2] = new Items(202, 45, 'wood-block', 'house');
    allObstacles[3] = new Items(0, -40, 'roof-south-west', 'house');
    allObstacles[4] = new Items(101, -40, 'roof-south', 'house');
    allObstacles[5] = new Items(202, -40, 'roof-south-east', 'house');
    
    allObstacles[6] = new Items(303, -25, 'blanc', 'water');
    allObstacles[7] = new Items(404, -25, 'blanc', 'water');
    allObstacles[8] = new Items(505, -25, 'blanc', 'water');
    allObstacles[9] = new Items(606, -25, 'blanc', 'water');
    allObstacles[10] = new Items(707, -25, 'blanc', 'water');
    allObstacles[11] = new Items(808, -25, 'blanc', 'water');
    allObstacles[12] = new Items(303, 58, 'tree-ugly', 'tree');     // row 2
    allObstacles[13] = new Items(404, 141, 'tree-tall', 'tree');     // row 3
    allObstacles[14] = new Items(707, 141, 'tree-ugly', 'tree');
    allObstacles[15] = new Items(101, 224, 'tree-ugly', 'tree');     // row 4
    allObstacles[16] = new Items(707, 224, 'tree-ugly', 'tree');
    allObstacles[17] = new Items(808, 224, 'tree-ugly', 'tree');
    allObstacles[18] = new Items(101, 307, 'tree-ugly', 'tree');    // row 5
    allObstacles[19] = new Items(505, 390, 'rock', 'rock');         // row 6    
    allObstacles[20] = new Items(303, 470, 'tree-tall', 'tree');    // row 7
    allObstacles[21] = new Items(0, 470, 'rock', 'rock');
    allObstacles[22] = new Items(303, 556, 'rock', 'rock');         // row 8
    allObstacles[23] = new Items(404, 556, 'tree-tall', 'tree');
    allObstacles[24] = new Items(505, 556, 'tree-tall', 'tree');
    
    // Create the items
    var allItems = [];
    allItems[0] = new Items(808, 131, 'key', 'key');
    allItems[1] = new Items(0, 297, 'key', 'key');
    allItems[2] = new Items(606, 48, 'heart', 'life');
    allItems[3] = new Items(202, 465, 'chest-closed', 'chest-green');
    allItems[4] = new Items(202, 400, 'blanc', 'chest-lid');
    
    

} else if (CURRENT_LEVEL === 3) {
    
    // això no pot ser eficient... 
    
    /* --------- LEVEL 3 CANVAS ------------ */
    
    // Build the house, put the trees and the rocks
    var allObstacles = [];
    allObstacles[0] = new Items(707, 224, 'window-tall', 'house');
    allObstacles[1] = new Items(808, 234, 'door-tall-closed', 'door');
    allObstacles[2] = new Items(707, 58, 'roof-north-west', 'house');
    allObstacles[3] = new Items(808, 58, 'roof-north-east', 'house');
    allObstacles[4] = new Items(707, 141, 'roof-south-west', 'house');
    allObstacles[5] = new Items(808, 141, 'roof-south-east', 'house');
    
    // row 1
    allObstacles[6] = new Items(101, -25, 'tree-tall', 'tree');
    allObstacles[7] = new Items(202, -25, 'tree-ugly', 'tree');
    allObstacles[8] = new Items(303, -25, 'tree-ugly', 'tree');
    allObstacles[9] = new Items(404, -25, 'tree-ugly', 'tree');
    allObstacles[10] = new Items(505, -25, 'rock', 'rock');
    
    // row 2
    allObstacles[11] = new Items(101, 58, 'tree-tall', 'tree');
    allObstacles[12] = new Items(202, 58, 'tree-tall', 'tree');
    allObstacles[13] = new Items(505, 58, 'tree-ugly', 'tree');
    allObstacles[14] = new Items(606, 58, 'tree-ugly', 'tree');
    
    
    // row 3
    allObstacles[15] = new Items(0, 141, 'rock', 'rock');
    allObstacles[16] = new Items(101, 141, 'rock', 'rock');    
    allObstacles[17] = new Items(202, 141, 'tree-ugly', 'tree');
    allObstacles[18] = new Items(404, 141, 'rock', 'rock');
    allObstacles[19] = new Items(505, 141, 'tree-tall', 'tree');
    allObstacles[20] = new Items(606, 141, 'tree-tall', 'tree');
    
    // row 4
    allObstacles[21] = new Items(0, 249, 'water', 'water');
    allObstacles[22] = new Items(101, 249, 'water', 'water');    
    allObstacles[23] = new Items(202, 224, 'tree-ugly', 'tree');
    allObstacles[24] = new Items(404, 224, 'tree-tall', 'tree');
    allObstacles[25] = new Items(505, 224, 'tree-tall', 'tree');
    allObstacles[26] = new Items(606, 224, 'tree-tall', 'tree');
   
    // row 5
    allObstacles[27] = new Items(0, 332, 'water', 'water');
    allObstacles[28] = new Items(101, 332, 'water', 'water');    
    allObstacles[29] = new Items(404, 307, 'tree-tall', 'tree');
    allObstacles[30] = new Items(606, 307, 'tree-ugly', 'tree');
    allObstacles[31] = new Items(707, 307, 'tree-ugly', 'tree');
    
    // row 6
    allObstacles[32] = new Items(0, 415, 'water', 'water');
    allObstacles[33] = new Items(101, 415, 'water', 'water');    
    allObstacles[34] = new Items(606, 390, 'tree-ugly', 'tree');
    allObstacles[35] = new Items(707, 390, 'tree-ugly', 'tree');
    
    // row 7
    allObstacles[36] = new Items(303, 470, 'tree-ugly', 'tree');
    allObstacles[37] = new Items(404, 470, 'tree-ugly', 'tree');
    
    // row 8
    allObstacles[38] = new Items(303, 556, 'tree-ugly', 'tree');
    allObstacles[39] = new Items(404, 556, 'tree-tall', 'tree');
    allObstacles[40] = new Items(606, 556, 'rock', 'rock');
    allObstacles[41] = new Items(707, 556, 'tree-tall', 'tree');
    allObstacles[42] = new Items(808, 556, 'tree-tall', 'tree');
    
    // Create the items
    var allItems = [];
    allItems[0] = new Items(505, 546, 'key', 'key');
    allItems[1] = new Items(808, -35, 'heart', 'life');
    allItems[2] = new Items(0, -35, 'chest-closed', 'chest-blue');
    allItems[3] = new Items(0, -100, 'blanc', 'chest-lid');
    
} else if (CURRENT_LEVEL === 4) {
    
    /* --------- LEVEL 4 CANVAS ------------ */
    
    // Build the house, put the trees and the rocks
    var allObstacles = [];
    allObstacles[0] = new Items(505, 470, 'window-tall', 'house');
    allObstacles[1] = new Items(606, 480, 'door-tall-closed', 'door');
    allObstacles[2] = new Items(707, 470, 'window-tall', 'house');
    allObstacles[3] = new Items(505, 307, 'roof-north-west', 'house');
    allObstacles[4] = new Items(606, 307, 'roof-north', 'house');
    allObstacles[5] = new Items(707, 307, 'roof-north-east', 'house');
    allObstacles[6] = new Items(505, 390, 'roof-south-west', 'house');
    allObstacles[7] = new Items(606, 390, 'roof-south', 'house');
    allObstacles[8] = new Items(707, 390, 'roof-south-east', 'house');
    
    // row 1
    allObstacles[9] = new Items(303, 0, 'blanc', 'water');
    allObstacles[10] = new Items(404, 0, 'blanc', 'water');
    
    // row 2
    allObstacles[11] = new Items(101, 83, 'blanc', 'water');
    allObstacles[12] = new Items(808, 58, 'rock', 'rock');
    
    // row 3
    allObstacles[13] = new Items(101, 166, 'blanc', 'water');
    allObstacles[14] = new Items(202, 166, 'blanc', 'water');
    allObstacles[15] = new Items(404, 166, 'blanc', 'water');
    allObstacles[16] = new Items(505, 166, 'blanc', 'water');
    allObstacles[17] = new Items(606, 166, 'blanc', 'water');
    allObstacles[18] = new Items(707, 166, 'blanc', 'water');
    allObstacles[19] = new Items(808, 141, 'rock', 'rock');
    
    // row 4
    allObstacles[20] = new Items(101, 249, 'blanc', 'water');
    allObstacles[21] = new Items(202, 249, 'blanc', 'water');
    allObstacles[22] = new Items(404, 249, 'blanc', 'water');
    allObstacles[23] = new Items(505, 249, 'blanc', 'water');
    allObstacles[24] = new Items(606, 249, 'blanc', 'water');
    allObstacles[25] = new Items(707, 249, 'blanc', 'water');
    allObstacles[26] = new Items(808, 249, 'blanc', 'water');
    
    // row 5
    allObstacles[27] = new Items(202, 307, 'tree-ugly', 'tree');
    allObstacles[28] = new Items(404, 332, 'blanc', 'water');
    allObstacles[29] = new Items(808, 332, 'blanc', 'water');
    
    // row 6
    allObstacles[30] = new Items(0, 390, 'rock', 'rock');
    allObstacles[31] = new Items(101, 390, 'rock', 'rock');
    allObstacles[32] = new Items(202, 390, 'tree-ugly', 'tree');
    allObstacles[33] = new Items(808, 415, 'blanc', 'water');
    
    // row 7
    allObstacles[34] = new Items(0, 498, 'blanc', 'water');
    allObstacles[35] = new Items(101, 498, 'blanc', 'water');
    allObstacles[36] = new Items(202, 498, 'blanc', 'water');
    allObstacles[37] = new Items(303, 498, 'blanc', 'water');
    allObstacles[38] = new Items(808, 498, 'blanc', 'water');
    
    // row 8
    allObstacles[39] = new Items(0, 581, 'blanc', 'water');
    allObstacles[40] = new Items(101, 581, 'blanc', 'water');
    allObstacles[41] = new Items(202, 581, 'blanc', 'water');
    allObstacles[42] = new Items(303, 581, 'blanc', 'water');
    allObstacles[43] = new Items(707, 581, 'blanc', 'water');
    allObstacles[44] = new Items(808, 581, 'blanc', 'water');
    
    // Create the items
    var allItems = [];
    allItems[0] = new Items(101, 297, 'key', 'key');
    allItems[1] = new Items(505, 214, 'heart', 'life');
    
} else {
    
    /* --------- LEVEL 1 CANVAS ------------ */
    
    // Build the house, put the trees and the rocks
    var allObstacles = [];
    allObstacles[0] = new Items(303, 45, 'window-tall', 'house');
    allObstacles[1] = new Items(404, 60, 'door-tall-closed', 'door');
    allObstacles[2] = new Items(505, 45, 'window-tall', 'house');
    allObstacles[3] = new Items(303, -40, 'roof-south-west', 'house');
    allObstacles[4] = new Items(404, -40, 'roof-south', 'house');
    allObstacles[5] = new Items(505, -40, 'roof-south-east', 'house');
    
    allObstacles[6] = new Items(0, -25, 'tree-short', 'tree');         // row 1
    allObstacles[7] = new Items(101, -25, 'tree-short', 'tree');
    allObstacles[8] = new Items(202, -25, 'tree-short', 'tree');
    allObstacles[9] = new Items(606, -25, 'tree-short', 'tree');
    allObstacles[10] = new Items(707, -25, 'tree-short', 'tree');
    allObstacles[11] = new Items(808, -25, 'tree-short', 'tree');
    allObstacles[12] = new Items(606, 141, 'tree-ugly', 'tree');         // row 3
    allObstacles[13] = new Items(101, 224, 'tree-ugly', 'tree');         // row 4
    allObstacles[14] = new Items(606, 224, 'tree-ugly', 'tree');
    allObstacles[15] = new Items(707, 224, 'rock', 'rock');
    allObstacles[16] = new Items(303, 307, 'tree-ugly', 'tree');         // row 5
    allObstacles[17] = new Items(505, 470, 'rock', 'rock');             // row 7
        
    // Create the items
    var allItems = [];
    allItems[0] = new Items(707, 131, 'key', 'key');
    allItems[1] = new Items(101, 131, 'key', 'key');
    allItems[2] = new Items(0, 465, 'heart', 'life');
    
}


/* -------------- ENEMY ---------------- */

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Setting the Enemy initial location
    this.x = x;
    this.y = y;
    
    // Setting the speed, random and different for each bug.
    this.speed = Math.floor(Math.random() * 450 + 1);
    //console.log(Math.floor(Math.random() * 450 +1));
    
    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Updates the Enemy location
    this.x += this.speed * dt;
    
    // If the Enemy goes off screen, we reset the position to start again
    if (this.x > 909) {
        this.x = Math.random() * -1200;        
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyHeight = [146,229,312,395,478];
// Create 10 enemies, 2 for each row, with a random initial location
for (var i = 0; i < 10; i++) {
    //allEnemies.push(new Enemy(-(Math.floor(Math.random() * 400 + 100)), enemyHeight[i % 5]));
}


/* -------------- PLAYER ---------------- */

// Implement the Player class
var Player = function(x,y) {
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    PREVIOUS_X = x;
    PREVIOUS_Y = y;
           
    // Loading the image by setting this.sprite
    this.sprite = 'images/' + HERO + '.png';
}

// Update the player's position
Player.prototype.update = function() {   
    this.x = this.x;
    this.y = this.y;
    //console.log("previous: " + PREVIOUS_X + "," + PREVIOUS_Y + "; this: " + this.x + "," + this.y)
    checkCollisions(this.x, this.y);
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handleInput method receives the user input with parameter 'allowedKeys'
// The Player moves accordingly to that input
Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys) {
        
        // left key moves player to the west
        case 'left':
            // we check to avoid player moving off-screen and update previous_x
            if (this.x > 0) {
                PREVIOUS_X = this.x;
                this.x -= 101;
                break;
            }
        
        // up key moves player to the north
        case 'up':
            //we check to avoid player moving off-screen and update previous_y
            if (this.y > 0) {
                PREVIOUS_Y = this.y;
                this.y -= 83;
                break;
            }
        
        // right key moves player to the east
        case 'right':
            // we check to avoid player moving off-screen and update previous_x
            if (this.x < 808) {
                PREVIOUS_X = this.x;
                this.x += 101;
                break;
            }
        
        // down key moves player to the south
        case 'down':
            // we check to avoid player moving off-screen and update previous_y
            if (this.y < 556) {
                PREVIOUS_Y = this.y;
                this.y += 83;
                break;
            }
            
        case 'enter':
            CURRENT_LEVEL = CURRENT_LEVEL + 1;
            break;
    }
}

// Reset the player's position when it collides with a bug
Player.prototype.reset = function() {
    CURRENT_LIFES = CURRENT_LIFES - 1;
    document.getElementById('numberLifes').innerHTML = CURRENT_LIFES.toString();
    if (CURRENT_LEVEL === 2) {  // I should put this in variables... 
        this.x = 808;
        this.y = 556;
    } else if (CURRENT_LEVEL === 3 ) {
        this.x = 0;
        this.y = 556;
    } else if (CURRENT_LEVEL === 4 ) {
        this.x = 606;
        this.y = -25;
    } else {
        this.x = 404;
        this.y = 556;
    }    
}

Player.prototype.stop = function() {
    this.x = PREVIOUS_X;
    this.y = PREVIOUS_Y;
}

// Place the player object in a variable called player
var player;
if (CURRENT_LEVEL === 2) {  // put this in variables...
    player = new Player(808,556);
} else if (CURRENT_LEVEL === 3 ) {
    player = new Player(0,556);
} else if (CURRENT_LEVEL === 4 ) {
    player = new Player(606,-25);
} else {
    player = new Player(404,556);
}


/* ------------ COLLISIONS & ITEMS ------------ */

// Function to check if the player collides with a bug or an item
var checkCollisions = function(playerX, playerY) {
    
    // Calculate the central Rectangle to avoid the blank space
    var Rectangle = function (left, top) {
	   this.left = left + 35;
	   this.top = top + 20;
	   this.right = this.left + 65;
	   this.bottom = this.top + 62;
    };
    
    // Check to see if the rectangles overlap
    function checkCollision(player, obstacle) {
	   return !(player.left > obstacle.right || player.right < obstacle.left || player.top > obstacle.bottom || player.bottom < obstacle.top);
    };
    
    var playerRectangle = new Rectangle(player.x, player.y);
    
    // Check collision with enemy bugs, to reset position
    for (var i = 0; i < allEnemies.length; i++) {
        var enemyRectangle = new Rectangle(allEnemies[i].x, allEnemies[i].y);
        if (checkCollision(playerRectangle, enemyRectangle)) {
                       
            player.reset();            
        }
    }
    
    // Check collision with items, to pick it up
    for (var i = 0; i < allItems.length; i++) {
        var itemRectangle = new Rectangle(allItems[i].x, allItems[i].y);
        if (checkCollision(playerRectangle, itemRectangle)) {
                       
            switch(allItems[i].item) {
                case 'key':
                    CURRENT_KEYS = CURRENT_KEYS + 1;
                    document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
                    allItems.splice(i,1);
                    break;
                
                case 'life':
                    CURRENT_LIFES = CURRENT_LIFES + 1;
                    document.getElementById('numberLifes').innerHTML = CURRENT_LIFES.toString();
                    allItems.splice(i,1);
                    break;
                
                case 'chest-green':
                    if (CURRENT_KEYS > 0) {                        
                        // opens chest
                        allItems[i].item = 'gem-green';
                        allItems[i].sprite = 'images/chest-open-green.png';
                        allItems[i + 1].item = 'chest-open';
                        allItems[i + 1].sprite = 'images/chest-lid.png';
                        player.stop();
                        break;
                        
                    } else {
                        player.stop();    
                        break;
                    }
                    
               case 'chest-blue':
                    if (CURRENT_KEYS > 0) {
                        // opens chest
                        allItems[i].item = 'gem-blue';
                        allItems[i].sprite = 'images/chest-open-blue.png';
                        allItems[i + 1].item = 'chest-open';
                        allItems[i + 1].sprite = 'images/chest-lid.png';
                        player.stop();
                        break;
                        
                    } else {
                        player.stop();    
                        break;
                    }
               
               case 'gem-green':
                    HAS_GREEN_GEM = true;
                    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-green.png'>";
                    allItems[i].item = 'chest-open';
                    allItems[i].sprite = 'images/chest-open.png';
                    player.stop();
                    break;
                    
               case 'gem-blue':
                    HAS_BLUE_GEM = true;
                    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-blue.png'>";
                    allItems[i].item = 'chest-open';
                    allItems[i].sprite = 'images/chest-open.png';
                    player.stop();
                    break;
               
               case 'chest-lid':
                    break;
                    
               case 'chest-open':
                    break;
            }             
        }
    }
    
    // Check collision with objects (trees, house, doors, and rocks)
    for (var i = 0; i < allObstacles.length; i++) {
        var obstacleRectangle = new Rectangle(allObstacles[i].x, allObstacles[i].y);
        if (checkCollision(playerRectangle, obstacleRectangle)) {
            
            //console.log(allObstacles[i].item + ": " + allObstacles[i].x + "," + allObstacles[i].y)
            
            // Player has found an obstacle that can't be crossed over
            switch(allObstacles[i].item) {
                case 'tree':
                    if (HAS_GREEN_GEM === false) {
                        player.stop();    
                        break;
                    }
                
                case 'water':
                    if (HAS_BLUE_GEM === false) {
                        player.stop();    
                        break;
                    }
                
                case 'rock':
                    player.stop();                    
                    break;
                    
                case 'house':                    
                    player.stop();                    
                    break;
                    
                case 'door':
                    if (CURRENT_KEYS > 0) {
                        player.stop();
                        // opens door
                        allObstacles[i].item = 'door-open';
                        allObstacles[i].sprite = 'images/door-tall-open.png';
                        break;
                        
                    } else {
                        player.stop();    
                        break;
                    }
                    
                case 'door-open':
                    player.sprite = 'images/' + HERO + '-sad.png';
                    // change level!
                    //CURRENT_LEVEL = CURRENT_LEVEL + 1;
                    break;
            }            
        }
    }   
    
}


/* ---------------- KEYBOARD INPUT --------------- */ 

// This listens for key presses and sends the keys to your Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

