class MG extends Tower {
  static cost = 25; // Cost: 25 coins
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/mg/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 24;
    this.frameHeight = 40;
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
    this.fireRate = 0.5; // Fire rate: Fast
    this.shootingRadius = 50 * PARAMS.SCALE; // Range: Medium
    this.damage = 10; // Damage: Moderate
    this.cost = 25; // Cost: 25 coins
    this.upgradeCost = 25;
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 - 3;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(MG.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);
    
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch(this.facing) {
      case 1:
        bulletX = this.x + 9*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 5*PARAMS.SCALE;
        break;
      case 2:
        bulletX = this.x + 12*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 10*PARAMS.SCALE;
        break;
      case 3:
        bulletX = this.x + 12*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 16*PARAMS.SCALE;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 20*PARAMS.SCALE;
        break;
      case 5:
        bulletX = this.x - 12*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 16*PARAMS.SCALE;
        break;
      case 6:
        bulletX = this.x - 12*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 10*PARAMS.SCALE;
        break;
      case 7:
        bulletX = this.x - 12*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 5*PARAMS.SCALE;
        break;
    }

    this.gameEngine.addEntity(
      new MachineGunBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this
      )
    );
  }

  // Upgrades the tower by one level, increasing stats and changing tower animation
  upgrade() {
    if (this.towerLevel < 3) {
      this.towerLevel++;
      if (this.towerLevel == 2) {
        this.user.decreaseBalance(40);
        this.HP += 20;
        this.fireRate -= .3;
      } else {
        this.user.decreaseBalance(60);
        this.HP += 40;
        this.damage += 15;
        this.shootingRadius +=  20 * PARAMS.SCALE;
      }
    }
  };
}
