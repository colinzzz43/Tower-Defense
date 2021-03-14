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

var Mushroom =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Mushroom, _Enemy);

  function Mushroom(gameEngine, x, y, direction, level, spawnTime) {
    var _this;

    _classCallCheck(this, Mushroom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mushroom).call(this, gameEngine, x, y, direction, level, spawnTime)); // sprites

    _this.attackImg = ASSET_MANAGER.getAsset("./sprites/monster/mushroom/Attack.png");
    _this.deathImg = ASSET_MANAGER.getAsset("./sprites/monster/mushroom/Death.png");
    _this.runImg = ASSET_MANAGER.getAsset("./sprites/monster/mushroom/Run.png");
    _this.takehitImg = ASSET_MANAGER.getAsset("./sprites/monster/mushroom/Take Hit.png"); // animations

    _this.attackAnim = new Animator(_this.attackImg, 0, 0, 150, 150, 8, 0.2, 0, false, true);
    _this.deathAnim = new Animator(_this.deathImg, 0, 0, 150, 150, 4, 0.3, 0, false, false);
    _this.runAnim = new Animator(_this.runImg, 0, 0, 150, 150, 8, 0.1, 0, false, true);

    _this.loadAnimation(); // state


    _this.state = 0; // 0: run, 1: attack, 2: takehit, 3: dead
    // stats

    _this.score = 50;
    _this.scale = _this.gameEngine.camera.currentLevel > 1 ? 1.5 : 2;
    _this.HP = 250;
    _this.maxHP = _this.HP; // used in calculating health bar

    _this.damage = 50;
    _this.reward = 120;
    _this.radius = 16 * _this.scale; // entity radius

    _this.visualRadius = _this.frameWidth / 3 * _this.scale; // shooting radius

    _this.xOffset = _this.frameWidth / 2 * _this.scale;
    _this.yOffset = (_this.frameHeight - 50) * _this.scale;
    _this.attackRate = 1.8; // level grid and enemy movement

    _this.movement = new EnemyMovement(1, _this.direction, _this.x, _this.y, _this.grid);
    return _this;
  }

  _createClass(Mushroom, [{
    key: "loadAnimation",
    value: function loadAnimation() {
      this.animations = [];
      this.animations.push(this.runAnim);
      this.animations.push(this.attackAnim);
      this.animations.push(this.takehitAnim);
      this.animations.push(this.deathAnim);
    }
  }, {
    key: "update",
    value: function update() {
      this.enemyPaused = this.level.levelPaused;
      this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
      this.movement.speed = this.enemySpeedMultipler;
      this.cooldownTime += this.gameEngine.clockTick * this.enemySpeedMultipler;
      this.gameTime += this.gameEngine.clockTick * this.enemySpeedMultipler; // spawn enemy if elapsed game time is greater than time to spawn
      // else do not do anything

      if (this.gameTime >= this.spawnTime) {
        this.exist = true;
      } else {
        return;
      } // ensures enemy is removed properly once dead and currency is rewarded exactly once.


      if (this.state == 3) {
        this.deathAnimationTime += this.gameEngine.clockTick;

        if (this.deathAnimationTime > 1.2) {
          this.removeFromWorld = true;
          this.isDead();
        }
      } else {
        // enemy controlled by spazer
        if (this.controlled) {
          this.movement.speed = 0.2;
          this.controlTime -= this.gameEngine.clockTick * this.enemySpeedMultipler;

          if (this.controlTime <= 0) {
            this.controlled = false;
            this.state = 0;
          }
        }

        for (var i = 0; i < this.gameEngine.entities.length; i++) {
          var ent = this.gameEngine.entities[i];

          if (this.controlled) {
            if (ent instanceof Enemy && ent.exist && ent !== this) {
              if (this.state != 3 && collide(this, ent) && this.cooldownTime > this.attackRate && this.state != 3) {
                this.state = 1;
                this.cooldownTime = 0;
                this.target = ent;
                this.attack(this.target);
              }
            }
          } else {
            if (ent instanceof Tower) {
              if (this.state != 3 && collide(this, ent) && this.cooldownTime > this.attackRate && this.state != 3) {
                this.state = 1;
                this.cooldownTime = 0;
                this.target = ent;
                this.attack(this.target);
              }
            }
          }
        }

        if (this.target) if (this.target.removeFromWorld || !collide(this, this.target) && this.state != 3) this.state = 0; // only move when running

        if (this.state == 0) {
          // goblin direction
          this.determineDirection(this.movement); // goblin movement

          var position = this.getMovement(this.movement, this.x, this.y);
          this.x = position.x;
          this.y = position.y;
          this.movement.updatePosition(this.x, this.y);
        }
      }
    }
  }, {
    key: "draw",
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
      // this.showBounds(context, position, this.radius, false); // entity radius
      // this.showBounds(context, position, this.visualRadius, true); // visual bound
      // health bar

      this.drawHealth(context, this.x, this.y - this.yOffset / 2, this.HP, this.maxHP, this.movement, position); // the animation speed multiplier

      var speedMultiplier = this.enemySpeedMultipler; // if the enemy is paused, then set animation speed to 0 to make enemy's current animation freeze

      if (this.enemyPaused) {
        speedMultiplier = 0;
      }

      ;
      this.animations[this.state].drawFrame(this.gameEngine.clockTick * speedMultiplier, context, this.x - this.xOffset, this.y - this.yOffset, this.scale);
    }
  }, {
    key: "takeHit",
    value: function takeHit(damage) {
      // this.state = 2;
      this.HP = Math.max(0, this.HP - damage);

      if (this.HP === 0 && this.state != 3) {
        this.state = 3;
      }
    }
  }, {
    key: "attack",
    value: function attack(tower) {
      tower.takeHit(this.damage);
    }
  }, {
    key: "isDead",
    value: function isDead() {
      this.user.increaseBalance(this.reward);
      this.level.levelEnemyWaves.decrementEnemiesLeft(); //   console.log("Mushroom+$", this.reward);

      this.user.increaseScores(this.score);
    }
  }]);

  return Mushroom;
}(Enemy);