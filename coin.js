class Coin {
    constructor(gameEngine, x , y) {
        Object.assign(this, {gameEngine, x, y});
        this.coinAnimation = new Animator(
            ASSET_MANAGER.getAsset("./sprites/other/coin2.png"),
            0,
            0,
            16,
            16,
            8,
            0.3,
            0,
            false,
            false
        );
        this.elapsedTime = 0;
        this.animationTime = 1.6;
    };

    draw(ctx) {
        this.coinAnimation.drawFrame(
            this.gameEngine.clockTick,
            ctx,
            this.x,
            this.y,
            2
        );
    };

    update() {
        this.elapsedTime += this.gameEngine.clockTick;

        if (this.elapsedTime >= this.animationTime) this.removeFromWorld = true;
    };
}