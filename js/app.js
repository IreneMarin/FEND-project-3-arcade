// Enemies our player must avoid

// Això és una classe en OOP
// Després l'utilitzarem per crear tantes variables d'enemic com vulguem :D
var Enemy = function(x, y) {
    // var Enemy = function(x, y, speed) --> així calculem nivells? idea!
    // Variables applied to each of our instances go here, we've provided one for you to get started
    
    // Inicialitzem l'enemic a una x i una y que li passarem com a paràmetres per la funció
    // Setting the Enemy initial location
    this.x = x;
    this.y = y;
    
    // If you assign a speed to each bug in your Enemy definition when you define this.x and
    // this.y you can set a different speed for each bug at the moment it is defined:
    // this.speed = Math.floor(Math.random() * 450 + 1); --> Susan
       
    // Math.random(); // A random number between 0 and 1.
    // Math.floor(Math.random() * X + 1); // Returns a random number between 1 and X
    
     // Fem que la velocitat sigui diferent per cada un de forma aleatòria, seguint el consell de la Susan, yay
     // Setting the Enemy speed
     //450 és molt ràpid... però ara hi ha alguns que es queden clavats?
    this.speed = Math.floor(Math.random() * 350 + 1);
    console.log(Math.floor(Math.random() * 350 +1));
    
    // però i si volem posar-hi nivells? i fer que cada nivell sigui més xungo?
    // aleshores no hauriem de posar la velocitat random, no??
    
    // Aquí fiquem la imatge de l'enemic, utilitzant el "sprite" --> què és?
    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks --> està creat al engine
// Això és una subclasse del Enemy
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    
    // Afegim la posició multiplicant la dt per la velocitat. Què és this.speed?
    // Updates the Enemy location
    // In the Enemy update function, you can move the enemy along a little bit --> Susan
    this.x += this.speed * dt;
    // And if you want them to move a little faster you can add something to the calculation:
    // this.x += (this.speed + 100) * dt; --> Susan
    
    // Handles collision with the Player
    
    // si se'n va de la pantalla, torna a començar?
    if (this.x > 505) {
       // fem que torni a començar a les quimbambes a l'esquerra
       // fem que la velocitat tb sigui random :D
        this.x = Math.random() * -600;
        this.speed = Math.floor(Math.random() * 350 + 1);
        console.log(Math.random() * -600);
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
// Això és una classe, i per tant va amb majúscules. Igual que el Enemy
// Implement the Player class
// The Player function, which initiates the Player by
var Player = function() {
    // 0,0 és a dalt a l'esquerra de tot
    // Setting the Player initial location
    // aquest és el punt mig a sota de la pantalla (sempre el punt és a dalt a la esquerra!)
    this.x = 202;
    this.y = 415;
    // Loading the image by setting this.sprite
    this.sprite = 'images/char-boy.png';
}

// Update per actualitzar la posició de la personeta
// Update method for the Player
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
}

// Render per dibuixar la personeta
// Render method for the Player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Això és el control de les fletxes del teclat.
// Li passem coma paràmetre la tecla, i segons la tecla que sigui farem que es mogui d'una forma o d'una altre!
// handleInput method, which should receive user input, allowedKeys (the key which was pressed)
// and move the player according to that input. In particular:
Player.prototype.handleInput = function(allowedKeys) {
        
    // la imatge fa 101 x 171 
    // però en vertical està partida en 2 (cada imatge són 2 quadrats)
    
    // per tant, --> i <-- han de fer 101 cap a la dreta o cap a l'esquerra
    // cap amunt i avall han de fer 85
    
    // 101 i 85 són per si volem que salti de bloc en bloc, però per fer una transició smooth....?
    
    switch(allowedKeys) {
        // left key should move the player to the left
        // recall that the player cannot move off screen (so you will need to check for that and handle appropriately)
         case 'left':
                     
            // cap a l'esquerra
            // però si no posem res més, desapareix!
            if (this.x > 0) {
                this.x -= 101;
                break;
            }           
            
            
        case 'up':
            
            // cap a dalt. 83 perquè és el tamany amb què calculem el canvas al engine, per superposar les imatges
            if (this.y > 0) {
                this.y -= 83;
                break;
            }
            
        
        case 'right':
            
            // cap a la dreta
            // per què 404?
            if (this.x < 404) {
                this.x += 101;
                break;
            }
            
            
        case 'down':
            
            // cap a baix
            if (this.y < 400) {
                this.y += 83;
                break;  
            }
             
    }
    
    // if the player reaches the water, the game should be reset by moving the player back to
    // the initial location (you can write a separate reset Player method to handle that)
    if (this.y < 83) {  //això és aigua
        player.reset();
    }
    
}

// hem de fer que s'esperi un segon a l'aigua, i després resetegi
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Creem tots els enemics que volem tenir en pantalla i li passem les posicions inicials (si posem posicions negatives, fem que surtin a diferents temps)
// create several new Enemies objects and placing them in an array called allEnemies
var enemy_1 = new Enemy(-200, 63);
var enemy_2 = new Enemy(-350, 145);
var enemy_3 = new Enemy(-96, 228);
var enemy_4 = new Enemy(-96, 63);
var enemy_5 = new Enemy(-150, 145);
var enemy_6 = new Enemy(-450, 228);  // 
var allEnemies = [enemy_1, enemy_2, enemy_3, enemy_4, enemy_5, enemy_6];  // Array

// Creem el nostre jugador
// create a new Player object
var player = new Player();

// Hem de crear la funció per veure si hi ha col·lisió i aleshores resetejar-ho!

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
*/