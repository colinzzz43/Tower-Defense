class Flamethrower extends Tower {
  static cost = 40; // Cost: 40 coins

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
    this.HP = 300;
    this.maxHP = this.HP;
    this.fireRate = 0.2; // Fire rate: Very Fast
    this.shootingRadius = 30 * this.scale; // Range: Short
    this.damage = 0.05; // Damage: Weak (scaled for multiple lingering flames)
    this.cost = 40; // Cost: 40 coins
    this.upgradeCost = 40;
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
        this.user.decreaseBalance(65);
        this.shootingRadius += 20 * this.scale;
        this.maxHP += 20;
        this.HP = this.maxHP;

        this.frameHeight = 48;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
        
      } else {
        this.user.decreaseBalance(90);
        this.damage += 15;
        this.maxHP += 40;
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
