class MatterRay extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity) {
        super(gameEngine, x, y, target, shootingEntity);
        this.xStart = x;
        this.yStart = y;   

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/shockwave.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 80, 80, 9, 0.3, 80, false, true);

        // animation stats
        this.scale = 1;
        this.xOffset = 40 * this.scale;
        this.yOffset = 40 * this.scale;
        this.frameWidth = 80;
        this.frameHeight = 80;

        // stats
        this.canRotate = false;
        this.radius = 10;
        this.maxSpeed = 150; // pixels per second

        var dist = distance(this, this.target);
        this.velocity = {
            x: ((this.target.x - this.x) / dist) * this.maxSpeed,
            y: ((this.target.y - this.y) / dist) * this.maxSpeed,
        }; 
    }

    update() {
		this.projectileSpeedMultiplier = this.gameEngine.camera.speed;	
		this.projectilePaused = this.gameEngine.camera.paused;	
		
		var speedMultiplier = this.projectileSpeedMultiplier;
		if (this.projectilePaused) {
			speedMultiplier = 0;		
		}
		
        this.x += this.velocity.x * this.gameEngine.clockTick * speedMultiplier;
        this.y += this.velocity.y * this.gameEngine.clockTick * speedMultiplier;

        this.radius += ( .4 * speedMultiplier) ;
    
        for (var i = 0; i < this.gameEngine.entities.length; i++) {
            var ent = this.gameEngine.entities[i];
            if (ent instanceof Enemy && ent.exist && collide(this, ent)) {
                ent.takeHit(this.shootingEntity.damage);
            }

            let dx = this.x - this.xStart;
            let dy = this.y - this.yStart;
            let distTraveled = Math.sqrt(dx * dx + dy * dy);


            if (distTraveled > this.shootingEntity.shootingRadius) {
                this.removeFromWorld = true;
            }
        }
    };

    showBoundingCircle(ctx) {
        // entity bound
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#FD0";
        ctx.fill();
        ctx.stroke();
      }

    draw(ctx) {
        this.showBoundingCircle(ctx);
        if (this.canRotate) {
          let angle = Math.atan2(this.velocity.y, this.velocity.x);
          if (angle < 0) angle += 2 * Math.PI;
          let degrees = Math.floor(angle * 180 / Math.PI);
    
          this.drawAngle(ctx, degrees);
    
        } else {
			var speedMultiplier = this.projectileSpeedMultiplier;
			if (this.projectilePaused) {
				speedMultiplier = 0;		
			}
			
          this.animation.drawFrame(this.gameEngine.clockTick * speedMultiplier, ctx, this.x - this.xOffset, this.y - this.yOffset, this.scale);
        }
    }
}