class Spazer extends Tower {
  static cost = 75;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/spazer/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/spazer/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/spazer/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 22;
    this.frameHeight = 30;
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
    this.HP = 100;
    this.maxHP = this.HP;
    this.upgradeCost = 25;
    this.fireRate = 1.3; // Fire rate: Slow
    this.shootingRadius = 50 * this.scale; // Range: Medium
    this.damage = 5; // Damage: Weak
    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Spazer.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);

    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) {
      case 1:
        bulletX = this.x + 6 * this.scale;
        bulletY = this.y - this.yOffset + 3 * this.scale;
        break;
      case 2:
        bulletX = this.x + 5 * this.scale;
        bulletY = this.y - this.yOffset + 7 * this.scale;
        break;
      case 3:
        bulletX = this.x + 5 * this.scale;
        bulletY = this.y - this.yOffset + 9 * this.scale;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 11 * this.scale;
        break;
      case 5:
        bulletX = this.x - 5 * this.scale;
        bulletY = this.y - this.yOffset + 9 * this.scale;
        break;
      case 6:
        bulletX = this.x - 5 * this.scale;
        bulletY = this.y - this.yOffset + 7 * this.scale;
        break;
      case 7:
        bulletX = this.x - 6 * this.scale;
        bulletY = this.y - this.yOffset + 3 * this.scale;
        break;
    }

    this.gameEngine.addEntity(
      new SpazerRay(
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
        this.HP += 30;

        this.frameHeight = 41;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
      } else {
        this.user.decreaseBalance(90);
        this.shootingRadius += 5 * this.scale;
        this.damage += 10;
        this.HP += 60;

        this.frameHeight = 42;
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
