class LaserBullet extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/laserbullet.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 132, 60, 1, 1, 0, false, true);

        // animation stats
        this.scale = 0.1;
        this.xOffset = 67 * this.scale;
        this.yOffset = 30 * this.scale;
        this.frameWidth = 132;
        this.frameHeight = 60;

        // stats
        this.canRotate = true;
        this.radius = 67 * this.scale;
        this.maxSpeed = 100; // pixels per second
    }
}