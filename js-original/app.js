// Enemies our player must avoid
// Això és un objecte. Després l'utilitzarem per crear tantes variables d'enemic com vulguem :D
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // Inicialitzem l'enemic a una x i una y que li passarem com a paràmetres per la funció
    this.x = x;
    this.y = y;
    // Fem que la velocitat sigui diferent per cada un de forma aleatòria. Com la calculem??
    this.speed = Math.floor(Math.random() * 450 + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// això és una classe, i per tant va amb majúscules
var Player = function() {
    // 0,0 és a dalt a l'esquerra de tot
    this.x = 0;
    this.y = 0;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyInput) {
    switch(keyInput) {
        case 'up':
            if(this.y < 10) {
                return null;
            }
            else {
                this.y -= 83; 
            }
            break;
        case 'down':
            if(this.y > 400) {
                return null;
            }
            else {
                this.y += 83; 
            }
            break;
        case 'left':
            if(this.x < 100) {
                return null;
            }
            else {
                this.x -= 101; 
            }
            break;
        case 'right':
            if(this.x > 400) {
                return null;
            }
            else {
                this.x += 101;
            }
            break;
    }
}



/*
Create one player instance from Player Class. (You will see the game scenes get initialised)
Create multiple enemy instance from Enemy Class.
Fill in default enemy instance location info.
Fill in update enemy instance moving function.
Create player input handle function.
Create function to detect collision.
*/


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy_1 = new Enemy(-200, 63);
var enemy_2 = new Enemy(-350, 145);
var enemy_3 = new Enemy(-96, 228);
var enemy_4 = new Enemy(-96, 63);
var enemy_5 = new Enemy(-150, 145);
var enemy_6 = new Enemy(-450, 228);
var allEnemies = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5, enemy_6];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
