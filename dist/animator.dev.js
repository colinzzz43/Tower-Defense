"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animator =
/*#__PURE__*/
function () {
  function Animator(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
    _classCallCheck(this, Animator);

    Object.assign(this, {
      spritesheet: spritesheet,
      xStart: xStart,
      yStart: yStart,
      width: width,
      height: height,
      frameCount: frameCount,
      frameDuration: frameDuration,
      framePadding: framePadding,
      reverse: reverse,
      loop: loop
    });
    this.elapsedTime = 0;
    this.totalTime = this.frameCount * this.frameDuration;
  }

  _createClass(Animator, [{
    key: "drawFrame",
    value: function drawFrame(tick, ctx, x, y, scale) {
      this.elapsedTime += tick;

      if (this.isDone()) {
        if (this.loop) {
          this.elapsedTime -= this.totalTime;
        } else {
          return;
        }
      }

      var frame = this.currentFrame();
      if (this.reverse) frame = this.frameCount - frame - 1;
      ctx.drawImage(this.spritesheet, this.xStart + frame * (this.width + this.framePadding), this.yStart, this.width, this.height, x, y, this.width * scale, this.height * scale);
    }
  }, {
    key: "currentFrame",
    value: function currentFrame() {
      return Math.floor(this.elapsedTime / this.frameDuration);
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.elapsedTime >= this.totalTime;
    }
  }]);

  return Animator;
}();