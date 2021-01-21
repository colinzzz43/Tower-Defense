class Tower {
  constructor(Game, Enemy, x, y) {
    Object.assign(this, { Game });
    // Position
    this.position = {
      x: x,
      y: y,
    };

    this.spritesheet = ASSET_MANAGER.getAsset("./tower_pistol_lv3leftdown.png");

    this.Enemy = Enemy;

    // basic = 10 for prototype
    this.cost = 10;

    // basic = 1 for prototype
    this.shootingRange = 100;

    this.shootable = false;

    this.calculateEnemyDistance(this.Enemy, this.position);
  }

  showProjectile(context) {
    context.beginPath();
    context.arc(
      this.position.x + 7.5,
      this.position.y + 22,
      this.shootingRange,
      0,
      2 * Math.PI
    );
    context.fill();
    context.fillStyle = "#FD0";

    context.stroke();
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
    if (this.isShootable) {
      // Shoot the bullet which animates the bullet to hit the target
    }
  }
  update(deltaTime) {}

  draw(context) {
    this.showProjectile(context);
    context.drawImage(this.spritesheet, this.position.x, this.position.y);
  }
}
