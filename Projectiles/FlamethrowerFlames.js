class FlamethrowerFlames extends Projectile {
    constructor(gameEngine, x, y, target, shootingEntity, bulletOffset) {
        super(gameEngine, x, y, target, shootingEntity); 
        this.bulletOffset = bulletOffset;
        this.xStart = x;
        this.yStart = y;     

        // animations
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/flamethrower_bullet.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 26, 10, 1, 1, 0, false, true);

        // animation stats
        this.scale = 1;
        this.xOffset = 13 * this.scale;
        this.yOffset = 5 * this.scale;
        this.frameWidth = 26;
        this.frameHeight = 10;

        // stats
        this.canRotate = true;
        this.radius = 13 * this.scale;
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
          let ent = this.gameEngine.entities[i];
          if (ent instanceof Enemy && ent.exist && collide(this, ent)) {
            ent.takeHit(this.shootingEntity.damage);
            this.removeFromWorld = true;
          }

          let dx = this.x - this.xStart;
          let dy = this.y - this.yStart;
          let distTraveled = Math.sqrt(dx * dx + dy * dy);


          if (distTraveled > this.shootingEntity.shootingRadius) {
            this.removeFromWorld = true;
          }
        }			
      }
    };
    
}