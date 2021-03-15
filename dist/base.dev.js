"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Base =
/*#__PURE__*/
function () {
  function Base(gameEngine, x, y) {
    _classCallCheck(this, Base);

    // x and y are center coordinates of base
    Object.assign(this, {
      gameEngine: gameEngine,
      x: x,
      y: y
    });
    this.gameEngine.camera.base = this; // spritesheet

    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/base.png");
    this.animation = new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0, false, true); // stats

    this.HP = 5;
    this.SCALE = this.gameEngine.camera.currentLevel > 1 ? 2 : 3.75; // SCALE = 3.75 for small prototype map, SCALE = 2 for the other maps

    this.diameter = 48 * this.SCALE;
    this.radius = this.diameter / 2;
  } // show base's bounding circle


  _createClass(Base, [{
    key: "showBoundingCircle",
    value: function showBoundingCircle(context) {
      context.beginPath(); // draw circle representing bounding box

      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = "#FD0";
      context.fill();
      context.stroke();
    }
  }, {
    key: "update",
    value: function update() {
      var that = this;
      this.gameEngine.entities.forEach(function (entity) {
        if (entity instanceof Enemy) {
          if (collide(that, entity)) {
            entity.attackBase(); // enemies disapear on collision with base

            that.HP -= entity.damageAgainstBase; // base loses 1 hp

            that.gameEngine.level.levelEnemyWaves.decrementEnemiesLeft();
            that.playSoundEffect();
          }
        }
      }); // that.printBaseHP(that.HP);

      if (this.HP == 0) {
        this.isDead();
      }
    }
  }, {
    key: "playSoundEffect",
    value: function playSoundEffect() {
      var BGM = new Audio("./soundeffects/Popping.mp3");
      BGM.volume = 0.4;
      BGM.play();
    }
  }, {
    key: "draw",
    value: function draw(context) {
      // show bounds for collision testing
      // this.showBoundingCircle(context);
      // x an y are center coordinates, subtract radius for drawing offset
      this.animation.drawFrame(this.gameEngine.clockTick, context, this.x - this.radius, this.y - this.radius, this.SCALE);
    } // use this method for effects of base dying.

  }, {
    key: "isDead",
    value: function isDead() {}
  }]);

  return Base;
}();