"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(gameEngine, x, y, level, spawnTime) {
    _classCallCheck(this, Enemy);

    Object.assign(this, {
      gameEngine: gameEngine,
      x: x,
      y: y,
      level: level,
      spawnTime: spawnTime
    }); // user

    this.user = this.gameEngine.user; // frame height + width

    this.frameHeight = 150;
    this.frameWidth = 150; // states

    this.enemyPaused = this.level.levelPaused; // used when HUD is set up
    // stats

    this.damageAgainstBase = 1; // grid

    this.grid = this.level.getGrid(); // elapsed time to keep track of cooldown

    this.cooldownTime = 0;
    this.gameTime = 0;
    this.deathAnimationTime = 0; // does not exist until spawned

    this.exist = false; // speed multiplier

    this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
  } // show bounds based on given radius


  _createClass(Enemy, [{
    key: "showBounds",
    value: function showBounds(context, position, radius, setDashed) {
      // attack bound
      if (setDashed) {
        context.setLineDash([8, 15]);
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        context.stroke();
      } // entity bound
      else {
          context.setLineDash([]);
          context.beginPath();
          context.arc(position.x, position.y, radius, 0, 2 * Math.PI); // context.fillStyle = "#FD0";
          // context.fill();

          context.stroke();
        }
    }
  }, {
    key: "determineDirection",
    value: function determineDirection(movement) {
      // slime determines which direction it must go on
      var coordinates = movement.getCoordinates(); // Is the enemy on the terrain tile grid? If so then it has to be fixed on the path terrain until it reaches destination

      if (movement.enemyIsOnGrid() && !movement.hasReachedDestination()) {
        var direction = movement.getDirection();
        var nextTurnAt = movement.getTileToMakeTurnAt(); // Depending on the enemy's current direction, if enemy happens to be just on or just moved over
        // a turn tile's center coordinates, then make the enemy's current x- or y-position match that
        // of the tile's center x- or y-coordinate in which the enemy will change directions on

        switch (direction) {
          case "up":
            if (coordinates.x === nextTurnAt.centerX && coordinates.y <= nextTurnAt.centerY) {
              coordinates.y = nextTurnAt.centerY;
              coordinates.tileRow = Math.floor((coordinates.y - this.level.yCanvas) / movement.tileSideScale);
              this.y = nextTurnAt.centerY;
            }

            break;

          case "right":
            if (coordinates.x >= nextTurnAt.centerX && coordinates.y === nextTurnAt.centerY) {
              coordinates.x = nextTurnAt.centerX;
              coordinates.tileColumn = Math.floor((coordinates.x - this.level.xCanvas) / movement.tileSideScale);
              this.x = nextTurnAt.centerX;
            }

            break;

          case "down":
            if (coordinates.x === nextTurnAt.centerX && coordinates.y >= nextTurnAt.centerY) {
              coordinates.y = nextTurnAt.centerY;
              coordinates.tileRow = Math.floor((coordinates.y - this.level.yCanvas) / movement.tileSideScale);
              this.y = nextTurnAt.centerY;
            }

            break;

          case "left":
            if (coordinates.x <= nextTurnAt.centerX && coordinates.y === nextTurnAt.centerY) {
              coordinates.x = nextTurnAt.centerX;
              coordinates.tileColumn = Math.floor((coordinates.x - this.level.xCanvas) / movement.tileSideScale);
              this.x = nextTurnAt.centerX;
            }

            break;
        } // Has it reached the center of the tile it's located in? If it has then enemy takes note of the next tile in its current direction	 


        if (coordinates.x === nextTurnAt.centerX && coordinates.y === nextTurnAt.centerY) {
          var currentTileInCurrentDirection = this.grid.getTile(coordinates.tileRow, coordinates.tileColumn);
          var nextTileInCurrentDirection = movement.getNextTerrainTileInCurrentDirection(); // if the next adjacent tile in enemy's direction is not a path tile, then it changes direction to that where there is a path tile

          if (currentTileInCurrentDirection !== nextTileInCurrentDirection) {
            movement.changeDirection(coordinates.tileRow, coordinates.tileColumn);
          }
        }
      }
    }
  }, {
    key: "getMovement",
    value: function getMovement(movement, x, y) {
      // slime movement
      if (!this.enemyPaused) {
        var speed = movement.getSpeed();
      } else {
        var speed = 0;
      }

      if (movement.getDirection() === "up") {
        y += -speed;
      } else if (movement.getDirection() === "right") {
        x += speed;
      } else if (movement.getDirection() === "down") {
        y += speed;
      } else if (movement.getDirection() === "left") {
        x += -speed;
      } else {
        x += 0;
        y += 0;
      }

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "drawHealth",
    value: function drawHealth(ctx, x, y, HP, maxHP, movement, entityPosition) {
      var width = 100;
      var thickness = 10;
      var percentage = width * (HP / maxHP);
      ctx.beginPath();
      ctx.rect(x - width / 2, y, percentage, thickness);

      if (percentage > 63) {
        ctx.fillStyle = "green";
      } else if (percentage > 37) {
        ctx.fillStyle = "gold";
      } else if (percentage > 13) {
        ctx.fillStyle = "orange";
      } else {
        ctx.fillStyle = "red";
      }

      ctx.closePath();
      ctx.fill();
      movement.updatePosition(entityPosition.x, entityPosition.y);
    }
  }, {
    key: "attackBase",
    value: function attackBase() {
      this.removeFromWorld = true; // disappear when reaching the base
    }
  }]);

  return Enemy;
}();