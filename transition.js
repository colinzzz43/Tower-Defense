class Transition {
    // Four types: "title", "gameover", "gamewon", "levelselect"
    constructor(type) {
        Object.assign(this, { type });
    };

    draw(ctx) {
        var canvasWidth = ctx.canvas.width;
        var canvasHeight = ctx.canvas.height;

        switch (this.type) {
            case "title":
                var title = new Animator(ASSET_MANAGER.getAsset("./sprites/title.png"), 0, 0, 1372, 139, 1, 1, 0, 0, 1);
                var play = new Animator(ASSET_MANAGER.getAsset("./sprites/levelselect/Start.png"), 0, 0, 558, 137, 1, 1, 0, 0, 1);

                ctx.fillRect(0, 0, canvasWidth, canvasHeight);

                const titleScale = 0.75;
                const playScale = 0.5;
                const playScale2 = 0.6;
                // ctx.drawImage(title, 0, 0, 1372, 139, 100, 200, 1372 * titleScale, 139 * titleScale);
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

                const scale1 = 0.7;
                const scale2 = 0.8;
                const scale3 = 0.8;
                const scale4 = 0.8;

                var col1 = canvasWidth / 4;
                var col2 = canvasWidth * 4 / 5;
                var row1 = canvasHeight / 5;
                var row2 = canvasHeight * 4 / 5;

                var mouseX = gameEngine.mouse.x;
                var mouseY = gameEngine.mouse.y;

                // level 1

                lvl1.drawFrame(gameEngine.clockTick, ctx, col1 - 510 * scale1 / 2, row2 - 180 * scale1 / 2, scale1);
                if (mouseX > 105 && mouseX < 390 && mouseY > 470 && mouseY < 562) {
                    var scaleup = scale1 + 0.1;
                    lvl1.drawFrame(gameEngine.clockTick, ctx, col1 - 510 * scaleup / 2, row2 - 180 * scaleup / 2, scaleup);
                }

                // level 2

                lvl2.drawFrame(gameEngine.clockTick, ctx, col2 - 286 * scale2 / 2, row2 - 109 * scale2 / 2, scale2);
                if (mouseX > 710 && mouseX < 890 && mouseY > 480 && mouseY < 540) {
                    var scaleup = scale2 + 0.1;
                    lvl2.drawFrame(gameEngine.clockTick, ctx, col2 - 286 * scaleup / 2, row2 - 109 * scaleup / 2, scaleup);
                }

                // level 3
                lvl3.drawFrame(gameEngine.clockTick, ctx, col2 - 283 * scale3 / 2, row1 - 107 * scale3 / 2, scale3);
                if (mouseX > 710 && mouseX < 885 && mouseY > 100 && mouseY < 160) {
                    var scaleup = scale3 + 0.1;
                    lvl3.drawFrame(gameEngine.clockTick, ctx, col2 - 283 * scaleup / 2, row1 - 107 * scaleup / 2, scaleup);
                }

                // level 4
                lvl4.drawFrame(gameEngine.clockTick, ctx, col1 - 293 * scale4 / 2, row1 - 106 * scale4 / 2, scale4);
                if (mouseX > 160 && mouseX < 340 && mouseY > 105 && mouseY < 155) {
                    var scaleup = scale4 + 0.1;
                    lvl4.drawFrame(gameEngine.clockTick, ctx, col1 - 293 * scaleup / 2, row1 - 106 * scaleup / 2, scaleup);
                }
                break;
            case "gameover":
                var gameover = ASSET_MANAGER.getAsset("./sprites/levelselect/Gameover.png");
                var 
                break;

            case "gamewon":
                break;
        }
    };

    update() {
        
    };

}