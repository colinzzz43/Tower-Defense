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

var Goblin =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Goblin, _Enemy);

  function Goblin(gameEngine, x, y, level, spawnTime) {
    var _this;

    _classCallCheck(this, Goblin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Goblin).call(this, gameEngine, x, y, level, spawnTime)); // sprites

    _this.attackImg = ASSET_MANAGER.getAsset("./sprites/monster/goblin/Attack.png");
    _this.deathImg = ASSET_MANAGER.getAsset("./sprites/monster/goblin/Death.png");
    _this.runImg = ASSET_MANAGER.getAsset("./sprites/monster/goblin/Run.png");
    _this.takehitImg = ASSET_MANAGER.getAsset("./sprites/monster/goblin/Take Hit.png"); // animations

    _this.attackAnim = new Animator(_this.attackImg, 0, 0, 150, 150, 8, 0.1, 0, false, true);
    _this.deathAnim = new Animator(_this.deathImg, 0, 0, 150, 150, 4, 0.3, 0, false, false);
    _this.runAnim = new Animator(_this.runImg, 0, 0, 150, 150, 8, 0.2, 0, false, true);

    _this.loadAnimation(); // state


    _this.state = 0; // 0: run, 1: attack, 2: takehit, 3: dead
    // stats

    _this.score = 20;
    _this.scale = 2;
    _this.HP = 30;
    _this.maxHP = _this.HP; // used in calculating health bar

    _this.damage = 10; //8;

    _this.reward = 15;
    _this.radius = 16 * _this.scale; // entity radius

    _this.visualRadius = _this.frameWidth / 3 * _this.scale; // shooting radius

    _this.xOffset = _this.frameWidth / 2 * _this.scale;
    _this.yOffset = (_this.frameHeight - 50) * _this.scale;
    _this.attackRate = 0.7; // level grid and enemy movement

    _this.movement = new EnemyMovement(1, "right", _this.x, _this.y, _this.grid);
    return _this;
  }

  _createClass(Goblin, [{
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
      this.movement.speed = 1.25 * this.enemySpeedMultipler;

      if (this.enemyPaused) {// pause animation at certain frame
      } else {
        this.cooldownTime += this.gameEngine.clockTick * this.enemySpeedMultipler;
        this.gameTime += this.gameEngine.clockTick * this.enemySpeedMultipler; // spawn enemy if elapsed game time is greater than time to spawn
        // else do not do anything

        if (this.gameTime >= this.spawnTime) {
          this.exist = true;
        } else {
          return;
        }

        for (var i = 0; i < this.gameEngine.entities.length; i++) {
          var ent = this.gameEngine.entities[i];

          if (ent instanceof Tower) {
            if (this.state != 3 && collide(this, ent) && this.cooldownTime > this.attackRate) {
              this.state = 1;
              this.cooldownTime = 0;
              this.target = ent;
              this.attack(this.target);
            }
          }
        }

        if (this.target) if (this.target.removeFromWorld) this.state = 0; // only move when running

        if (this.state == 0) {
          // goblin direction
          this.determineDirection(this.movement); // goblin movement

          var position = this.getMovement(this.movement, this.x, this.y);
          this.x = position.x;
          this.y = position.y;
          this.movement.updatePosition(this.x, this.y);
        }

        if (this.state == 3) {
          this.deathAnimationTime += this.gameEngine.clockTick;

          if (this.deathAnimationTime > 1) {
            this.removeFromWorld = true;
            this.isDead();
          }
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

      if (this.HP === 0) {
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
      console.log("Goblin+$", this.reward);
      this.user.increaseScores(this.score);
    }
  }]);

  return Goblin;
}(Enemy);