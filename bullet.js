// this class hasn't been tested yet, it was from Chris' github

/*
Arguments
- gameEngine: gameEngine engine
- x, y: the position of bullet (projectile)
- bulletProperties: an object that contains asset path, frameWidth, frameHeight, canRotate, and type of bullet
- target: the entity that is the target
- shootingEntity: pass in either tower or enemy in order to access damage it inflicts
*/
class Bullet {

  constructor(gameEngine, x, y, bulletProperties, target, shootingEntity) {
    Object.assign(this, { gameEngine, x, y, bulletProperties, target, shootingEntity});
 
    // animations
    this.spritesheet = ASSET_MANAGER.getAsset(this.bulletProperties.asset);
    this.animation = new Animator(
      this.spritesheet, 
      0, 0, 
      this.bulletProperties.frameWidth, 
      this.bulletProperties.frameHeight, 
      1, 1, 0, 
      false, true
    );
    this.cache = []; // to store rotated image
     
    // stats
    this.maxSpeed = 200; // pixels per second
    this.radius = this.bulletProperties.radius * PARAMS.BULLETSCALE;
      
    var dist = distance(this, this.target);
    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };

  }

  drawAngle(ctx, angle) {
    if (angle < 0 || angle > 359) return;

    if (!this.cache[angle]) {
      let radians = angle * Math.PI / 180; 
      let offscreenCanvas = document.createElement('canvas');

      offscreenCanvas.width = this.bulletProperties.frameWidth * PARAMS.BULLETSCALE;
      offscreenCanvas.height = this.bulletProperties.frameHeight * PARAMS.BULLETSCALE;

      let offscreenCtx = offscreenCanvas.getContext('2d');

      offscreenCtx.save();
      offscreenCtx.translate(offscreenCanvas.width/2, offscreenCanvas.height/2);
      offscreenCtx.rotate(radians);
      offscreenCtx.translate(-1*offscreenCanvas.width/2, -1*offscreenCanvas.height/2);
      offscreenCtx.drawImage(this.spritesheet, 
        0, 0, 
        this.bulletProperties.frameWidth * PARAMS.BULLETSCALE, this.bulletProperties.frameHeight * PARAMS.BULLETSCALE,
        0, 0,
        offscreenCanvas.width, offscreenCanvas.height
      );
      offscreenCtx.restore();
      this.cache[angle] = offscreenCanvas;

      let xOffset = this.bulletProperties.xOffset * PARAMS.BULLETSCALE;
      let yOffset = this.bulletProperties.yOffset * PARAMS.BULLETSCALE;

      ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset);


    }
  }

  update() {
    var dist = distance(this, this.target);
    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };

    this.x += this.velocity.x * this.gameEngine.clockTick;
    this.y += this.velocity.y * this.gameEngine.clockTick;

    for (var i = 0; i < this.gameEngine.entities.length; i++) {
      var ent = this.gameEngine.entities[i];
      
      if ((ent instanceof Tower) && (this.shootingEntity instanceof Slime) && collide(this, ent)) {
        ent.takeHit(this.shootingEntity.damage);
        this.removeFromWorld = true;
      } 

      if ((ent instanceof Slime) && (this.shootingEntity instanceof Tower) && collide(this, ent)) {
        ent.takeHit(this.shootingEntity.damage);
        this.removeFromWorld = true;
      }
    }
  };

  draw(ctx) {
    var xOffset = this.bulletProperties.xOffset * PARAMS.BULLETSCALE;
    var yOffset = this.bulletProperties.yOffset * PARAMS.BULLETSCALE;

    if (this.bulletProperties.canRotate) {
      let angle = Math.atan2(this.velocity.y, this.velocity.x);
      if (angle < 0) angle += 2*Math.PI;
      let degrees = Math.floor(angle * 180 / Math.PI);

      this.drawAngle(ctx, degrees);

    } else {
      this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x - xOffset, this.y - yOffset, PARAMS.BULLETSCALE);
    }
  }
}
