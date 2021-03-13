class Cannon extends Tower {
  // lvl 1
  static maxHP = 200;
  static fireRate = 1.3;
  static shootingRadius = 70;
  static damage = 50;
  static cost = 40;
  
  // lvl 2
  static maxHP2 = 300;
  static fireRate2 = 1;
  static shootingRadius2 = 70;
  static damage2 = 50;
  static cost2 = 60;

  // lvl 3
  static maxHP3 = 400;
  static fireRate3 = 1;
  static shootingRadius3 = 90;
  static damage3 = 100;
  static cost3 = 80;

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
    this.HP = Cannon.maxHP;
    this.fireRate = Cannon.fireRate; // Fire rate: Slow
    this.shootingRadius = Cannon.shootingRadius * this.scale; // Range: Medium
    this.damage = Cannon.damage; // Damage: Strong
    this.cost = Cannon.cost; // Cost: 40 coins
    this.upgradeCost = Cannon.cost2;
    console.log(this.upgradeCost);


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
    if (this.towerLevel < 3 && this.user.balance >= this.upgradeCost) {
      this.towerLevel++;
      console.log(this.upgradeCost);
      this.user.decreaseBalance(this.upgradeCost);
      this.cost += this.upgradeCost;

      if (this.towerLevel == 2) {
        this.HP = Cannon.maxHP2;
        this.fireRate = Cannon.fireRate2;
        this.shootingRadius = Cannon.shootingRadius2 * this.scale;
        this.damage = Cannon.damage2;
        this.upgradeCost = Cannon.cost3;

        this.frameHeight = 43;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

      } else {
        this.HP = Cannon.maxHP3;
        this.fireRate = Cannon.fireRate3;
        this.shootingRadius = Cannon.shootingRadius3 * this.scale;
        this.damage = Cannon.damage3;
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
