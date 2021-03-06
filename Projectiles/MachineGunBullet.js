class MachineGunBullet extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/bulletc.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 11, 8, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1.5;
        this.xOffset = 4 * this.scale;
        this.yOffset = 4 * this.scale;
        this.frameWidth = 11;
        this.frameHeight = 8;

        // stats
        this.canRotate = true;
        this.radius = 4 * this.scale;
        this.maxSpeed = 200;
    }
}