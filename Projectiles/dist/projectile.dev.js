"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// this class hasn't been tested yet, it was from Chris' github

/*
Arguments
@gameEngine: gameEngine engine
@x, y: the position of bullet (projectile)
@target: the entity that is the target
@shootingEntity: pass in either tower or enemy in order to access damage it inflicts
*/
var Projectile =
/*#__PURE__*/
function () {
  function Projectile(gameEngine, x, y, target, shootingEntity) {
    _classCallCheck(this, Projectile);

    Object.assign(this, {
      gameEngine: gameEngine,
      x: x,
      y: y,
      target: target,
      shootingEntity: shootingEntity
    });
    this.cache = []; // to store rotated image

    this.startX = x;
    this.startY = y;
    var dist = distance(this, this.target);
    this.velocity = {
      x: (this.target.x - this.x) / dist * this.maxSpeed,
      y: (this.target.y - this.y) / dist * this.maxSpeed
    };
  }

  _createClass(Projectile, [{
    key: "drawAngle",
    value: function drawAngle(ctx, angle) {
      if (angle < 0 || angle > 359) return;

      if (!this.cache[angle]) {
        var radians = angle * Math.PI / 180;
        var offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = Math.max(this.frameWidth, this.frameHeight);
        offscreenCanvas.height = Math.max(this.frameWidth, this.frameHeight);
        var offscreenCtx = offscreenCanvas.getContext('2d');
        offscreenCtx.imageSmoothingEnabled = false;
        offscreenCtx.setTransform(1, 0, 0, 1, offscreenCanvas.width / 2, offscreenCanvas.height / 2); // translate + scale

        offscreenCtx.rotate(radians); // rotate

        offscreenCtx.drawImage(this.spritesheet, -offscreenCanvas.width / 2, -offscreenCanvas.height / 2);
        offscreenCtx.setTransform(1, 0, 0, 1, 0, 0); // translate + scale

        this.cache[angle] = offscreenCanvas; // save into cache
      }

      ctx.drawImage(this.cache[angle], 0, 0, this.cache[angle].width, this.cache[angle].height, this.x - this.xOffset, this.y - this.yOffset, this.cache[angle].width * this.scale, this.cache[angle].height * this.scale);
    }
  }, {
    key: "update",
    value: function update() {
      var dist = distance(this, this.target);
      this.velocity = {
        x: (this.target.x - this.x) / dist * this.maxSpeed,
        y: (this.target.y - this.y) / dist * this.maxSpeed
      };
      this.x += this.velocity.x * this.gameEngine.clockTick;
      this.y += this.velocity.y * this.gameEngine.clockTick;

      if (collide(this, this.target)) {
        this.target.takeHit(this.shootingEntity.damage);
        this.removeFromWorld = true;
      }

      if (distance({
        x: this.x,
        y: this.y
      }, {
        x: this.startX,
        y: this.startY
      }) > this.shootingEntity.shootingRadius) {
        this.removeFromWorld = true;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.canRotate) {
        var angle = Math.atan2(this.velocity.y, this.velocity.x);
        if (angle < 0) angle += 2 * Math.PI;
        var degrees = Math.floor(angle * 180 / Math.PI);
        this.drawAngle(ctx, degrees);
      } else {
        this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x - this.xOffset, this.y - this.yOffset, this.scale);
      }
    }
  }]);

  return Projectile;
}();