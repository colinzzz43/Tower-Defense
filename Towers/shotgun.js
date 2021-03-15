class Shotgun extends Tower {
  // lvl 1
  static maxHP = 300;
  static fireRate = 1; 
  static shootingRadius = 30; 
  static damage = 20; 
  static cost = 40; 
  
  // lvl 2
  static maxHP2 = 500;
  static fireRate2 = 1;
  static shootingRadius2 = 30;
  static damage2 = 25;
  static cost2 = 60;

  // lvl 3
  static maxHP3 = 700;
  static fireRate3 = 1;
  static shootingRadius3 = 50;
  static damage3 = 30;
  static cost3 = 80;

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
    this.HP = Shotgun.maxHP;
    this.fireRate = Shotgun.fireRate;
    this.shootingRadius = Shotgun.shootingRadius * this.scale; 
    this.damage = Shotgun.damage; 
    this.cost = Shotgun.cost;
    this.upgradeCost = Shotgun.cost2;

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
    if (this.towerLevel < 3 && this.user.balance >= this.upgradeCost) {
      this.towerLevel++;
      this.user.decreaseBalance(this.upgradeCost);
      this.cost += this.upgradeCost;

      if (this.towerLevel == 2) {
        this.HP = Shotgun.maxHP2;
        this.fireRate = Shotgun.fireRate2;
        this.shootingRadius = Shotgun.shootingRadius2 * this.scale; 
        this.damage = Shotgun.damage2; 
        this.upgradeCost = Shotgun.cost3;

        this.frameHeight = 41;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
      } else {
        this.HP = Shotgun.maxHP3;
        this.fireRate = Shotgun.fireRate3;
        this.shootingRadius = Shotgun.shootingRadius3 * this.scale; 
        this.damage = Shotgun.damage3; 

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
