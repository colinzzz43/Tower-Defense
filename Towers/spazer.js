class Spazer extends Tower {
  // lvl 1
  static maxHP = 100;
  static fireRate = 1; 
  static shootingRadius = 70; 
  static controlTime = 5;
  static cost = 80;
  
  // lvl 2
  static maxHP2 = 200;
  static fireRate2 = 1;
  static shootingRadius2 = 70;
  static controlTime2 = 7.5;
  static cost2 = 100;

  // lvl 3
  static maxHP3 = 300;
  static fireRate3 = 0.8;
  static shootingRadius3 = 90;
  static controlTime3 = 10;
  static cost3 = 120;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    this.gameEngine.spazer = this;

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
    this.HP = Spazer.maxHP;
    this.fireRate = Spazer.fireRate;
    this.shootingRadius = Spazer.shootingRadius * this.scale; 
    this.damage = 0;
    this.controlTime = Spazer.controlTime;
    this.cost = Spazer.cost;
    this.upgradeCost = Spazer.cost2;

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
    if (this.towerLevel < 3 && this.user.balance >= this.upgradeCost) {
      this.towerLevel++;
      this.user.decreaseBalance(this.upgradeCost);
      this.cost += this.upgradeCost;

      if (this.towerLevel == 2) {
        this.HP = Spazer.maxHP2;
        this.fireRate = Spazer.fireRate2;
        this.shootingRadius = Spazer.shootingRadius2 * this.scale; 
        this.controlTime = Spazer.controlTime2;
        this.upgradeCost = Spazer.cost3;

        this.frameHeight = 41;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
      } else {
        this.HP = Spazer.maxHP3;
        this.fireRate = Spazer.fireRate3;
        this.shootingRadius = Spazer.shootingRadius3 * this.scale; 
        this.controlTime = Spazer.controlTime3;

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
