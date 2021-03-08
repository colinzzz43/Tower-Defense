class Laser extends Tower {
  static cost = 50;
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
    this.HP = 200;
    this.maxHP = this.HP;
    this.fireRate = 0.2; // Fire rate: Very Fast
    this.shootingRadius = 90 * this.scale; // Range: Long
    this.damage = 10; // Damage: Weak
    this.cost = 50; // Cost: 50 coins
    this.upgradeCost = 140;
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
    if (this.towerLevel < 3) {
      this.towerLevel++;
      if (this.towerLevel == 2) {
        this.user.decreaseBalance(90);
        this.shootingRadius += 10 * this.scale;
        this.maxHP += 10;
        this.HP = this.maxHP;


        this.frameHeight = 44;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

      } else {
        this.user.decreaseBalance(120);
        this.damage += 20;
        this.maxHP += 30;
        this.HP = this.maxHP;


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
