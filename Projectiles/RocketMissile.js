class RocketMissile extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/rocket.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 13, 7, 1, 1, 0, false, true);

        // animation stats
        this.scale = 2;
        this.xOffset = 3 * this.scale;
        this.yOffset = 3 * this.scale;
        this.frameWidth = 13;
        this.frameHeight = 7;

        // stats
        this.canRotate = true;
        this.radius = 4 * this.scale;
        this.maxSpeed = 100; // pixels per second
    }
}