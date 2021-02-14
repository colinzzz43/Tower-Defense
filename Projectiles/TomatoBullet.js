class TomatoBullet extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/bullet_tomato.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 22, 22, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1.5;
        this.xOffset = 11 * this.scale;
        this.yOffset = 11 * this.scale;
        this.frameWidth = 22;
        this.frameHeight = 22;

        // stats
        this.canRotate = false;
        this.radius = 5 * this.scale;
        this.maxSpeed = 120;
    }
}