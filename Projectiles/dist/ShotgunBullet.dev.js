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

var ShotgunBullet =
/*#__PURE__*/
function (_Projectile) {
  _inherits(ShotgunBullet, _Projectile);

  function ShotgunBullet(gameEngine, x, y, target, shootingEntity, bulletOffset) {
    var _this;

    _classCallCheck(this, ShotgunBullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShotgunBullet).call(this, gameEngine, x, y, target, shootingEntity));
    _this.bulletOffset = bulletOffset; // animations

    _this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/bulletb.png");
    _this.animation = new Animator(_this.spritesheet, 0, 0, 10, 8, 1, 1, 0, false, true); // animation stats

    _this.scale = 1;
    _this.xOffset = 4 * _this.scale;
    _this.yOffset = 4 * _this.scale;
    _this.frameWidth = 10;
    _this.frameHeight = 8; // stats

    _this.canRotate = true;
    _this.radius = 4 * _this.scale;
    _this.maxSpeed = 150; // pixels per second

    var dist = distance(_assertThisInitialized(_this), _this.target);
    _this.velocity = {
      x: (_this.target.x - _this.x + _this.bulletOffset) / dist * _this.maxSpeed,
      y: (_this.target.y - _this.y + _this.bulletOffset) / dist * _this.maxSpeed
    };
    return _this;
  }

  _createClass(ShotgunBullet, [{
    key: "update",
    value: function update() {
      this.projectileSpeedMultiplier = this.gameEngine.camera.speed;
      this.projectilePaused = this.gameEngine.camera.paused;

      if (this.projectilePaused) {// do nothing
      } else {
        this.x += this.velocity.x * this.gameEngine.clockTick * this.projectileSpeedMultiplier;
        this.y += this.velocity.y * this.gameEngine.clockTick * this.projectileSpeedMultiplier;

        for (var i = 0; i < this.gameEngine.entities.length; i++) {
          var ent = this.gameEngine.entities[i];

          if (ent instanceof Enemy && ent.exist && collide(this, ent)) {
            ent.takeHit(this.shootingEntity.damage);
            this.removeFromWorld = true;
          }
        }

        if (this.x < 150 || this.x > 1045 || this.y < 70 || this.y > 658) this.removeFromWorld = true;
      }
    }
  }]);

  return ShotgunBullet;
}(Projectile);