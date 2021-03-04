class Matter extends Tower {
  static cost = 75;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/matter/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/matter/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/matter/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 24;
    this.frameHeight = 37;
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
    this.HP = 10;
    this.maxHP = this.HP;
    this.fireRate = 1.3; // Fire rate: Slow
    this.shootingRadius = 70 * this.scale; // Range: Long
    this.damage = 1; // Damage: Strong (shockwave damage scaled down because it lingers)
    this.cost = 75; // Cost: 75 coins
    this.upgradeCost = 100;
    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2 + 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Matter.cost);
  }

  shoot(enemy) {
    // shooting animation
    
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch(this.facing) { // TODO make bullets start from turret barrel
      case 1:
        bulletX = this.x + 6*this.scale;
        bulletY = this.y - this.yOffset + 3*this.scale;
        break;
      case 2:
        bulletX = this.x + 5*this.scale;
        bulletY = this.y - this.yOffset + 7*this.scale;
        break;
      case 3:
        bulletX = this.x + 5*this.scale;
        bulletY = this.y - this.yOffset + 9*this.scale;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 11*this.scale;
        break;
      case 5:
        bulletX = this.x - 5*this.scale;
        bulletY = this.y - this.yOffset + 9*this.scale;
        break;
      case 6:
        bulletX = this.x - 5*this.scale;
        bulletY = this.y - this.yOffset + 7*this.scale;
        break;
      case 7:
        bulletX = this.x - 6*this.scale;
        bulletY = this.y - this.yOffset + 3*this.scale;
        break;
    }

    this.gameEngine.addEntity(
      new MatterRay(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
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

        this.frameHeight = 45;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale; 
               
      } else {
        this.user.decreaseBalance(90);
        this.shootingRadius += 5 * this.scale;
        this.damage += 10;
        this.HP += 60;

        this.frameHeight = 48;
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
