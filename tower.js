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

    this.shootable = false;

    this.calculateEnemyDistance(this.Enemy, this.position);
  }

  showProjectile(context) {
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

  buy() {
    // check if the user has the sufficient fund
    if (user.balance >= this.cost) {
      // draw the tower onto the map

      user.balance -= this.cost;
    } else {
      // debugging purpose
      console.log(" You don't have the sufficient fund.");
    }
  }

  sell() {
    // Remove itself from the map

    // Add the money back to the user balance
    user.balance += this.cost * this.depreciated;
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

  calculateEnemyDistance(Enemy, Tower) {
    // my position = this.x and this.y
    // return my position - enemy's position

    var dx = Math.abs(Tower.x - Enemy.x);
    var dy = Math.abs(Tower.y - Enemy.y);
    var distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
  }

  isShootable() {
    // calculateEnemyDistance < shootingRange return true
    if (this.calculateEnemyDistance() <= this.getShootingRange())
      this.shootable = true;
    return this.shootable;
  }

  shoot() {
    // shoot the closest target to the tower
    if (this.isShootable) {
      // Shoot the bullet which animates the bullet to hit the target
      // create collision (tower - bullet - monster)
    }
  }
  update(deltaTime) {}

  draw(context) {
    this.showProjectile(context);
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
