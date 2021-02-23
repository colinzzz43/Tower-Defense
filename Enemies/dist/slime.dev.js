"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Slime =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Slime, _Enemy);

  function Slime(gameEngine, x, y, level, spawnTime) {
    var _this;

    _classCallCheck(this, Slime);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slime).call(this, gameEngine, x, y, level, spawnTime)); // animation

    _this.spritesheet = ASSET_MANAGER.getAsset("./sprites/monster/slime/slime1_front.png");
    _this.animation = new Animator(_this.spritesheet, 0, 0, 16, 16, 4, 0.15, 0, false, true);
    _this.frameHeight = 16;
    _this.frameWidth = 16; // stats

    _this.scale = 3;
    _this.HP = 100;
    _this.damage = 5;
    _this.maxHP = _this.HP;
    _this.reward = 5;
    _this.score = 10;
    _this.radius = (_this.frameWidth / 2 + 1) * _this.scale; // entity radius

    _this.shootingRadius = (_this.frameWidth / 2 + 5) * _this.scale; // shooting radius

    _this.xOffset = _this.frameWidth / 2 * _this.scale;
    _this.yOffset = _this.frameHeight / 2 * _this.scale + 1;
    _this.fireRate = 1; // level grid and enemy movement

    _this.movement = new EnemyMovement(0.5, "right", _this.x, _this.y, _this.grid);
    return _this;
  }

  _createClass(Slime, [{
    key: "update",
    value: function update() {
      this.enemyPaused = this.level.levelPaused;
      this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
      this.movement.speed = 1 * this.enemySpeedMultipler;

      if (this.enemyPaused) {// pause animation at certain frame
      } else {
        this.cooldownTime += this.gameEngine.clockTick * this.enemySpeedMultipler;
        this.gameTime += this.gameEngine.clockTick * this.enemySpeedMultipler; // spawn enemy if elapsed game time is greater than time to spawn
        // else do not do anything

        if (this.gameTime >= this.spawnTime) {
          this.exist = true;
        } else {
          return;
        } // enemy controlled by spazer


        if (this.controlled) {
          this.movement.speed = 0.2;
          this.controlTime -= this.gameEngine.clockTick * this.enemySpeedMultipler;

          if (this.controlTime <= 0) {
            this.controlled = false;
          }
        }

        var that = this;
        this.gameEngine.entities.forEach(function (entity) {
          // shoot other enemies if controlled
          if (that.controlled) {
            if (entity instanceof Enemy && entity.exist && entity !== that) {
              // enemy shoots target in shooting bounds
              if (canShoot(that, entity) && that.cooldownTime > that.fireRate) {
                that.cooldownTime = 0;
                that.attack(entity); // that.printTowerHP(entity.HP);
              }
            }
          } else {
            if (entity instanceof Tower) {
              // enemy shoots target in shooting bounds
              if (canShoot(that, entity) && that.cooldownTime > that.fireRate) {
                that.cooldownTime = 0;
                that.attack(entity); // that.printTowerHP(entity.HP);
              }
            }
          } // Brandon disabled collison between slimes because sometimes this would cause slimes to go off-path.
          // This section might need to be re-worked to deal with this collision issue
          // slime detection

          /*
          if (entity instanceof Slime) {
           if (entity !== that && collide(that, entity)) {
          // slimes collide with each other
          var dist = distance(that, entity);
          var delta = that.radius + entity.radius - dist;
          var difX = (that.x - entity.x) / dist;
          var difY = (that.y - entity.y) / dist;
          				that.x += (difX * delta) / 2;
          that.y += (difY * delta) / 2;
          entity.x -= (difX * delta) / 2;
          entity.y -= (difY * delta) / 2;
           }
          }
          */

        }); // slime direction

        this.determineDirection(this.movement); // slime movement

        var position = this.getMovement(this.movement, this.x, this.y);
        this.x = position.x;
        this.y = position.y;
        this.movement.updatePosition(this.x, this.y);
      }
    }
  }, {
    key: "draw",
    // printTowerHP(HP) {
    //   document.getElementById("printTowerHP").innerHTML = HP;
    // }
    value: function draw(context) {
      // spawn enemy if elapsed game time is greater than time to spawn
      // else do not do anything
      if (this.gameTime >= this.spawnTime) {
        this.exist = true;
      } else {
        return;
      }

      var position = {
        x: this.x,
        y: this.y
      }; // draw bounds
      //    this.showBounds(context, position, this.radius, false); // entity radius
      //    this.showBounds(context, position, this.shootingRadius, true); // shooting bound
      // health bar

      this.drawHealth(context, this.x, this.y - this.yOffset - 30, this.HP, this.maxHP, this.movement, position); // the animation speed multiplier

      var speedMultiplier = this.enemySpeedMultipler; // if the enemy is paused, then set animation speed to 0 to make enemy's current animation freeze

      if (this.enemyPaused) {
        speedMultiplier = 0;
      }

      ;
      this.animation.drawFrame(this.gameEngine.clockTick * speedMultiplier, context, this.x - this.xOffset, this.y - this.yOffset, this.scale);
    }
  }, {
    key: "takeHit",
    value: function takeHit(damage) {
      this.HP = Math.max(0, this.HP - damage);

      if (this.HP === 0) {
        this.isDead();
      }
    }
  }, {
    key: "attack",
    value: function attack(tower) {
      tower.takeHit(this.damage);
      this.gameEngine.addEntity(new TomatoBullet(this.gameEngine, this.x, this.y, tower, this));
    }
  }, {
    key: "isDead",
    value: function isDead() {
      this.removeFromWorld = true;
      this.user.increaseBalance(this.reward);
      console.log("Slime+$", this.reward);
      this.user.increaseScores(this.score); // add coins when dropped

      this.gameEngine.addEntity(new Coin(this.gameEngine, this.x, this.y));
    }
  }]);

  return Slime;
}(Enemy);