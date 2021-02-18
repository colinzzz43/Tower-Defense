class MatterRay extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/shockwave.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 80, 80, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1;
        this.xOffset = 8.5 * this.scale;
        this.yOffset = 8.5 * this.scale;
        this.frameWidth = 80;
        this.frameHeight = 80;

        // stats
        this.canRotate = false;
        this.radius = 8.5 * this.scale;
        this.maxSpeed = 150; // pixels per second
    }

    update() {
        this.x += this.velocity.x * this.gameEngine.clockTick;
        this.y += this.velocity.y * this.gameEngine.clockTick;
    
        for (var i = 0; i < this.gameEngine.entities.length; i++) {
            var ent = this.gameEngine.entities[i];
            if (ent instanceof Enemy && ent.exist && collide(this, ent)) {
                ent.takeHit(this.shootingEntity.damage);
            }

        }
    };
}