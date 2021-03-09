class Flamethrower extends Tower {
  // lvl 1
  static maxHP = 300;
  static fireRate = 0.3; 
  static shootingRadius = 30; 
  static damage = 0.1; 
  static cost = 40; 
  
  // lvl 2
  static maxHP2 = 400;
  static fireRate2 = 0.3; 
  static shootingRadius2 = 50;
  static damage2 = 0.1; 
  static cost2 = 60;

  // lvl 3
  static maxHP3 = 500;
  static fireRate3 = 0.3; 
  static shootingRadius3 = 50;
  static damage3 = 0.2;
  static cost3 = 80;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/flamethrower/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/flamethrower/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/flamethrower/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 33;
    this.frameHeight = 36;
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
    this.HP = Flamethrower.maxHP;
    this.fireRate = Flamethrower.fireRate;
    this.shootingRadius = Flamethrower.shootingRadius * this.scale;
    this.damage = Flamethrower.damage;
    this.cost = Flamethrower.cost;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = this.frameHeight * this.scale - 5 * this.scale;

    this.buy(Flamethrower.cost);
  }

  shoot(enemy) {
    // shooting animation

    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch (this.facing) { // TODO make bullets start from turret barrel
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

    
    
    if (this.facing > 2 && this.facing < 6) {
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          30
        )
      );
  
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          20
        )
      );
  
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          10
        )
      );
  
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          0
        )
      );
  
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          -10
        )
      );
  
  
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          -20
        )
      );
      this.gameEngine.addEntity(
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          -30
        )
      );
      
    } else {
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          30
        )
      );
  
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          20
        )
      );
  
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          10
        )
      );
  
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          0
        )
      );
  
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          -10
        )
      );
  
  
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          -20
        )
      );
      this.gameEngine.entities.splice(
        this.index,
        0,
        new FlamethrowerFlames(
          this.gameEngine,
          bulletX,
          bulletY,
          enemy,
          this,
          -30
        )
      );

    }
  };

  upgrade() {
    if (this.towerLevel < 3) {
      this.towerLevel++;
      if (this.towerLevel == 2) {
        this.user.decreaseBalance(Flamethrower.cost2);
        this.HP = Flamethrower.maxHP2;
        this.fireRate = Flamethrower.fireRate2;
        this.shootingRadius = Flamethrower.shootingRadius2 * this.scale;
        this.damage = Flamethrower.damage2;

        this.frameHeight = 48;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
        
      } else {
        this.user.decreaseBalance(Flamethrower.cost3);
        this.HP = Flamethrower.maxHP3;
        this.fireRate = Flamethrower.fireRate3;
        this.shootingRadius = Flamethrower.shootingRadius3  * this.scale;
        this.damage = Flamethrower.damage3
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
