// this class hasn't been tested yet, it was from Chris' github

/*
Arguments
- game: game engine
- x, y: the position of bullet (projectile)
- bulletProperties: an object that contains asset path, frameWidth, frameHeight, canRotate, and type of bullet
- target: the entity that is the target
- shootingEntity: pass in either tower or enemy in order to access damage it inflicts
*/
class Bullet {

  constructor(game, x, y, bulletProperties, target, shootingEntity) {
    Object.assign(this, { game, x, y, bulletProperties, target, shootingEntity});
 
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
    // this.cache = [];
     
    // stats
    this.maxSpeed = 200; // pixels per second
    this.radius = this.bulletProperties.radius * PARAMS.SCALE;
      
    var dist = distance(this, this.target);
    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };

    // this.elapsedTime = 0;
  }

  drawAngle(ctx, angle) {}

  update() {
    var dist = distance()
  }

  draw(ctx) {
    var xOffset = this.bulletProperties.xOffset * PARAMS.SCALE;
    var yOffset = this.bulletProperties.yOffset *PARAMS.SCALE;

    if (this.bulletProperties.canRotate) {
      let angle = Math.atan2(this.velocity.y, this.velocity.x);
      if (angle < 0) angle += 2*Math.PI;
      let degrees = Math.floor(angle * 180 / Math.PI);

      this.draw(ctx, degrees);

    } else {
      this.animation.drawFrame(this.gameEngine.clockTick, ctx, this.x - xOffset, this.y - yOffset, PARAMS.SCALE);
    }
  }
}
