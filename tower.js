class Tower {
  constructor(gameEngine, x, y) {
    Object.assign(this, { gameEngine, x, y });
    
    //assets
    this.spritesheet = ASSET_MANAGER.getAsset("./prototype-tower.png");
    this.animations = [];
    this.animations.push(new Animator(this.spritesheet, 0, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16*2, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16*3, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16*4, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16*5, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16*6, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16*7, 0, this.frameWidth = 16, this.frameHeight = 37, 1, 1, 0, false, true));

    //stats
    this.facing = 0; 
    this.damage = 10;
    this.cost = 10; // basic = 10 for prototype
    this.depreciated = 0.8; // depreciation rate is set to 0.8 for prototype
    this.radius = 10 * PARAMS.SCALE; // entity radius
    this.shootingRadius = 30 * PARAMS.SCALE; // basic = 90 for prototype

    // other
    this.user = this.gameEngine.user; // the user interacting with the tower
    this.xOffset = this.frameWidth*PARAMS.SCALE/2;
    this.yOffset = this.frameHeight*PARAMS.SCALE - 5 * PARAMS.SCALE;
  }

  update() {
    var that = this;

    // tower detection
    this.gameEngine.entities.forEach(function(entity) {
      // tower detection
      if (entity instanceof Slime) {
          // tower shoots enemy in shooting bounds
          if (canShoot(that, entity)) {
            console.log("tower attack");
          }
      }
    });
  }

  shoot() {
    // align the straight line
    // animation
  }

  showBoundingCircle(context) {
    // entity bound
    context.setLineDash([]);
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI
    );
    context.fill();
    context.fillStyle = "#FD0";
    context.stroke();

    // shooting bound
    context.setLineDash([8, 15]);
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.shootingRadius,
      0,
      2 * Math.PI
    );
    context.stroke();
  }

  buy() {
    // check if the user has the sufficient fund
    if (this.user.balance >= this.cost) {
      // draw the tower onto the map

      this.user.decreaseBalance(this.cost);
    } else {
      // debugging purpose
      console.log(" You don't have the sufficient fund.");
    }
  }

  sell() {
    // Add the money back to the user balance
    this.user.increaseBalance(this.cost * this.depreciated);
    // Remove itself from the map (remove entity from the gameengine)
    this.gameEngine.removeEntity(this);
  }

  dead() {
    // Remove itself from the map (remove entity from the gameengine)
    this.gameEngine.removeEntity(this);
    // this.gameEngine.removeFromWorld = true;
  }

  getShootingRange() {
    return this.shootingRadius;
  }

  getPosition() {
    return [this.x, this.y];
  }

  getCost() {
    return this.cost;
  }

  shoot(Enemy) {
    // shooting animation

    Enemy.takeHit(this.damage);
  }

  shoot() {
    // print shoot to console for testing
    console.log("shoot enemy");
  }

  draw(context) {
    this.showBoundingCircle(context);
    this.animations[this.facing].drawFrame(
      this.gameEngine.clockTick,
      context,
      this.x - this.xOffset,
      this.y - this.yOffset,
      PARAMS.SCALE
    );
    // context.drawImage(this.spritesheet, this.x, this.y);
  }
}
