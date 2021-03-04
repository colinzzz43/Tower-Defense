// returns a random integer between 0 and n-1
function randomInt(n) {
  return Math.floor(Math.random() * n);
}

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
  return "hsl(" + h + "," + s + "%," + l + "%)";
}

// computes pythagoras' theorem
function distance(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// compute the pixel scaling via dividing the canvas width defined in style.css by canvas width defined in index.html
function widthScaling() {
  var canvas = document.getElementById("gameWorld");
  var htmlCanvasWidth = canvas.width;
  var cssCanvasWidth = parseFloat(window.getComputedStyle(canvas).width);
  return cssCanvasWidth / htmlCanvasWidth;
}

// determing which direction each tower will be facing
function getFacing(enemy, tower) {

  let deltaX = enemy.x - tower.x;
  let deltaY = enemy.y - tower.y;

  let angle = Math.atan2(deltaY, deltaX) / Math.PI;

  if (-0.625 < angle && angle < -0.375) return 0;
  if (-0.375 < angle && angle < -0.125) return 1;
  if (-0.125 < angle && angle < 0.125) return 2;
  if (0.125 < angle && angle < 0.375) return 3;
  if (0.375 < angle && angle < 0.625) return 4;
  if (0.625 < angle && angle < 0.875) return 5;
  if (-0.875 > angle || angle > 0.875) return 6;
  if (-0.875 < angle && angle < -0.625) return 7;
};

/**
 * Enemy spawner.
 * @gameEngine GameEngine
 * @x x coordinate
 * @y y coordinate
 * @level Level
 * @intialSpawnTime # of seconds until spawning starts
 * @spawnIntervalTime # of seconds between spawns
 * @enemyType String of type of enemy
 * @n Total # of enemies to be spawned
 **/
function addEnemySpawn(gameEngine, x, y, direction, level, initalSpawnTime, spawnIntervalTime, enemyType, n) {
  switch (enemyType) {
    case "Slime":
      while (n > 0) {
        gameEngine.addEntity(new Slime(gameEngine, x, y, direction, level, initalSpawnTime));
        initalSpawnTime += spawnIntervalTime;
        n--;
      }
      break;
    case "Goblin":
      while (n > 0) {
        gameEngine.addEntity(new Goblin(gameEngine, x, y, direction, level, initalSpawnTime));
        initalSpawnTime += spawnIntervalTime;
        n--;
      }
      break;
    case "Skeleton":
      while (n > 0) {
        gameEngine.addEntity(new Skeleton(gameEngine, x, y, direction, level, initalSpawnTime));
        initalSpawnTime += spawnIntervalTime;
        n--;
      }
      break;
    case "Flying Eye":
      while (n > 0) {
        gameEngine.addEntity(new FlyingEye(gameEngine, x, y, direction, level, initalSpawnTime));
        initalSpawnTime += spawnIntervalTime;
        n--;
      }
      break;
    case "Mushroom":
      while (n > 0) {
        gameEngine.addEntity(new Mushroom(gameEngine, x, y, direction, level, initalSpawnTime));
        initalSpawnTime += spawnIntervalTime;
        n--;
      }
      break;
    case "Dragon":
      while (n > 0) {
        gameEngine.addEntity(new Dragon(gameEngine, x, y, direction, level, initalSpawnTime));
        initalSpawnTime += spawnIntervalTime;
        n--;
      }
      break;
    
  }
}


function collide(a, b) {
  return distance(a, b) < a.radius + b.radius;
}

// mainly used for shooting enemies (i.e. Slime, Flying Eye, Dragon) and all towers
// if the shooting entity's shootingBounds collide with target's entityBound, the entity can shoot.
function canShoot(shootingEntity, target) {
    return (distance(shootingEntity, target) < shootingEntity.shootingRadius + target.radius);   
}

// only used for melee enemies (i.e. Goblin, Mushroom, Skeleton)
// if the melee enemy's visualBounds collide with target's entityBound, the enemy locks on a specific tower to attack later
function canSee(meleeEnemy, tower) {
  return distance(meleeEnemy, tower) < meleeEnemy.visualRadius + tower.radius;
}

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// add global parameters here

var PARAMS = {
  SCALE: 3,
  WIDTH: 1200,
  HEIGHT: 600
};
