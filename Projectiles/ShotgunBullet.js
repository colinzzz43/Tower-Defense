class ShotgunBullet extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity, bulletOffset) {
        super(gameEngine, x, y, target, shootingEntity); 
        this.bulletOffset = bulletOffset;     

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/bulletb.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 10, 8, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1;
        this.xOffset = 4 * this.scale;
        this.yOffset = 4 * this.scale;
        this.frameWidth = 10;
        this.frameHeight = 8;

        // stats
        this.canRotate = true;
        this.radius = 4 * this.scale;
        this.maxSpeed = 150; // pixels per second

        var dist = distance(this, this.target);
        this.velocity = {
            x: ((this.target.x - this.x + this.bulletOffset) / dist) * this.maxSpeed,
            y: ((this.target.y - this.y + this.bulletOffset) / dist) * this.maxSpeed,
        };       
    }

    update() {
		this.projectileSpeedMultiplier = this.gameEngine.camera.speed;	
		this.projectilePaused = this.gameEngine.camera.paused;	
		
		if (this.projectilePaused) {
			// do nothing
		} else {
			this.x += this.velocity.x * this.gameEngine.clockTick * this.projectileSpeedMultiplier;
			this.y += this.velocity.y * this.gameEngine.clockTick * this.projectileSpeedMultiplier;
		
			for (var i = 0; i < this.gameEngine.entities.length; i++) {
				var ent = this.gameEngine.entities[i];
				if (ent instanceof Enemy && ent.exist && collide(this, ent)) {
					ent.takeHit(this.shootingEntity.damage);
					this.removeFromWorld = true;
				}
			}

            if (this.x < 150 || this.x > 1045 || this.y < 70 || this.y > 658) this.removeFromWorld = true;
		}
    };
    
}