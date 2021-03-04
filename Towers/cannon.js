class Cannon extends Tower {
  static cost = 40;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/cannon/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 23;
    this.frameHeight = 33;
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
    this.HP = 30;
    this.maxHP = this.HP;
    this.fireRate = 1.3; // Fire rate: Slow
    this.shootingRadius = 50 * PARAMS.SCALE; // Range: Medium
    this.damage = 15; // Damage: Strong
    this.cost = 40; // Cost: 40 coins
    this.upgradeCost = 60;
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 + 2;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(Cannon.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);

    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) {
      case 1:
        bulletX = this.x + 10 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 2 * PARAMS.SCALE;
        break;
      case 2:
        bulletX = this.x + 9 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 9 * PARAMS.SCALE;
        break;
      case 3:
        bulletX = this.x + 8 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 14 * PARAMS.SCALE;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 15 * PARAMS.SCALE;
        break;
      case 5:
        bulletX = this.x - 8 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 14 * PARAMS.SCALE;
        break;
      case 6:
        bulletX = this.x - 9 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 9 * PARAMS.SCALE;
        break;
      case 7:
        bulletX = this.x - 10 * PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 2 * PARAMS.SCALE;
        break;
    }

    this.gameEngine.addEntity(
      new Cannonball(
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
        this.user.decreaseBalance(65);
        this.fireRate += 0.75;
        this.maxHP += 30;
        this.HP = this.maxHP;
      } else {
        this.user.decreaseBalance(90);
        this.shootingRadius += 5 * PARAMS.SCALE;
        this.damage += 10;
        this.maxHP += 60;
        this.HP = this.maxHP;
      }
    }
  };
}
