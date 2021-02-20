// this class hasn't been tested yet, it was from Chris' github

/*
Arguments
@gameEngine: gameEngine engine
@x, y: the position of bullet (projectile)
@target: the entity that is the target
@shootingEntity: pass in either tower or enemy in order to access damage it inflicts
*/
class Projectile {

  constructor(gameEngine, x, y, target, shootingEntity) {
    Object.assign(this, { gameEngine, x, y, target, shootingEntity });

    this.cache = []; // to store rotated image
    this.startX = x;
    this.startY = y;

    var dist = distance(this, this.target);
    this.velocity = {
      x: ((this.target.x - this.x) / dist) * this.maxSpeed,
      y: ((this.target.y - this.y) / dist) * this.maxSpeed,
    };
	
	// the animation and movement speed multiplier for projectile
	this.projectileSpeedMultiplier = this.gameEngine.speed;
	
	// the pause state for projectile
	this.projectilePaused = this.gameEngine.paused;

  }

  drawAngle(ctx, angle) {
    if (angle < 0 || angle > 359) return;

    if (!this.cache[angle]) {
      let radians = angle * Math.PI / 180;
      let offscreenCanvas = document.createElement('canvas');

      offscreenCanvas.width = Math.max(this.frameWidth, this.frameHeight);
      offscreenCanvas.height = Math.max(this.frameWidth, this.frameHeight);

      let offscreenCtx = offscreenCanvas.getContext('2d');
      offscreenCtx.imageSmoothingEnabled = false;
      offscreenCtx.setTransform(1, 0, 0, 1, offscreenCanvas.width / 2, offscreenCanvas.height / 2); // translate + scale
      offscreenCtx.rotate(radians); // rotate
      offscreenCtx.drawImage(this.spritesheet, -offscreenCanvas.width/2, -offscreenCanvas.height/2);
      offscreenCtx.setTransform(1, 0, 0, 1, 0, 0); // translate + scale
      this.cache[angle] = offscreenCanvas; // save into cache
    }
    ctx.drawImage(this.cache[angle], 0, 0, this.cache[angle].width, this.cache[angle].height, this.x - this.xOffset, this.y - this.yOffset, this.cache[angle].width * this.scale, this.cache[angle].height * this.scale);


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
		}

		if (this.target.removeFromWorld) {
		  this.removeFromWorld = true;
		}		
	}
	

<<<<<<< HEAD
    this.x += this.velocity.x * this.gameEngine.clockTick;
    this.y += this.velocity.y * this.gameEngine.clockTick;

    if (collide(this, this.target)) {
      this.target.takeHit(this.shootingEntity.damage);
      this.removeFromWorld = true;
    }

    if (distance({x: this.x, y: this.y}, {x: this.startX, y: this.startY}) > this.shootingEntity.shootingRadius) {
      this.removeFromWorld = true;
    }
=======
>>>>>>> Page
  };

  draw(ctx) {
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
		
      this.animation.drawFrame( (this.gameEngine.clockTick * speedMultiplier), ctx, this.x - this.xOffset, this.y - this.yOffset, this.scale);
    }
  }
}
