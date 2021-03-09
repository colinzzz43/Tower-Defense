class MG extends Tower {
  // lvl 1
  static maxHP = 200;
  static fireRate = 0.5; 
  static shootingRadius = 70; 
  static damage = 20; 
  static cost = 40; 
  
  // lvl 2
  static maxHP2 = 300;
  static fireRate2 = 0.3;
  static shootingRadius2 = 70;
  static damage2 = 20;
  static cost2 = 60;

  // lvl 3
  static maxHP3 = 400;
  static fireRate3 = 0.3;
  static shootingRadius3 = 90;
  static damage3 = 30;
  static cost3 = 80;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/mg/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/mg/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/mg/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 24;
    this.frameHeight = 40;
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
    this.HP = MG.maxHP;
    this.fireRate = MG.fireRate;
    this.shootingRadius = MG.shootingRadius * this.scale; 
    this.damage = MG.damage; 
    this.cost = MG.cost;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(MG.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);
    
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch(this.facing) {
      case 1:
        bulletX = this.x + 9*this.scale;
        bulletY = this.y - this.yOffset + 5*this.scale;
        break;
      case 2:
        bulletX = this.x + 12*this.scale;
        bulletY = this.y - this.yOffset + 10*this.scale;
        break;
      case 3:
        bulletX = this.x + 12*this.scale;
        bulletY = this.y - this.yOffset + 16*this.scale;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 20*this.scale;
        break;
      case 5:
        bulletX = this.x - 12*this.scale;
        bulletY = this.y - this.yOffset + 16*this.scale;
        break;
      case 6:
        bulletX = this.x - 12*this.scale;
        bulletY = this.y - this.yOffset + 10*this.scale;
        break;
      case 7:
        bulletX = this.x - 12*this.scale;
        bulletY = this.y - this.yOffset + 5*this.scale;
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
        this.user.decreaseBalance(MG.cost2);
        this.HP = MG.maxHP2;
        this.fireRate = MG.fireRate2;
        this.shootingRadius = MG.shootingRadius2 * this.scale; 
        this.damage = MG.damage2; 

        this.frameHeight = 46;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

      } else {
        this.user.decreaseBalance(MG.cost3);
        this.HP = MG.maxHP3;
        this.fireRate = MG.fireRate3;
        this.shootingRadius = MG.shootingRadius3 * this.scale; 
        this.damage = MG.damage3; 
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
