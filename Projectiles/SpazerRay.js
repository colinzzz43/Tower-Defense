class SpazerRay extends Projectile {

    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/mine1.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 17, 17, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1;
        this.xOffset = 8.5 * this.scale;
        this.yOffset = 8.5 * this.scale;
        this.frameWidth = 17;
        this.frameHeight = 17;

        // stats
        this.canRotate = true;
        this.radius = 8.5;
        this.maxSpeed = 150; // pixels per second
    }

    update() {
        this.projectileSpeedMultiplier = this.gameEngine.speed;	
        this.projectilePaused = this.gameEngine.paused;	
        
        // if projectile is paused, then don't update projectile
        if (this.projectilePaused) {
            // do nothing
        } else {
            var dist = distance(this, this.target);
            this.velocity = {
              x: ((this.target.x - this.x) / dist) * this.maxSpeed,
              y: ((this.target.y - this.y) / dist) * this.maxSpeed,
            };
    
            this.x += (this.velocity.x * this.gameEngine.clockTick) * this.projectileSpeedMultiplier;
            this.y += (this.velocity.y * this.gameEngine.clockTick) * this.projectileSpeedMultiplier;
    
            if (collide(this, this.target)) {
              this.target.takeHit(this.shootingEntity.damage);
              this.removeFromWorld = true;
              this.target.controlled = true;
              console.log("hello " + this.target.controlled);
            }
    
            if (this.target.removeFromWorld) {
              this.removeFromWorld = true;
            }		
        }
    }
}
