class Matter extends Tower {
  // lvl 1
  static maxHP = 100;
  static fireRate = 1.3; 
  static shootingRadius = 90; 
  static damage = 2; 
  static cost = 60; 
  
  // lvl 2
  static maxHP2 = 200;
  static fireRate2 = 1;
  static shootingRadius2 = 90;
  static damage2 = 2;
  static cost2 = 80;

  // lvl 3
  static maxHP3 = 300;
  static fireRate3 = 1;
  static shootingRadius3 = 110;
  static damage3 = 4;
  static cost3 = 100;

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
    this.HP = Matter.maxHP;
    this.fireRate = Matter.fireRate;
    this.shootingRadius = Matter.shootingRadius * this.scale; 
    this.damage = Matter.damage; 
    this.cost = Matter.cost;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
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
        this.user.decreaseBalance(Matter.cost2);
        this.HP = Matter.maxHP2;
        this.fireRate = Matter.fireRate2;
        this.shootingRadius = Matter.shootingRadius2 * this.scale; 
        this.damage = Matter.damage2; 

        this.frameHeight = 45;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale; 
               
      } else {
        this.user.decreaseBalance(Matter.cost3);
        this.HP = Matter.maxHP3;
        this.fireRate = Matter.fireRate3;
        this.shootingRadius = Matter.shootingRadius3 * this.scale; 
        this.damage = Matter.damage3; 

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
