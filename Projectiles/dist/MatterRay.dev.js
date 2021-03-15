"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MatterRay =
/*#__PURE__*/
function (_Projectile) {
  _inherits(MatterRay, _Projectile);

  function MatterRay(gameEngine, x, y, target, shootingEntity) {
    var _this;

    _classCallCheck(this, MatterRay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MatterRay).call(this, gameEngine, x, y, target, shootingEntity));
    _this.xStart = x;
    _this.yStart = y; // animations

    _this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/shockwave.png");
    _this.animation = new Animator(_this.spritesheet, 0, 0, 80, 80, 9, 0.3, 80, false, true); // animation stats

    _this.scale = 1;
    _this.xOffset = 40 * _this.scale;
    _this.yOffset = 40 * _this.scale;
    _this.frameWidth = 80;
    _this.frameHeight = 80; // stats

    _this.canRotate = false;
    _this.radius = 10;
    _this.maxSpeed = 150; // pixels per second

    var dist = distance(_assertThisInitialized(_this), _this.target);
    _this.velocity = {
      x: (_this.target.x - _this.x) / dist * _this.maxSpeed,
      y: (_this.target.y - _this.y) / dist * _this.maxSpeed
    };
    return _this;
  }

  _createClass(MatterRay, [{
    key: "update",
    value: function update() {
      this.projectileSpeedMultiplier = this.gameEngine.camera.speed;
      this.projectilePaused = this.gameEngine.camera.paused;
      var speedMultiplier = this.projectileSpeedMultiplier;

      if (this.projectilePaused) {
        speedMultiplier = 0;
      }

      this.x += this.velocity.x * this.gameEngine.clockTick * speedMultiplier;
      this.y += this.velocity.y * this.gameEngine.clockTick * speedMultiplier;
      this.radius += .4 * speedMultiplier;

      for (var i = 0; i < this.gameEngine.entities.length; i++) {
        var ent = this.gameEngine.entities[i];

        if (ent instanceof Enemy && ent.exist && collide(this, ent)) {
          ent.takeHit(this.shootingEntity.damage);
        }

        var dx = this.x - this.xStart;
        var dy = this.y - this.yStart;
        var distTraveled = Math.sqrt(dx * dx + dy * dy);

        if (distTraveled > this.shootingEntity.shootingRadius) {
          this.removeFromWorld = true;
        }
      }

      if (this.x < 105 || this.x > 1010 || this.y < 60 || this.y > 620) this.removeFromWorld = true;
    }
  }, {
    key: "showBoundingCircle",
    value: function showBoundingCircle(ctx) {
      // entity bound
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      var randomColor = Math.floor(Math.random() * 3);

      if (randomColor === 0) {
        // ctx.fillStyle = "#FD0";
        ctx.fillStyle = "DarkMagenta";
      } else if (randomColor === 1) {
        ctx.fillStyle = "MediumPurple";
      } else {
        ctx.fillStyle = "Indigo";
      }

      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      this.showBoundingCircle(ctx);

      if (this.canRotate) {
        var angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (angle < 0) angle += 2 * Math.PI;
        var degrees = Math.floor(angle * 180 / Math.PI);
        this.drawAngle(ctx, degrees);
      } else {
        var speedMultiplier = this.projectileSpeedMultiplier;

        if (this.projectilePaused) {
          speedMultiplier = 0;
        }

        this.animation.drawFrame(this.gameEngine.clockTick * speedMultiplier, ctx, this.x - this.xOffset, this.y - this.yOffset, this.scale);
      }
    }
  }]);

  return MatterRay;
}(Projectile);