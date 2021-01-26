class Tower {
  constructor(Game, Enemy, x, y) {
    Object.assign(this, { Game });
    // Position
    this.position = {
      x: x,
      y: y,
    };

    this.spritesheet = ASSET_MANAGER.getAsset("./prototpye-tower.png");

    this.animations = [];

    this.animations.push(
      new Animator(this.spritesheet, 0, 0, 46, 75, 20, 1, 0, false, true)
    );

    this.Enemy = Enemy;

    // basic = 10 for prototype
    this.cost = 10;

    // depreciation rate is set to 0.8 for prototype
    this.depreciated = 0.8;

    // basic = 100 for prototype
    this.shootingRange = 100;

    this.shootBound = new BoundingCircle(this.position.x + 45, this.position.y + 65,
      this.shootingRange);

    this.shootable = false;

    this.damage = 100;
  }

  updateBC() {
    this.lastBC = this.BC;
    this.BC = new BoundingCircle(this.x, this.y, this.shootingRange); // bounds the slime itself in a circle
  }

  update() {
    var that = this;

    // tower detection
    this.gameEngine.entities.forEach(function (entity) {
      if (entity.BC && that.BC.collide(entity.BC)) {
        if (entity instanceof Slime) that.shoot();
      }
    });
  }

  showProjectile() {
    // align the straight line
    // animation
  }

  showBoundingCircle(context) {
    context.beginPath();
    context.arc(
      this.position.x + 45,
      this.position.y + 65,
      this.shootingRange,
      0,
      2 * Math.PI
    );
    context.fill();
    context.fillStyle = "#FD0";

    context.stroke();
  }

  buy(User) {
    // check if the User has the sufficient fund
    if (User.balance >= this.cost) {
      // draw the tower onto the map

      User.balance -= this.cost;
    } else {
      // debugging purpose
      console.log(" You don't have the sufficient fund.");
    }
  }

  sell(User) {
    // Remove itself from the map

    // Add the money back to the User balance
    User.balance += this.cost * this.depreciated;
  }

  getShootingRange() {
    return this.shootingRange;
  }

  getPosition() {
    return [this.position.x, this.position.y];
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
  
  update(deltaTime) {}

  draw(context) {
    this.showBoundingCircle(context);
    this.animations[0].drawFrame(
      this.Game.clockTick,
      context,
      this.position.x,
      this.position.y,
      2
    );
    // context.drawImage(this.spritesheet, this.position.x, this.position.y);
  }
}
