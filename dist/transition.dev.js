"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transition =
/*#__PURE__*/
function () {
  // Four types: "title", "gameover", "gamewon", "levelselect"
  function Transition(type) {
    _classCallCheck(this, Transition);

    Object.assign(this, {
      type: type
    });
    this.background = ASSET_MANAGER.getAsset("./sprites/background.jpg");
  }

  _createClass(Transition, [{
    key: "draw",
    value: function draw(ctx) {
      var canvasWidth = ctx.canvas.width;
      var canvasHeight = ctx.canvas.height;

      switch (this.type) {
        case "title":
          var title = new Animator(ASSET_MANAGER.getAsset("./sprites/title.png"), 0, 0, 1372, 139, 1, 1, 0, 0, 1);
          var play = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Start.png"), 0, 0, 558, 137, 1, 1, 0, 0, 1); // ctx.drawImage(this.background, canvasWidth, canvasHeight);
          // ctx.fillStyle = '#4d6091';
          // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          var titleScale = 0.75;
          var playScale = 0.5;
          var playScale2 = 0.6;
          title.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 1372 * titleScale) / 2, 200, titleScale);

          if (gameEngine.mouse) {
            var mouseX = gameEngine.mouse.x;
            var mouseY = gameEngine.mouse.y;

            if (mouseX > 385 && mouseY > 335 && mouseX < 615 && mouseY < 390) {
              // ctx.drawImage(play, 0, 0, 558, 137, 459, 400, 558 * playScale2, 137 * playScale2);
              play.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 558 * playScale2) / 2, 450 - 137 * playScale2 / 2, playScale2);
            } else {
              // ctx.drawImage(play, 0, 0, 558, 137, 459, 400, 558 * playScale, 137 * playScale);
              play.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 558 * playScale) / 2, 450 - 137 * playScale / 2, playScale);
            }
          } else {
            // ctx.drawImage(play, 0, 0, 558, 137, 459, 400, 558 * playScale, 137 * playScale);
            play.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 558 * playScale) / 2, 450 - 137 * playScale / 2, playScale);
          }

          break;

        case "levelselect":
          var background = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/LevelScreen.png"), 0, 0, 1200, 770, 1, 1, 0, 0, 1);
          background.drawFrame(gameEngine.clockTick, ctx, 0, 0, 1);
          var lvl1 = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Level1.png"), 0, 0, 510, 180, 1, 1, 0, 0, 1);
          var lvl2 = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Level2.png"), 0, 0, 286, 109, 1, 1, 0, 0, 1);
          var lvl3 = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Level3.png"), 0, 0, 283, 107, 1, 1, 0, 0, 1);
          var lvl4 = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Level4.png"), 0, 0, 293, 106, 1, 1, 0, 0, 1);
          var scale1 = 0.7;
          var scale2 = 0.8;
          var scale3 = 0.8;
          var scale4 = 0.8;
          var col1 = canvasWidth / 4;
          var col2 = canvasWidth * 4 / 5;
          var row1 = canvasHeight / 5;
          var row2 = canvasHeight * 4 / 5; // hover effect

          if (gameEngine.mouse) {
            var mouseX = gameEngine.mouse.x;
            var mouseY = gameEngine.mouse.y; // level 1

            if (mouseX > 105 && mouseX < 390 && mouseY > 470 && mouseY < 562) {
              var scaleup = scale1 + 0.1;
              lvl1.drawFrame(gameEngine.clockTick, ctx, col1 - 510 * scaleup / 2, row2 - 180 * scaleup / 2, scaleup);
            } else {
              lvl1.drawFrame(gameEngine.clockTick, ctx, col1 - 510 * scale1 / 2, row2 - 180 * scale1 / 2, scale1);
            } // level 2


            if (mouseX > 710 && mouseX < 890 && mouseY > 480 && mouseY < 540) {
              var scaleup = scale2 + 0.1;
              lvl2.drawFrame(gameEngine.clockTick, ctx, col2 - 286 * scaleup / 2, row2 - 109 * scaleup / 2, scaleup);
            } else {
              lvl2.drawFrame(gameEngine.clockTick, ctx, col2 - 286 * scale2 / 2, row2 - 109 * scale2 / 2, scale2);
            } // level 3


            if (mouseX > 710 && mouseX < 885 && mouseY > 100 && mouseY < 160) {
              var scaleup = scale3 + 0.1;
              lvl3.drawFrame(gameEngine.clockTick, ctx, col2 - 283 * scaleup / 2, row1 - 107 * scaleup / 2, scaleup);
            } else {
              lvl3.drawFrame(gameEngine.clockTick, ctx, col2 - 283 * scale3 / 2, row1 - 107 * scale3 / 2, scale3);
            } // level 4


            if (mouseX > 160 && mouseX < 340 && mouseY > 105 && mouseY < 155) {
              var scaleup = scale4 + 0.1;
              lvl4.drawFrame(gameEngine.clockTick, ctx, col1 - 293 * scaleup / 2, row1 - 106 * scaleup / 2, scaleup);
            } else {
              lvl4.drawFrame(gameEngine.clockTick, ctx, col1 - 293 * scale4 / 2, row1 - 106 * scale4 / 2, scale4);
            }
          } else {
            // draw these while waiting for mouse to register
            lvl1.drawFrame(gameEngine.clockTick, ctx, col1 - 510 * scale1 / 2, row2 - 180 * scale1 / 2, scale1);
            lvl2.drawFrame(gameEngine.clockTick, ctx, col2 - 286 * scale2 / 2, row2 - 109 * scale2 / 2, scale2);
            lvl3.drawFrame(gameEngine.clockTick, ctx, col2 - 283 * scale3 / 2, row1 - 107 * scale3 / 2, scale3);
            lvl4.drawFrame(gameEngine.clockTick, ctx, col1 - 293 * scale4 / 2, row1 - 106 * scale4 / 2, scale4);
          }

          break;

        case "gameover":
          // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          var gameover = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Gameover.png"), 0, 0, 715, 134, 1, 1, 0, 0, 1);
          var home = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Home.png"), 0, 0, 454, 137, 1, 1, 0, 0, 1);
          var restart = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Restart.png"), 0, 0, 792, 137, 1, 1, 0, 0, 1);
          var gameoverScale = 1;
          var homeScale = 0.4;
          var restartScale = 0.4;
          gameover.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 600 * gameoverScale) / 2, 150, gameoverScale);

          if (gameEngine.mouse) {
            var mouseX = gameEngine.mouse.x;
            var mouseY = gameEngine.mouse.y; // hover effect for "home"

            var startX = 245;
            var endX = 400;
            var startY = 338;
            var endY = 380;

            if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
              var scaleup = homeScale + 0.1;
              var offset = (137 * scaleup - 137 * homeScale) / 2;
              home.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 454 * scaleup) / 3.5, 400 - offset, scaleup);
            } else {
              home.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 454 * homeScale) / 3.5, 400, homeScale);
            } // hover effect for "restart"


            startX = 555;
            startY = 332;
            endX = 820;
            endY = 381;

            if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
              var scaleup = restartScale + 0.1;
              var offset = (137 * scaleup - 137 * restartScale) / 2;
              restart.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 792 * scaleup) * 3 / 4, 400 - offset, scaleup);
            } else {
              restart.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 792 * restartScale) * 3 / 4, 400, restartScale);
            } // restart lvl

          } else {
            home.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 600 * gameoverScale) / 2, 400, homeScale);
            restart.drawFrame(gameEngine.clockTick, ctx, (canvasWidth - 792 * restartScale) * 3 / 4, 400, restartScale);
          }

          break;

        case "gamewon":
          break;
      }
    }
  }, {
    key: "update",
    value: function update() {}
  }]);

  return Transition;
}();