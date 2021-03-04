class Spazer extends Tower {
  static cost = 75;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    this.gameEngine.spazer = this;

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/spazer/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 22;
    this.frameHeight = 30;
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
    this.HP = 100;
    this.maxHP = this.HP;
    this.upgradeCost = 25;
    this.fireRate = 1.3; // Fire rate: Slow
    this.shootingRadius = 50 * PARAMS.SCALE; // Range: Medium
    this.damage = 5; // Damage: Weak
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 - 3;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(Spazer.cost);
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
      new SpazerRay(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this
      )
    );
      }
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
