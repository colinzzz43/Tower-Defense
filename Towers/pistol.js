class Pistol extends Tower {
  static cost = 10;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/pistol/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 16;
    this.frameHeight = 37;
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

    // stats
    this.HP = 100;
    this.maxHP = this.HP;
    this.fireRate = 1; // Fire rate: Moderate
    this.shootingRadius = 50 * PARAMS.SCALE; // Range: Medium
    this.damage = 10; // Damage: Moderate
    this.cost = 10; // Cost: 10 coins
    this.upgradeCost = 15;
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2;
    this.yOffset = (this.frameHeight - 5) * PARAMS.SCALE;

    this.buy(Pistol.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);
    
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch(this.facing) {
      case 1:
        bulletX = this.x + 6*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 3*PARAMS.SCALE;
        break;
      case 2:
        bulletX = this.x + 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 7*PARAMS.SCALE;
        break;
      case 3:
        bulletX = this.x + 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 9*PARAMS.SCALE;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 11*PARAMS.SCALE;
        break;
      case 5:
        bulletX = this.x - 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 9*PARAMS.SCALE;
        break;
      case 6:
        bulletX = this.x - 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 7*PARAMS.SCALE;
        break;
      case 7:
        bulletX = this.x - 6*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 3*PARAMS.SCALE;
        break;
    }

    this.gameEngine.addEntity(
      new PistolBullet(
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
        this.user.decreaseBalance(20);
        this.maxHP += 20;
        this.HP = this.maxHP;
        this.fireRate -= .3;
      } else {
        this.user.decreaseBalance(30);
        this.maxHP += 40;
        this.HP = this.maxHP;
        this.damage += 15;
        this.shootingRadius +=  20 * PARAMS.SCALE;
      }
    }
  };

}
