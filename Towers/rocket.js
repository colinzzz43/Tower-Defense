class Rocket extends Tower {
  // lvl 1
  static maxHP = 100;
  static fireRate = 1.2; 
  static shootingRadius = 90; 
  static damage = 50; 
  static cost = 70; 
  
  // lvl 2
  static maxHP2 = 200;
  static fireRate2 = 1;
  static shootingRadius2 = 90;
  static damage2 = 50;
  static cost2 = 90;

  // lvl 3
  static maxHP3 = 300;
  static fireRate3 = 1;
  static shootingRadius3 = 110;
  static damage3 = 80;
  static cost3 = 110;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/rocket/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/rocket/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/rocket/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 23;
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
    this.HP = Rocket.maxHP;
    this.fireRate = Rocket.fireRate;
    this.shootingRadius = Rocket.shootingRadius * this.scale; 
    this.damage = Rocket.damage; 
    this.cost = Rocket.cost;
    this.upgradeCost = Rocket.cost2;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Rocket.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);

    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) {
      case 1:
        bulletX = this.x + 10 * this.scale;
        bulletY = this.y - this.yOffset + 2 * this.scale;
        break;
      case 2:
        bulletX = this.x + 11.5 * this.scale;
        bulletY = this.y - this.yOffset + 9 * this.scale;
        break;
      case 3:
        bulletX = this.x + 6.5 * this.scale;
        bulletY = this.y - this.yOffset + 15 * this.scale;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 11 * this.scale;
        break;
      case 5:
        bulletX = this.x - 6.5 * this.scale;
        bulletY = this.y - this.yOffset + 15 * this.scale;
        break;
      case 6:
        bulletX = this.x - 11.5 * this.scale;
        bulletY = this.y - this.yOffset + 9 * this.scale;
        break;
      case 7:
        bulletX = this.x - 10 * this.scale;
        bulletY = this.y - this.yOffset + 2 * this.scale;
        break;
    }

    this.gameEngine.addEntity(
      new RocketMissile(
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
      this.user.decreaseBalance(this.upgradeCost);
      this.cost += this.upgradeCost;

      if (this.towerLevel == 2) {
        this.HP = Rocket.maxHP2;
        this.fireRate = Rocket.fireRate2;
        this.shootingRadius = Rocket.shootingRadius2 * this.scale; 
        this.damage = Rocket.damage2; 
        this.upgradeCost = Rocket.cost3;

        this.frameHeight = 47;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

      } else {
        this.HP = Rocket.maxHP3;
        this.fireRate = Rocket.fireRate3;
        this.shootingRadius = Rocket.shootingRadius3 * this.scale; 
        this.damage = Rocket.damage3; 
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
