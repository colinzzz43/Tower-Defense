class Shotgun extends Tower {
  static cost = 40;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/shotgun/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/shotgun/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/shotgun/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 22;
    this.frameHeight = 34;
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
    this.HP = 300;
    this.maxHP = this.HP;
    this.fireRate = 1; // Fire rate: Moderate
    this.shootingRadius = 30 * this.scale; // Range: Short
    this.damage = 20; // Damage: Strong
    this.cost = 25; // 25 coins
    this.upgradeCost = 40;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Shotgun.cost);
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
      new ShotgunBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        30
      )
    );
    
    this.gameEngine.addEntity(
      new ShotgunBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        15
      )
    );

    this.gameEngine.addEntity(
      new ShotgunBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        0
      )
    );

    this.gameEngine.addEntity(
      new ShotgunBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        -15
      )
    );


    this.gameEngine.addEntity(
      new ShotgunBullet(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        -30
      )
    );
  }

  // Upgrades the tower by one level, increasing stats and changing tower animation
  upgrade() {
    if (this.towerLevel < 3) {
      this.towerLevel++;
      if (this.towerLevel == 2) {
        this.user.decreaseBalance(40);
        this.maxHP += 20;
        this.HP = this.maxHP;
        this.fireRate -= .3;

        this.frameHeight = 41;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
      } else {
        this.user.decreaseBalance(60);
        this.maxHP += 40;
        this.HP = this.maxHP;
        this.damage += 15;
        this.shootingRadius +=  20 * this.scale;

        this.frameHeight = 44;
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
