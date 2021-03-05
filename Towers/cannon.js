class Cannon extends Tower {
  static cost = 40;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    this.gameEngine.camera.cannon = this;


    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/cannon/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/cannon/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/cannon/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 23;
    this.frameHeight = 33;
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
    console.log(this.scale);
    this.HP = 30;
    this.maxHP = this.HP;
    this.fireRate = 1.3; // Fire rate: Slow
    this.shootingRadius = 50 * this.scale; // Range: Medium
    this.damage = 15; // Damage: Strong
    this.cost = 40; // Cost: 40 coins
    this.upgradeCost = 60;
    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Cannon.cost);

  }

  shoot(enemy) {
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) {
      case 1:
        bulletX = this.x + 10 * this.scale;
        bulletY = this.y - this.yOffset + 2 * this.scale;
        break;
      case 2:
        bulletX = this.x + 9 * this.scale;
        bulletY = this.y - this.yOffset + 9 * this.scale;
        break;
      case 3:
        bulletX = this.x + 8 * this.scale;
        bulletY = this.y - this.yOffset + 14 * this.scale;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 15 * this.scale;
        break;
      case 5:
        bulletX = this.x - 8 * this.scale;
        bulletY = this.y - this.yOffset + 14 * this.scale;
        break;
      case 6:
        bulletX = this.x - 9 * this.scale;
        bulletY = this.y - this.yOffset + 9 * this.scale;
        break;
      case 7:
        bulletX = this.x - 10 * this.scale;
        bulletY = this.y - this.yOffset + 2 * this.scale;
        break;
    }
    if (this.facing > 2 && this.facing < 6) {
      this.gameEngine.addEntity(
        new Cannonball(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this
        )
      );
    } else {
      this.gameEngine.entities.splice(
        this.index, 
        0, 
        new Cannonball(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this
        )
      );
    }
  };

  upgrade() {
    if (this.towerLevel < 3) {
      this.towerLevel++;
      if (this.towerLevel == 2) {
        this.user.decreaseBalance(65);
        this.fireRate += 0.75;
        this.maxHP += 30;
        this.HP = this.maxHP;


        this.frameHeight = 43;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

      } else {
        this.user.decreaseBalance(90);
        this.shootingRadius += 5 * this.scale;
        this.damage += 10;
        this.maxHP += 60;
        this.HP = this.maxHP;
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
