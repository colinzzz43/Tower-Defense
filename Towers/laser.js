class Laser extends Tower {
  // lvl 1
  static maxHP = 200;
  static fireRate = 0.2; 
  static shootingRadius = 90; 
  static damage = 10; 
  static cost = 60; 
  
  // lvl 2
  static maxHP2 = 300;
  static fireRate2 = 0.2; 
  static shootingRadius2 = 110;
  static damage2 = 10; 
  static cost2 = 80;

  // lvl 3
  static maxHP3 = 400;
  static fireRate3 = 0.2; 
  static shootingRadius3 = 110;
  static damage3 = 15;
  static cost3 = 100;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/laser/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/laser/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/laser/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 22;
    this.frameHeight = 35;
    var i;
    for (i = 0; i < 8; i++) {
      this.animations.push(
        new Animator(
          this.spritesheet[this.towerLevel - 1],
          this.frameWidth * i,
          0,
          this.frameWidth,
          this.frameHeight,
          1,
          1,
          0,
          false,
          true
        )
      );
    }

    //stats
    this.HP = Laser.maxHP;
    this.fireRate = Laser.fireRate;
    this.shootingRadius = Laser.shootingRadius * this.scale;
    this.damage = Laser.damage;
    this.cost = Laser.cost;
    this.upgradeCost = Laser.cost2;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Laser.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);

    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) {
      case 1:
        bulletX = this.x + 9 * this.scale;
        bulletY = this.y - this.yOffset + 1 * this.scale;
        break;
      case 2:
        bulletX = this.x + 9 * this.scale;
        bulletY = this.y - this.yOffset + 11 * this.scale;
        break;
      case 3:
        bulletX = this.x + 7 * this.scale;
        bulletY = this.y - this.yOffset + 14 * this.scale;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 15 * this.scale;
        break;
      case 5:
        bulletX = this.x - 7 * this.scale;
        bulletY = this.y - this.yOffset + 14 * this.scale;
        break;
      case 6:
        bulletX = this.x - 9 * this.scale;
        bulletY = this.y - this.yOffset + 11 * this.scale;
        break;
      case 7:
        bulletX = this.x - 9 * this.scale;
        bulletY = this.y - this.yOffset + 1 * this.scale;
        break;
    }

    this.gameEngine.addEntity(
      new LaserBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this
      )
    );
  };

  upgrade() {
    if (this.towerLevel < 3 && this.user.balance >= this.upgradeCost) {
      this.towerLevel++;
      this.user.decreaseBalance(this.upgradeCost);
      this.cost += this.upgradeCost;

      if (this.towerLevel == 2) {
        this.HP = Laser.maxHP2;
        this.fireRate = Laser.fireRate2;
        this.shootingRadius = Laser.shootingRadius2 * this.scale;
        this.damage = Laser.damage2;
        this.upgradeCost = Laser.cost3;

        this.frameHeight = 44;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

      } else {
        this.HP = Laser.maxHP3;
        this.fireRate = Laser.fireRate3;
        this.shootingRadius = Laser.shootingRadius3 * this.scale;
        this.damage = Laser.damage3;

        this.frameHeight = 46;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
      }

      this.animations = [];
      var i;
      for (i = 0; i < 8; i++) {
        this.animations.push(
          new Animator(
            this.spritesheet[this.towerLevel - 1],
            this.frameWidth * i,
            0,
            this.frameWidth,
            this.frameHeight,
            1,
            1,
            0,
            false,
            true
          )
        );
      }
    }
  };
}
