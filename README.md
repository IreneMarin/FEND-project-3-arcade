## Classic Arcade Game Clone project

Third project from the Front-End Web Developer Nanodegree in <a href="https://www.udacity.com" target="_blank">Udacity</a>:
<br>
recreating the classic arcade game Frogger with Object-Oriented JavaScript and HTML5 Canvas.

### How to run the game

lalala

### How to play the game

lalala

----------------------

### Udacity's instructions:

You will be provided visual assets and a game loop engine; using these tools you must add a number of entities to the game including the player characters and enemies to recreate the classic arcade game Frogger.

1. If you need a refresher on Object Oriented JavaScript, review our course and OOJS Notes; if you'd like a more detailed explanation as to how the game engine works, see our HTML5 Canvas course.
2. Read the detailed instructions for the project.
3. Download the art assets and provided game engine.
4. Review the video of the completed game and take note of the game's rules.
5. Review the code and comments provided in app.js
6. Identify the various classes you will need to write.
7. Identify and code the properties each class must have to accomplish its tasks.
8. Write the functions that provide functionality to each of your class instances.
 
-----------------------------------

## TO DO
 
### Basic game 
- ~~Implement Enemy function:~~ 
  - ~~set initial location and speed~~
  - ~~update method: updates position and handles collision~~
- ~~Implement Player function:~~
  - ~~handleInput method:~~
  - ~~receive user input and move Player accordingly~~
  - ~~Player cannot move off screen~~
  - ~~if the Player reaches water, the game should reset~~
 - ~~Create a new Player object~~
 - ~~Create several new Enemy objects and place them in allEnemies array~~
 
### Start page
- Create the story
- Selector to choose the hero
- Selector to choose the difficulty: easy, normal, nightmare? 
 
### Canvas
- ~~Create big canvas~~
- ~~Put trees, stones, paths, doors~~
- ~~Create top menu for: hearts, keys, gems, level and restart~~

### Extras
- Hearts: 
  - ~~start with 5 lifes~~
  - ~~each collision subtracts a life~~
  - ~~each heart adds a life~~
  - when 0 lifes --> game over
- Keys: 
  - use key to open doors (to pass the level) 
  - use key to open chests (to have gems)
- Gems:
  - 1 blue gem: to walk underwater 
  - 1 green gem: to walk through trees
  - 1 yellow gem: ??
- Level: 
  - 4 levels 
  - each level changes the background
- Chests: 
  - open chest with a key
  - pick up gem inside 
- Doors:
  - open door to pass level
- Animation & sound:
  - when collision with bug --> animation sprite
  - when collision with bug --> sound
  - when collision with nature --> sound
  - when collision with item --> animation
  - when collision with item --> sound
  - when game over --> sound
