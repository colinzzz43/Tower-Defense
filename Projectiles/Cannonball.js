class Cannonball extends Projectile {

    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/cannonball.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 17, 17, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1;
        this.xOffset = 8.5 * this.scale;
        this.yOffset = 8.5 * this.scale;
        this.frameWidth = 17;
        this.frameHeight = 17;

        // stats
        this.canRotate = false;
        this.radius = 8.5 * this.scale;
        this.maxSpeed = 150; // pixels per second
    }
}