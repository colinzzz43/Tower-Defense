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

var Dragon =
/*#__PURE__*/
function (_Enemy) {
  _inherits(Dragon, _Enemy);

  function Dragon(gameEngine, x, y, level, spawnTime) {
    var _this;

    _classCallCheck(this, Dragon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dragon).call(this, gameEngine, x, y, level, spawnTime));
    _this.color = randomInt(4); // 0: gold, 1: red, 2: twin headed blue, 3: twin headed red
    // animations

    var time = 0.25;

    switch (_this.color) {
      case 0:
        _this.goldImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_dragon-gold.png");
        _this.animation = new Animator(_this.goldImg, 0, 128, 144, 128, 3, time, 0, false, true);
        break;

      case 1:
        _this.redImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_dragon-red.png");
        _this.animation = new Animator(_this.redImg, 0, 128, 144, 128, 3, time, 0, false, true);
        break;

      case 2:
        _this.twinBlueImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_twin_headed_dragon-blue.png");
        _this.animation = new Animator(_this.twinBlueImg, 0, 128, 144, 128, 3, time, 0, false, true);
        break;

      case 3:
        _this.twinRedImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_twin_headed_dragon-red.png");
        _this.animation = new Animator(_this.twinRedImg, 0, 128, 144, 128, 3, time, 0, false, true);
        break;
    }

    _this.frameWidth = 144;
    _this.frameHeight = 128; // stats

    _this.score = 100;
    _this.scale = 1.5;
    _this.HP = 200;
    _this.maxHP = _this.HP; // used in calculating health bar

    _this.damage = 30;
    _this.reward = 250;
    _this.radius = (_this.frameWidth / 2 - 10) * _this.scale; // entity radius

    _this.shootingRadius = (_this.frameWidth / 2 + 50) * _this.scale; // shooting radius

    _this.xOffset = _this.frameWidth / 2 * _this.scale;
    _this.yOffset = _this.frameHeight * _this.scale;
    _this.fireRate = 2; // level grid and enemy movement

    _this.movement = new EnemyMovement(1.25, "right", _this.x, _this.y, _this.grid);
    return _this;
  }

  _createClass(Dragon, [{
    key: "update",
    value: function update() {
      this.enemyPaused = this.level.levelPaused;
      this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
      this.movement.speed = 1.5 * this.enemySpeedMultipler;

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
            if (canShoot(this, ent) && this.cooldownTime > this.fireRate) {
              this.cooldownTime = 0;
              this.attack(ent);
            }

            if (ent.removeFromWorld) this.state = 0;
          }
        } // only move when flying
        // skeleton direction


        this.determineDirection(this.movement); // skeleton movement

        var position = this.getMovement(this.movement, this.x, this.y);
        this.x = position.x;
        this.y = position.y;
        this.movement.updatePosition(this.x, this.y);
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
      // this.showBounds(context, position, this.shootingRadius, true); // visual bound
      // health bar

      this.drawHealth(context, this.x, this.y - this.yOffset - 10, this.HP, this.maxHP, this.movement, position); // the animation speed multiplier

      var speedMultiplier = this.enemySpeedMultipler; // if the enemy is paused, then set animation speed to 0 to make enemy's current animation freeze

      if (this.enemyPaused) {
        speedMultiplier = 0;
      }

      ;
      this.animation.drawFrame(this.gameEngine.clockTick * speedMultiplier, context, this.x - this.xOffset, this.y - this.yOffset, this.scale);
    }
  }, {
    key: "attack",
    value: function attack(tower) {
      tower.takeHit(this.damage); // this.gameEngine.addEntity(new FlamethrowerFlames(this.gameEngine, this.x + this.xOffset, this.y - this.yOffset + 10, tower, this, 0));
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
    key: "isDead",
    value: function isDead() {
      this.removeFromWorld = true;
      this.user.increaseBalance(this.reward);
      console.log("Dragon+$", this.reward);
      this.user.increaseScores(this.score);
      this.gameEngine.addEntity(new Coin(this.gameEngine, this.x, this.y));
    }
  }]);

  return Dragon;
}(Enemy);