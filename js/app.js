'use strict';

/** ----------------- GLOBAL VARIABLES --------------------- */
/** We define here the variables that we will be using through app.js and engine.js
 *  for different things. They are used for the current stats (hearts, lifes, gems, game_over, etc).
 */

var HERO = 'char-horn-girl';    // choosen hero (horn-girl by default)
var DIFFICULTY = 1;             // choosen level of difficulty (normal by default)
var gameLost = false;           // boolean to know when we die
var gameWon = false;            // boolean to know when we finish
var currentLifes = 5;           // number of current lifes
var currentKeys = 0;            // number of current keys
var currentLevel = 0;           // level of the screen
var hasBlueGem = false;         // has picked the blue gem
var hasGreenGem = false;        // has picked the green gem
var previousX = 0;              // set previous X each time we update
var previousY = 0;              // set previous y each time we update
var startX = 0;                 // set starting player position for the level
var startY = 0;                 // set starting player position for the level
var nextLevel = true;           // if we can change level, this is true to enable 'enter' key

/** Put the variables on screen to appear in the menu html */
document.getElementById('numberLifes').innerHTML = currentLifes.toString();
document.getElementById('numberKeys').innerHTML = currentKeys.toString();
document.getElementById('numberLevel').innerHTML = currentLevel.toString();
if (hasBlueGem) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu/gem-blue.png'>";
}
if (hasGreenGem) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu/gem-green.png'>";
}

/** Initialize the 4 dialogs as hidden. They will ony appear at the end of each level */
document.getElementById('dialog1').hidden = true;
document.getElementById('dialog2').hidden = true;
document.getElementById('dialog3').hidden = true;
document.getElementById('dialog4').hidden = true;

/** Initialize the hero to the player's choosen, if clicked */
document.getElementById('boy').addEventListener('click', function(){HERO = 'char-boy';}, false);
document.getElementById('cat-girl').addEventListener('click', function(){HERO = 'char-cat-girl';}, false);
document.getElementById('horn-girl').addEventListener('click', function(){HERO = 'char-horn-girl';}, false);
document.getElementById('princess-girl').addEventListener('click', function(){HERO = 'char-princess-girl';}, false);

/** Initialize the difficulty to the player's choosen, if clicked */
document.getElementById('easy').addEventListener('click', function(){DIFFICULTY = 0;}, false);
document.getElementById('normal').addEventListener('click', function(){DIFFICULTY = 1;}, false);
document.getElementById('hard').addEventListener('click', function(){DIFFICULTY = 2;}, false);
document.getElementById('nightmare').addEventListener('click', function(){DIFFICULTY = 3;}, false);

/** Useful function to create random numbers */
var randomNumber = function(speedHigh, speedLow) {
    return Math.floor(Math.random() * (speedHigh - speedLow) + 1) + speedLow;
};
    

/** -------------------- OBSTACLES & ITEMS ------------------------- */

/** Implement the Items class, with 4 parameters: 
 *  position of the item, sprite to put the image, and the property "item".
 *  With "item" we will be able to differentiate the obstacles, 
 *  depending if they are: house, door, tree, rock, gem or chest. 
 *  This way, we only need to create 1 function for all the types of items.
 */
var Items = function (x, y, sprite, item) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png';
    this.item = item;
};

/** Draw the items on the screen */
Items.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** @todo find a better way to create the obstacles for each level (an external json?). This can't be efficient... */

var allObstacles = [];
var allItems = [];

/** Create function that will be called when changing level, to put all the obstacles of
 *  the next level in the canvas (house, door, trees, rocks, water, keys, lifes and chest)
 */
var itemsReset = function (level) {
    switch (level) {

        case 1:
            allObstacles = [
                // house
                new Items(303, 45, 'window-tall', 'house'),
                new Items(404, 60, 'door-tall-closed', 'door'),
                new Items(505, 45, 'window-tall', 'house'),
                new Items(303, -40, 'roof-south-west', 'house'),
                new Items(404, -40, 'roof-south', 'house'),
                new Items(505, -40, 'roof-south-east', 'house'),
                // row 1
                new Items(0, -25, 'tree-short', 'tree'),
                new Items(101, -25, 'tree-short', 'tree'),
                new Items(202, -25, 'tree-short', 'tree'),
                new Items(606, -25, 'tree-short', 'tree'),
                new Items(707, -25, 'tree-short', 'tree'),
                new Items(808, -25, 'tree-short', 'tree'),
                // row 3
                new Items(606, 141, 'tree-ugly', 'tree'),
                // row 4
                new Items(101, 224, 'tree-ugly', 'tree'),
                new Items(606, 224, 'tree-ugly', 'tree'),
                new Items(707, 224, 'rock', 'rock'),
                // row 5
                new Items(303, 307, 'tree-ugly', 'tree'),
                // row 7
                new Items(505, 470, 'rock', 'rock'),
            ];
            
            allItems = [
                new Items(707, 131, 'key', 'key'),
                new Items(101, 131, 'key', 'key'),
                new Items(0, 465, 'heart', 'life')
            ];
            
            break;

        case 2:
            allObstacles = [
                // house
                new Items(0, 45, 'wood-block', 'house'),
                new Items(101, 60, 'door-tall-closed', 'door'),
                new Items(202, 45, 'wood-block', 'house'),
                new Items(0, -40, 'roof-south-west', 'house'),
                new Items(101, -40, 'roof-south', 'house'),
                new Items(202, -40, 'roof-south-east', 'house'),
                // row 1
                new Items(303, -25, 'blanc', 'water'),
                new Items(404, -25, 'blanc', 'water'),
                new Items(505, -25, 'blanc', 'water'),
                new Items(606, -25, 'blanc', 'water'),
                new Items(707, -25, 'blanc', 'water'),
                new Items(808, -25, 'blanc', 'water'),
                // row 2
                new Items(303, 58, 'tree-ugly', 'tree'),
                // row 3
                new Items(404, 141, 'tree-tall', 'tree'),
                new Items(707, 141, 'tree-ugly', 'tree'),
                // row 4
                new Items(101, 224, 'tree-ugly', 'tree'),
                new Items(707, 224, 'tree-ugly', 'tree'),
                new Items(808, 224, 'tree-ugly', 'tree'),
                // row 5
                new Items(101, 307, 'tree-ugly', 'tree'),
                // row 6
                new Items(505, 390, 'rock', 'rock'),
                // row 7
                new Items(0, 470, 'rock', 'rock'),
                new Items(303, 470, 'tree-tall', 'tree'),
                // row 8
                new Items(303, 556, 'rock', 'rock'),
                new Items(404, 556, 'tree-tall', 'tree'),
                new Items(505, 556, 'tree-tall', 'tree')
            ];
            
            allItems = [
                new Items(808, 131, 'key', 'key'),
                new Items(0, 297, 'key', 'key'),
                new Items(606, 48, 'heart', 'life'),
                new Items(202, 465, 'chest-closed', 'chest-green'),
                new Items(202, 400, 'blanc', 'chest-lid')
            ];            

            break;

        case 3:
            allObstacles = [
                // house
                new Items(707, 224, 'window-tall', 'house'),
                new Items(808, 234, 'door-tall-closed', 'door'),
                new Items(707, 58, 'roof-north-west', 'house'),
                new Items(808, 58, 'roof-north-east', 'house'),
                new Items(707, 141, 'roof-south-west', 'house'),
                new Items(808, 141, 'roof-south-east', 'house'),
                // row 1
                new Items(101, -25, 'tree-tall', 'tree'),
                new Items(202, -25, 'tree-ugly', 'tree'),
                new Items(303, -25, 'tree-ugly', 'tree'),
                new Items(404, -25, 'tree-ugly', 'tree'),
                new Items(505, -25, 'rock', 'rock'),
                // row 2
                new Items(101, 58, 'tree-tall', 'tree'),
                new Items(202, 58, 'tree-tall', 'tree'),
                new Items(505, 58, 'tree-ugly', 'tree'),
                new Items(606, 58, 'tree-ugly', 'tree'),
                // row 3
                new Items(0, 141, 'rock', 'rock'),
                new Items(101, 141, 'rock', 'rock'),
                new Items(202, 141, 'tree-ugly', 'tree'),
                new Items(404, 141, 'rock', 'rock'),
                new Items(505, 141, 'tree-tall', 'tree'),
                new Items(606, 141, 'tree-tall', 'tree'),
                // row 4
                new Items(0, 224, 'blanc', 'water'),
                new Items(101, 224, 'blanc', 'water'),
                new Items(202, 224, 'tree-ugly', 'tree'),
                new Items(404, 224, 'tree-tall', 'tree'),
                new Items(505, 224, 'tree-tall', 'tree'),
                new Items(606, 224, 'tree-tall', 'tree'),
                // row 5
                new Items(0, 307, 'blanc', 'water'),
                new Items(101, 307, 'blanc', 'water'),
                new Items(404, 307, 'tree-tall', 'tree'),
                new Items(606, 307, 'tree-ugly', 'tree'),
                new Items(707, 307, 'tree-ugly', 'tree'),
                // row 6
                new Items(0, 390, 'blanc', 'water'),
                new Items(101, 390, 'blanc', 'water'),
                new Items(606, 390, 'tree-ugly', 'tree'),
                new Items(707, 390, 'tree-ugly', 'tree'),
                // row 7
                new Items(303, 470, 'tree-ugly', 'tree'),
                new Items(404, 470, 'tree-ugly', 'tree'),
                // row 8
                new Items(303, 556, 'tree-ugly', 'tree'),
                new Items(404, 556, 'tree-tall', 'tree'),
                new Items(606, 556, 'rock', 'rock'),
                new Items(707, 556, 'tree-tall', 'tree'),
                new Items(808, 556, 'tree-tall', 'tree')
            ];
            
            allItems = [
                new Items(505, 546, 'key', 'key'),
                new Items(808, -35, 'heart', 'life'),
                new Items(0, -35, 'chest-closed', 'chest-blue'),
                new Items(0, -100, 'blanc', 'chest-lid')
            ];

            break;

        case 4:
            allObstacles = [
                // house
                new Items(505, 470, 'window-tall', 'house'),
                new Items(606, 480, 'door-tall-closed', 'door'),
                new Items(707, 470, 'window-tall', 'house'),
                new Items(505, 307, 'roof-north-west', 'house'),
                new Items(606, 307, 'roof-north', 'house'),
                new Items(707, 307, 'roof-north-east', 'house'),
                new Items(505, 390, 'roof-south-west', 'house'),
                new Items(606, 390, 'roof-south', 'house'),
                new Items(707, 390, 'roof-south-east', 'house'),
                // row 1
                new Items(303, -25, 'blanc', 'water'),
                new Items(404, -25, 'blanc', 'water'),
                // row 2
                new Items(101, 83, 'blanc', 'water'),
                new Items(808, 58, 'rock', 'rock'),
                // row 3
                new Items(101, 166, 'blanc', 'water'),
                new Items(202, 166, 'blanc', 'water'),
                new Items(404, 166, 'blanc', 'water'),
                new Items(505, 166, 'blanc', 'water'),
                new Items(606, 166, 'blanc', 'water'),
                new Items(707, 166, 'blanc', 'water'),
                new Items(808, 141, 'rock', 'rock'),
                // row 4
                new Items(101, 249, 'blanc', 'water'),
                new Items(202, 249, 'blanc', 'water'),
                new Items(404, 249, 'blanc', 'water'),
                new Items(505, 249, 'blanc', 'water'),
                new Items(606, 249, 'blanc', 'water'),
                new Items(707, 249, 'blanc', 'water'),
                new Items(808, 249, 'blanc', 'water'),
                // row 5
                new Items(202, 307, 'tree-ugly', 'tree'),
                new Items(404, 307, 'blanc', 'water'),
                new Items(808, 307, 'blanc', 'water'),
                // row 6
                new Items(0, 390, 'rock', 'rock'),
                new Items(101, 390, 'rock', 'rock'),
                new Items(202, 390, 'tree-ugly', 'tree'),
                new Items(808, 415, 'blanc', 'water'),
                // row 7
                new Items(0, 498, 'blanc', 'water'),
                new Items(101, 498, 'blanc', 'water'),
                new Items(202, 498, 'blanc', 'water'),
                new Items(303, 498, 'blanc', 'water'),
                new Items(808, 498, 'blanc', 'water'),
                // row 8
                new Items(0, 581, 'blanc', 'water'),
                new Items(101, 581, 'blanc', 'water'),
                new Items(202, 581, 'blanc', 'water'),
                new Items(303, 581, 'blanc', 'water'),
                new Items(707, 581, 'blanc', 'water'),
                new Items(808, 581, 'blanc', 'water')
            ];
            
            allItems = [
                new Items(101, 297, 'key', 'key'),
                new Items(505, 214, 'heart', 'life')
            ];            

            break;
    }
};


/** ------------------ ENEMIES ---------------------- */

/** Implement the Enemiy class, to create the enemies our player must avoid
 *  We have the 2 parameters to initialize the enemy position
 *  and 3 parameters to create different types of movement for the bugs
 */
var Enemy = function (x, y, moveRight, startMove, endMove) {
    
    /** Setting the initial location and speed */
    this.x = x;
    this.y = y;
    this.startMove = startMove;
    this.endMove = endMove;
    this.moveRight = moveRight;
    
    /** Change speed of the enemies for each level of difficulty */
    switch (DIFFICULTY) {
        case 1:
            this.speed = (currentLevel === 1) ? randomNumber(450,0) : randomNumber(200,100);
            break;
            
        case 2:
            this.speed = (currentLevel === 1) ? randomNumber(550,0) : randomNumber(300,150);
            break;
            
        case 3:
            this.speed = (currentLevel === 1) ? randomNumber(550,0) : randomNumber(350,150);
            break;
            
        default:
            this.speed = (currentLevel === 1) ? randomNumber(250,0) : randomNumber(150,50);
            break;
    }

    /** Loading the image by setting this.sprite to the appropriate image */
    this.sprite = 'images/enemy-bug.png';
};

/** Update the enemy's position, required method for game
 *  Parameter: dt, a time delta between ticks
 */
Enemy.prototype.update = function (dt) {

    /** @todo We are using too many times the same if's, there has to be a better way.
     *  Maybe implement functions for each type of movement and call them here?
     */

    switch (currentLevel) {
        case 1:
            /** Updates the Enemy location, that goes from left to right */
            this.x += this.speed * dt;

            /** If the Enemy goes off screen, we reset the position to start again */
            if (this.x > 909) {
                this.x =  Math.random() * -1200;
            }
            break;

        case 2:
            /** Updates the Enemy location, that goes back and forth in the same interval of positions */
            if (this.moveRight) {
                this.x += this.speed * dt;
                this.sprite = 'images/enemy-bug.png';
                if (this.x > this.endMove) {
                    this.x -= this.speed * dt;
                    this.moveRight = false;
                }
            } else {
                /** Going back right to left, we change sprites */
                this.x -= this.speed * dt;
                this.sprite = 'images/enemy-bug-left.png';
                if (this.x < this.startMove) {
                    this.x += this.speed * dt;
                    this.moveRight = true;
                }
            }
            break;

        case 3:
            /** Updates the Enemy location, that goes back and forth in the same interval of positions */
            if (this.moveRight) {
                this.x += this.speed * dt;
                this.sprite = 'images/enemy-bug.png';
                if (this.x > this.endMove) {
                    this.x -= this.speed * dt;
                    this.moveRight = false;
                }
            } else {
                /** Going back right to left, we change sprites */
                this.x -= this.speed * dt;
                this.sprite = 'images/enemy-bug-left.png';
                if (this.x < this.startMove) {
                    this.x += this.speed * dt;
                    this.moveRight = true;
                }
            }
            break;

        case 4:
            if (this.endMove === 404) {
                /** Updates the Enemy location, that goes back and forth in the same interval of positions */
                if (this.moveRight) {
                    this.x += this.speed * dt;
                    this.sprite = 'images/enemy-bug.png';
                    if (this.x > this.endMove) {
                        this.x -= this.speed * dt;
                        this.moveRight = false;
                    }
                } else {
                    /** Going back right to left, we change sprites */
                    this.x -= this.speed * dt;
                    this.sprite = 'images/enemy-bug-left.png';
                    if (this.x < this.startMove) {
                        this.x += this.speed * dt;
                        this.moveRight = true;
                    }
                }
            } else {
                if (this.moveRight) {
                    /** Updates the Enemy location, that goes from left to right */
                    this.x += this.speed * dt;

                    /** If the Enemy goes off screen in the right, we reset the position to start again */
                    if (this.x > 909) {
                        this.x = Math.random() * -1200;
                    }
                } else {
                    /** Updates the Enemy location, that goes from right to left */
                    this.x -= this.speed * dt;
                    this.sprite = 'images/enemy-bug-left.png';

                    /** If the Enemy goes off screen in the left, we reset the position to start again */
                    if (this.x < -101) {
                        this.x = Math.floor(Math.random() * (1400 - 1000 + 1)) + 1000;
                    }
                }
            }
            break;
    }
};

/** Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Place all enemy objects in an array called allEnemies */
var allEnemies = [];
var enemyHeight = [146, 229, 312, 395, 478];  // only used in level 1

/** Create function to reset the enemies, that will be called when we change levels,
 *  where we draw the enemies of the next level on the canvas.
 *  For each level varys to try different types of movements.
 */
var enemyReset = function (level) {
    switch (level) {
        case 1:
            /** Here we create 10 enemies, 2 for each row, with a random initial left location and a random speed
             *  If we have nightmare difficulty, there are 3 for each row
             */
            var numberEnemies = (DIFFICULTY === 3) ? 15 : 10;
            for (var i = 0; i < numberEnemies; i++) {
                allEnemies.push(new Enemy(- randomNumber(500,100), enemyHeight[i % 5], true, 0, 808));
            }
            break;

        case 2:
            /** Here we put 7 enemies in exact positions, that will go back and forth
            /*  using the positions that we pass in the parameters as startMove and endMove
             */
            allEnemies.push(new Enemy(404, 63, true, 404, 808));
            if (DIFFICULTY === 3) {
                allEnemies.push(new Enemy(0, 146, true, 0, 606));
                allEnemies.push(new Enemy(0, 229, true, 0, 606));
            } else {
                allEnemies.push(new Enemy(0, 146, true, 0, 303));
                allEnemies.push(new Enemy(202, 229, true, 202, 606));
            }
            allEnemies.push(new Enemy(202, 312, true, 202, 808));
            allEnemies.push(new Enemy(0, 395, true, 0, 404));
            allEnemies.push(new Enemy(606, 395, true, 606, 808));
            allEnemies.push(new Enemy(404, 478, true, 404, 606));
            break;

        case 3:
            allEnemies.push(new Enemy(101, -20, true, 101, 808));
            if (DIFFICULTY === 3) {
                allEnemies.push(new Enemy(101, 63, true, 101, 606));
                allEnemies.push(new Enemy(0, 146, true, 0, 606));
                allEnemies.push(new Enemy(202, 574, true, 202, 505));
            } else {
                allEnemies.push(new Enemy(303, 63, true, 303, 606));
                allEnemies.push(new Enemy(303, 146, true, 303, 606));
            }
            allEnemies.push(new Enemy(202, 312, true, 202, 808));
            allEnemies.push(new Enemy(202, 395, true, 202, 808));
            allEnemies.push(new Enemy(202, 478, true, 202, 808));
            break;

        case 4:
            /** Here we combine: in rows with obstacles for the bugs (the house and the stone path), 
             * we create them as level 2, going back and forth.
             * In the other rows, we create as level 1, but with only 1 bug per row.
             * For nightmare difficulty, we put 2 bugs per row.
             * But in some row they go left to right, and in some they go right to left.
             */
            allEnemies.push(new Enemy(0, -20, true, 0, 404));       // back and forth
            allEnemies.push(new Enemy(808, 63, false, 808, 0));     // right
            allEnemies.push(new Enemy(0, 146, true, 0, 808));       // left
            allEnemies.push(new Enemy(808, 229, false, 808, 0));    // right
            allEnemies.push(new Enemy(0, 312, true, 0, 404));       // back and forth
            allEnemies.push(new Enemy(0, 395, true, 0, 404));       // back and forth
            allEnemies.push(new Enemy(0, 478, true, 0, 404));       // back and forth
            if (DIFFICULTY === 3) {
                allEnemies.push(new Enemy(808, 63, false, 808, 0));     // right
                allEnemies.push(new Enemy(0, 146, true, 0, 808));       // left
                allEnemies.push(new Enemy(808, 229, false, 808, 0));    // right
            }
            break;
    }
};


/** ------------------ PLAYER ------------------------- */

/** Implement the Player class */
var Player = function (x, y) {
    /** Setting the Player initial location */
    this.x = x;
    this.y = y;
    previousX = x;
    previousY = y;

    /** Loading the image by setting this.sprite */
    this.sprite = 'images/' + HERO + '.png';
};

/** Update the player's position and check for any collision */
Player.prototype.update = function () {
    this.x = this.x;
    this.y = this.y;
    checkCollisionEnemies();
    checkCollisionItems();
    checkCollisionObstacles();
};

/** Draw the player on the screen */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** handleInput method receives the user input with parameter 'allowedKeys'
 * The Player moves accordingly to that input
 */
Player.prototype.handleInput = function (allowedKeys) {
    
    //allowedKeys.preventDefault();
    
    /** If lifes = 0 it means game_over, so we can't move anymore */
    if (currentLifes > 0) {
        
        switch (allowedKeys) {
            case 'left':
                /** We check to avoid player moving off-screen and update previousX */
                if (this.x > 0) {
                    this.x -= 101;
                    previousX = this.x + 101;
                    console.log(this.x + ' ' + previousX);
                }
                break;

            case 'up':
                /** We check to avoid player moving off-screen and update previousY */
                if (this.y > 0) {
                    this.y -= 83;
                    previousY = this.y + 83;
                }
                break;

            case 'right':
                /** We check to avoid player moving off-screen and update previousX */
                if (this.x < 808) {
                    this.x += 101;
                    previousX = this.x - 101;
                }
                break;

            case 'down':
                /** We check to avoid player moving off-screen and update previousY */
                if (this.y < 556) {
                    this.y += 83;
                    previousY = this.y - 83;
                }
                break;

            case 'enter':
                if (nextLevel) {
                    /** Change to the next level pressing 'enter' key */
                    changeLevel(currentLevel + 1);
                    nextLevel = false;
                }
                break;
        }

    } else {
        /** The player has 0 lifes, it is game_over. So, if he/she presses Enter --> we reset the game */
        if (allowedKeys === 'enter') {
            changeLevel(1);
            gameLost = false;
            currentLifes = 5;
            document.getElementById('numberLifes').innerHTML = currentLifes.toString();
            currentKeys = 0;
            document.getElementById('numberKeys').innerHTML = currentKeys.toString();
        }
    }
};

/** Reset the player's position when it collides with a bug, and subtract a life */
Player.prototype.reset = function () {
    currentLifes = currentLifes - 1;
    document.getElementById('numberLifes').innerHTML = currentLifes.toString();

    /** If after the subtraction of life we have 0 lifes --> it is Game Over */
    if (currentLifes === 0) {
        player.gameOver();
    } else {
        this.x = startX;
        this.y = startY;
    }
};

/** Create function to reset the players position to the initial for each level
 * This function is called when we change level and are initializing the next level
 */
Player.prototype.changeLevel = function (level) {
    switch (level) {
        case 1:
            this.x = 404;
            this.y = 556;
            startX = 404;
            startY = 556;
            break;

        case 2:
            this.x = 808;
            this.y = 556;
            startX = 808;
            startY = 556;
            break;

        case 3:
            this.x = 0;
            this.y = 556;
            startX = 0;
            startY = 556;
            break;

        case 4:
            this.x = 606;
            this.y = -25;
            startX = 606;
            startY = -25;
            break;
    }
};

/** Stops de player when it tries to go over an obstacle (tree, rock, house, chest) */
/** @todo It doesn't stop properly, it is going one position back */
Player.prototype.stop = function () {
    //console.log('this.x: ' + this.x + ', this.y: ' + this.y + ', previousX: ' + previousX + ', previousY: ' + previousY);
    this.x = previousX;
    this.y = previousY;
};

/** When we have 0 lifes, it is game over */
Player.prototype.gameOver = function () {
    gameLost = true;
    allEnemies = [];
};

/** When we open the door in level 4, it is the final state of the game */
Player.prototype.gameFinal = function () {
    gameWon = true;
    allEnemies = [];
};

/** Place the player object in a variable called player */
var player = new Player(startX, startY);


/** ----------------- COLLISIONS & COLLECTIBLE ITEMS ---------------------- */

/** Calculate the central Rectangle to avoid the blank space */
var Rectangle = function (left, top) {
    this.left = left + 35;
    this.top = top + 20;
    this.right = this.left + 65;
    this.bottom = this.top + 62;
};

/** Check to see if the rectangles overlap */
var checkCollision = function (player, obstacle) {
    return !(
        player.left > obstacle.right ||
        player.right < obstacle.left ||
        player.top > obstacle.bottom ||
        player.bottom < obstacle.top
    );
};

/** Check collision with enemy bugs */
var checkCollisionEnemies = function () {
    var playerRectangle = new Rectangle(player.x, player.y);
    
    for (var i = 0, j = allEnemies.length; i < j; i++) {
        var enemyRectangle = new Rectangle(allEnemies[i].x, allEnemies[i].y);
        if (checkCollision(playerRectangle, enemyRectangle)) {
            /** If player collides with bug, reset position of player */
            player.reset();
        }
    }
};

/** Check collision with items */
var checkCollisionItems = function() {
    var playerRectangle = new Rectangle(player.x, player.y);
    
    for (var i = 0, j = allItems.length; i < j; i++) {
        var itemRectangle = new Rectangle(allItems[i].x, allItems[i].y);
        if (checkCollision(playerRectangle, itemRectangle)) {

            switch (allItems[i].item) {
                
                case 'key':
                    /** If it collides with a key --> pick up key, delete key from the array to make it dissapear from canvas */
                    currentKeys = currentKeys + 1;
                    document.getElementById('numberKeys').innerHTML = currentKeys.toString();
                    allItems.splice(i, 1);
                    break;
                    
                case 'life':
                    /** If it collides with a heart --> pick up heart, delete heart from the array to make it dissapear from canvas */
                    currentLifes = currentLifes + 1;
                    document.getElementById('numberLifes').innerHTML = currentLifes.toString();
                    allItems.splice(i, 1);
                    break;
                    
                case 'chest-green':
                    /** If it collides with closed chest, check for key */
                    if (currentKeys > 0) {
                        allItems[i].item = 'gem-green';
                        allItems[i].sprite = 'images/chest-open-green.png';
                        allItems[i + 1].item = 'chest-open';
                        allItems[i + 1].sprite = 'images/chest-lid.png';
                        currentKeys = currentKeys - 1;
                        document.getElementById('numberKeys').innerHTML = currentKeys.toString();
                        player.stop();

                    } else {
                        player.stop();
                    }
                    break;
                    
                case 'chest-blue':
                    /** If it collides with closed chest, check for key */
                    if (currentKeys > 0) {
                        allItems[i].item = 'gem-blue';
                        allItems[i].sprite = 'images/chest-open-blue.png';
                        allItems[i + 1].item = 'chest-open';
                        allItems[i + 1].sprite = 'images/chest-lid.png';
                        currentKeys = currentKeys - 1;
                        document.getElementById('numberKeys').innerHTML = currentKeys.toString();
                        player.stop();

                    } else {
                        player.stop();
                    }
                    break;
                    
                case 'gem-green':
                    /** If it collides with open chest with gem --> pick up gem */
                    hasGreenGem = true;
                    document.getElementById('hasGems').innerHTML += "<img src='images/menu/gem-green.png'>";
                    allItems[i].item = 'chest-open';
                    allItems[i].sprite = 'images/chest-open.png';
                    player.stop();
                    break;
                    
                case 'gem-blue':
                    /** If it collides with open chest with gem --> pick up gem */
                    hasBlueGem = true;
                    document.getElementById('hasGems').innerHTML += "<img src='images/menu/gem-blue.png'>";
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
};

/** Check collision with objects (tree, house, door and rock) */
var checkCollisionObstacles = function() {
    var playerRectangle = new Rectangle(player.x, player.y);
    
    for (var i = 0, j = allObstacles.length; i < j; i++) {
        var obstacleRectangle = new Rectangle(allObstacles[i].x, allObstacles[i].y);
        if (checkCollision(playerRectangle, obstacleRectangle)) {

            /** Player has found an obstacle that can't be crossed over */
            switch (allObstacles[i].item) {
                case 'tree':
                    /** If player has gem, it can go over the trees */
                    if (!hasGreenGem) {
                        player.stop();
                    }
                    break;

                case 'water':
                    /** If player has gem, it can go over the water */
                    if (!hasBlueGem) {
                        player.stop();
                    }
                    break;

                case 'rock':
                    player.stop();
                    break;

                case 'house':
                    player.stop();
                    break;

                case 'door':
                    if (currentKeys > 0) {
                        player.stop();
                                                
                        if (currentLevel === 4) {
                            /** If we have key and level 4, open door of final level */
                            allObstacles[i].item = 'door-final';
                            allObstacles[i].sprite = 'images/door-tall-final.png';
                            document.getElementById('dialog' + currentLevel).hidden = false;
                            player.gameFinal();
                            
                        } else {
                            /** If we have key, open door */
                            allObstacles[i].item = 'door-open';
                            allObstacles[i].sprite = 'images/door-tall-open.png';
                        }
                        currentKeys = currentKeys - 1;
                        document.getElementById('numberKeys').innerHTML = currentKeys.toString();

                    } else {
                        player.stop();
                    }
                    break;

                case 'door-open':
                    /** When we open door of level, it shows the message and it puts nextLevel to true,
                     * this way it enables key 'enter' to be used to go to next level.
                     */
                    player.sprite = 'images/' + HERO + '-sad.png';
                    document.getElementById('dialog' + currentLevel).hidden = false;
                    nextLevel = true;

                    setTimeout(function () {
                        player.sprite = 'images/' + HERO + '.png';
                        document.getElementById('dialog' + currentLevel).hidden = true;
                        allEnemies = [];
                        allItems = [];
                        allObstacles = [];
                        if (nextLevel) {
                            currentLevel = currentLevel + 1;
                        }
                        nextLevel = false;
                        document.getElementById('numberLevel').innerHTML = currentLevel.toString();
                        player.changeLevel(currentLevel);
                        itemsReset(currentLevel);
                        enemyReset(currentLevel);
                    }, 2000);

                    clearTimeout();

                    break;
            }
        }
    }
};

/** Function to change the level. It is called in handleInput, when player presses 'enter' key, if we have next_level true
 *  First we change player's sprite to the happy one
 *  Then we delete everything in allEnemies, allItems and allObstacles arrays (we don't want the things from the previous level to show)
 *  Then we change the level, and we put the new level onscreen
 *  After we call the 3 functions to reset the player's position, items and enemies position, passing the parameter of the next level
 *  Finally next_level goes to false, because we can't change level again if we don't play all the level.
 */
var changeLevel = function (level) {
    player.sprite = 'images/' + HERO + '.png';
    allEnemies = [];
    allItems = [];
    allObstacles = [];
    currentLevel = level;
    nextLevel = false;
    document.getElementById('numberLevel').innerHTML = level.toString();
    player.changeLevel(level);
    itemsReset(level);
    enemyReset(level);
};


/** ---------------------- KEYBOARD INPUT ---------------------------- */

/** This listens for key presses and sends the keys to your Player.handleInput() method */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});