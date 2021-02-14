"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LaserBullet =
/*#__PURE__*/
function (_Projectile) {
  _inherits(LaserBullet, _Projectile);

  function LaserBullet(gameEngine, x, y, target, shootingEntity) {
    var _this;

    _classCallCheck(this, LaserBullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LaserBullet).call(this, gameEngine, x, y, target, shootingEntity)); // animations

    _this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/laserbullet.png");
    _this.animation = new Animator(_this.spritesheet, 0, 0, 132, 60, 1, 1, 0, false, true); // animation stats

    _this.scale = 0.1;
    _this.xOffset = 67 * _this.scale;
    _this.yOffset = 30 * _this.scale;
    _this.frameWidth = 132;
    _this.frameHeight = 60; // stats

    _this.canRotate = true;
    _this.radius = 67 * _this.scale;
    _this.maxSpeed = 100; // pixels per second

    return _this;
  }

  return LaserBullet;
}(Projectile);