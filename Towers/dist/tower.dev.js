"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tower =
/*#__PURE__*/
function () {
  // abstract class for towers
  function Tower(gameEngine, x, y, level) {
    _classCallCheck(this, Tower);

    Object.assign(this, {
      gameEngine: gameEngine,
      x: x,
      y: y,
      level: level
    });
    this.facing = 6; // facing left default

    this.user = this.gameEngine.user; // the user interacting with the tower

    this.elapsedTime = 0;
  }

  _createClass(Tower, [{
    key: "update",
    value: function update() {
      this.elapsedTime += this.gameEngine.clockTick;
      var that = this; // tower detection

      this.gameEngine.entities.forEach(function (entity) {
        // tower detection
        if (entity instanceof Enemy) {
          // tower shoots enemy in shooting bounds
          if (canShoot(that, entity) && that.elapsedTime > that.fireRate && entity.exist) {
            that.elapsedTime = 0;
            that.facing = getFacing(entity, that);
            that.shoot(entity); // console.log("Slime HP: ", entity.HP);
            // that.printMonsterHP(entity.HP);
          }
        }
      });
    }
  }, {
    key: "showBoundingCircle",
    value: function showBoundingCircle(context) {
      // entity bound
      context.setLineDash([]);
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = "#FD0";
      context.fill();
      context.stroke(); // shooting bound

      context.setLineDash([8, 15]);
      context.beginPath();
      context.arc(this.x, this.y, this.shootingRadius, 0, 2 * Math.PI);
      context.stroke();
    }
  }, {
    key: "buy",
    value: function buy(cost) {
      // check if the user has the sufficient fund
      if (this.user.balance >= cost) {
        // draw the tower onto the map
        this.user.decreaseBalance(cost);
        console.log("decreased.");
      }
    } // printMonsterHP(HP) {
    //   document.getElementById("printMonsterHP").innerHTML = HP;
    // }

  }, {
    key: "sell",
    value: function sell() {
      // Add the money back to the user balance
      this.user.increaseBalance(this.cost * this.depreciated); // Remove itself from the map (remove entity from the gameengine)

      this.gameEngine.removeEntity(this);
    }
  }, {
    key: "dead",
    value: function dead() {
      this.removeFromWorld = true; // After tower is removed from world, set the terrain tile it was on to open tower terrain

      var tilePosition = this.getTilePosition();
      this.level.changeStateOfTowerTerrain(tilePosition.row, tilePosition.column);
    }
  }, {
    key: "getShootingRange",
    value: function getShootingRange() {
      return this.shootingRadius;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return [this.x, this.y];
    }
  }, {
    key: "getTilePosition",
    value: function getTilePosition() {
      var tileSideLength = this.level.getTilePixelImageSize();
      var row = Math.floor(this.y / tileSideLength);
      var column = Math.floor(this.x / tileSideLength);
      return {
        row: row,
        column: column
      };
    }
  }, {
    key: "getCost",
    value: function getCost() {
      return this.cost;
    }
  }, {
    key: "takeHit",
    value: function takeHit(damage) {
      this.HP = Math.max(0, this.HP - damage);

      if (this.HP === 0) {
        this.dead();
      }
    }
  }, {
    key: "draw",
    value: function draw(context) {
      this.showBoundingCircle(context);
      this.drawHealth(context, this.x, this.y - this.yOffset - 30, this.HP, 100, 10);
      this.animations[this.facing].drawFrame(this.gameEngine.clockTick, context, this.x - this.xOffset, this.y - this.yOffset, PARAMS.SCALE); // context.drawImage(this.spritesheet, this.x, this.y);
    }
  }, {
    key: "drawHealth",
    value: function drawHealth(ctx, x, y, HP, width, thickness) {
      var percentage = width * (HP / this.maxHP);
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
    }
  }]);

  return Tower;
}();