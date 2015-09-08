/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // Create the size of the canvas
    canvas.width = 909;
    canvas.height = 760;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
         
        // if level = 5 --> game over --> do something like not put animation?
        win.requestAnimationFrame(main);
        
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. 
     */
    function update(dt) {
        switch(CURRENT_LEVEL) {
            case 0:
            break;
        
        case 1:
            updateEntities(dt);
            break;
        
        case 2:
            updateEntities(dt);
            break;
        
        case 3:
            updateEntities(dt);
            break;
        
        case 4:
            updateEntities(dt);
            break;
        }
        
        /* There is a bug when rendering the game and the Player 
         * arrives to the top of the screen, the head of the player 
         * stays rendered behind the tiles.
         * Thanks to Sebastian in the forums for this fix.
         */
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
    
    // Coaches video --> function updateExtras?

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* First we create the variables of the different types of ground we have.
         * Afterwards we create a matrix for each row/column, where we will put
         * each type of ground for each spot, that will vary for each level.
         */
        var s = 'images/stone-block.png';
        var g = 'images/grass-block.png';
        var w = 'images/water-block.png';
        var d = 'images/dirt-block.png';
        var f = 'images/wood-block.png';
        var matrix;
         
        // TODO: find a better way to store and access the matrix for the grounds
        
        switch(CURRENT_LEVEL)
        {
            case 0:
                document.getElementById('menu').hidden = true;
                document.getElementById('opening').hidden = false;
                break;
                
            case 1:
                document.getElementById('menu').hidden = false;
                document.getElementById('opening').hidden = true;
                matrix = [
                    [s,s,s,f,f,f,s,s,s], // row 1
                    [s,s,s,f,f,f,s,s,s], // row 2
                    [g,g,g,g,g,g,g,g,g], // row 3
                    [g,g,g,g,g,g,g,g,g], // row 4
                    [g,g,g,g,g,g,g,g,g], // row 5
                    [g,g,g,g,g,g,g,g,g], // row 6
                    [g,g,g,g,g,g,g,g,g], // row 7
                    [s,s,s,s,s,s,s,s,s]  // row 8
                ];
                
                /* Loop through the number of rows and columns we've defined above
                * and, using the matrix double array, draw the correct image for that
                * portion of the "grid"
                */
                for (var row = 0; row < 8; row++) {
                    for (var col = 0; col < 9; col++) {
                        /* The drawImage function of the canvas' context element
                        * requires 3 parameters: the image to draw, the x coordinate
                        * to start drawing and the y coordinate to start drawing.
                        * We're using our Resources helpers to refer to our images
                        * so that we get the benefits of caching these images, since
                        * we're using them over and over.
                        */
                        ctx.drawImage(Resources.get(matrix[row][col]), col * 101, row * 83);
                        //console.log(rowMatriu[row][col]);
                    }
                }
                renderEntities();
                break;
            
            case 2:
                document.getElementById('menu').hidden = false;
                document.getElementById('opening').hidden = true;
                matrix = [
                    [f,f,f,w,w,w,w,w,w], // row 1
                    [f,f,f,g,g,g,g,g,g], // row 2
                    [g,g,g,g,g,g,g,g,g], // row 3
                    [g,g,g,g,g,g,g,g,g], // row 4
                    [g,g,g,g,g,g,g,g,g], // row 5
                    [g,g,g,g,g,g,g,g,g], // row 6
                    [d,d,d,g,g,g,g,s,s], // row 7
                    [d,d,d,d,g,g,g,s,s]  // row 8
                ];
                
                /* Loop through the number of rows and columns we've defined above
                * and, using the matrix double array, draw the correct image for that
                * portion of the "grid"
                */
                for (var row = 0; row < 8; row++) {
                    for (var col = 0; col < 9; col++) {
                        /* The drawImage function of the canvas' context element
                        * requires 3 parameters: the image to draw, the x coordinate
                        * to start drawing and the y coordinate to start drawing.
                        * We're using our Resources helpers to refer to our images
                        * so that we get the benefits of caching these images, since
                        * we're using them over and over.
                        */
                        ctx.drawImage(Resources.get(matrix[row][col]), col * 101, row * 83);
                    }
                }
                renderEntities();
                break;
            
            case 3:
                document.getElementById('menu').hidden = false;
                document.getElementById('opening').hidden = true;
                matrix = [
                    [d,g,g,g,g,d,d,d,d], // row 1
                    [d,g,g,d,d,g,g,s,s], // row 2
                    [d,d,g,d,d,g,g,f,f], // row 3
                    [w,w,g,d,g,g,g,f,f], // row 4
                    [w,w,d,d,g,g,g,g,g], // row 5
                    [w,w,d,d,g,g,g,g,g], // row 6
                    [s,s,d,g,g,g,g,g,g], // row 7
                    [s,s,d,g,g,g,g,g,g]  // row 8
                ];
                
                /* Loop through the number of rows and columns we've defined above
                * and, using the matrix double array, draw the correct image for that
                * portion of the "grid"
                */
                for (var row = 0; row < 8; row++) {
                    for (var col = 0; col < 9; col++) {
                        /* The drawImage function of the canvas' context element
                        * requires 3 parameters: the image to draw, the x coordinate
                        * to start drawing and the y coordinate to start drawing.
                        * We're using our Resources helpers to refer to our images
                        * so that we get the benefits of caching these images, since
                        * we're using them over and over.
                        */
                        ctx.drawImage(Resources.get(matrix[row][col]), col * 101, row * 83);
                    }
                }
                renderEntities();
                break;
                        
            case 4:
                document.getElementById('menu').hidden = false;
                document.getElementById('opening').hidden = true;
                matrix = [
                    [d,d,d,w,w,s,s,s,s], // row 1
                    [d,w,d,d,d,d,d,d,d], // row 2
                    [d,w,w,d,w,w,w,w,d], // row 3
                    [d,w,w,d,w,w,w,w,w], // row 4
                    [d,d,d,d,w,w,w,w,w], // row 5
                    [d,d,d,d,d,f,f,f,w], // row 6
                    [w,w,w,w,d,f,f,f,w], // row 7
                    [w,w,w,w,d,d,d,w,w]  // row 8
                ];
                
                /* Loop through the number of rows and columns we've defined above
                * and, using the matrix double array, draw the correct image for that
                * portion of the "grid"
                */
                for (var row = 0; row < 8; row++) {
                    for (var col = 0; col < 9; col++) {
                        /* The drawImage function of the canvas' context element
                        * requires 3 parameters: the image to draw, the x coordinate
                        * to start drawing and the y coordinate to start drawing.
                        * We're using our Resources helpers to refer to our images
                        * so that we get the benefits of caching these images, since
                        * we're using them over and over.
                        */
                        ctx.drawImage(Resources.get(matrix[row][col]), col * 101, row * 83);
                    }
                }
                renderEntities();
                break;
        }
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allObstacles.forEach(function(obstacle){
           obstacle.render(); 
        });
        
        allItems.forEach(function(item){
           item.render(); 
        });
               
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }
    
    /* --------------------------------------------------------- */
    
    // Coaches video --> function renderExtras? 
    
    // setTimeout --> pause the game for some seconds?
    
    // new levels --> function --> argument --> what makes the game go to new level?
    // how do we render everything again?
    
    /* --------------------------------------------------------- */
    
    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
     
    // Write a function that takes as a parameter the reason you want to restart
    // Inside that you want the reset function, and you need to reset the player,
    // the enemies and the graphics. Render everything again.
    function reset() {
        /* if (level === 5) {
            CURRENT_LEVEL = 0;
            allObstacles.forEach(function(obstacle){
                obstacle.reset(); 
            });
            allItems.forEach(function(item){
            item.reset(); 
            });
            allEnemies.forEach(function(enemy) {
                enemy.reset();
            });
            player.reset();
        } */
    }
    
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/wood-block.png',
        'images/dirt-block.png',
        'images/enemy-bug.png',
        'images/enemy-bug-left.png',
        'images/heart.png',
        'images/key.png',
        'images/rock.png',
        'images/speechbubble.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-horn-girl-sad.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/chest-closed.png',
        'images/chest-lid.png',
        'images/chest-open.png',
        'images/chest-open-green.png',
        'images/chest-open-blue.png',
        'images/door-tall-closed.png',
        'images/door-tall-open.png',
        'images/door-tall-final.png',
        'images/roof-east.png',
        'images/roof-north.png',
        'images/roof-north-east.png',
        'images/roof-north-west.png',
        'images/roof-south.png',
        'images/roof-south-east.png',
        'images/roof-south-west.png',
        'images/roof-west.png',
        'images/window-tall.png',
        'images/tree-short.png',
        'images/tree-tall.png',
        'images/tree-ugly.png',
        'images/blanc.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
