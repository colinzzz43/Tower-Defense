class Laser extends Tower {
  static cost = 90;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/laser/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 22;
    this.frameHeight = 35;
    var i;
    for (i = 0; i < 8; i++) {
      this.animations.push(
        new Animator(
          this.spritesheet,
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
    this.HP = 10;
    this.maxHP = this.HP;
    this.fireRate = 0.4; // Fire rate: Very Fast
    this.shootingRadius = 70 * PARAMS.SCALE; // Range: Long
    this.damage = 5; // Damage: Weak
    this.cost = 90; // Cost: 90 coins
    this.upgradeCost = 140;
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 - 3;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(Laser.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);

    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) {
      case 1:
        bulletX = this.x + 9 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 1 * PARAMS.SCALE;
        break;
      case 2:
        bulletX = this.x + 9 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 11 * PARAMS.SCALE;
        break;
      case 3:
        bulletX = this.x + 7 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 14 * PARAMS.SCALE;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 15 * PARAMS.SCALE;
        break;
      case 5:
        bulletX = this.x - 7 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 14 * PARAMS.SCALE;
        break;
      case 6:
        bulletX = this.x - 9 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 11 * PARAMS.SCALE;
        break;
      case 7:
        bulletX = this.x - 9 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 1 * PARAMS.SCALE;
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
        this.shootingRadius += 10 * PARAMS.SCALE;
        this.maxHP += 10;
        this.HP = this.maxHP;
      } else {
        this.user.decreaseBalance(120);
        this.damage += 20;
        this.maxHP += 30;
        this.HP = this.maxHP;
      }
    }
  };
}
