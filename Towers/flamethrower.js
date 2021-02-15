class Flamethrower extends Tower {
  static cost = 40; // Cost: 40 coins

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/flamethrower/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 33;
    this.frameHeight = 36;
    var i;
    for (i = 0; i < 8; i++) {
      this.animations.push(
        new Animator(
          this.spritesheet,
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
    this.HP = 50;
    this.maxHP = this.HP;
    this.fireRate = 0.5; // Fire rate: Very Fast
    this.shootingRadius = 30 * PARAMS.SCALE; // Range: Short
    this.damage = 5; // Damage: Weak
    this.cost = 40; // Cost: 40 coins
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 + 2;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(Flamethrower.cost);
  }

  shoot(enemy) {
    // shooting animation
    
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch(this.facing) {
      case 1:
        bulletX = this.x + 6*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 3*PARAMS.SCALE;
        break;
      case 2:
        bulletX = this.x + 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 7*PARAMS.SCALE;
        break;
      case 3:
        bulletX = this.x + 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 9*PARAMS.SCALE;
        break;
      case 4:
        bulletX = this.x;
        bulletY = this.y - this.yOffset + 11*PARAMS.SCALE;
        break;
      case 5:
        bulletX = this.x - 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 9*PARAMS.SCALE;
        break;
      case 6:
        bulletX = this.x - 5*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 7*PARAMS.SCALE;
        break;
      case 7:
        bulletX = this.x - 6*PARAMS.SCALE;
        bulletY = this.y - this.yOffset + 3*PARAMS.SCALE;
        break;
    }

    this.gameEngine.addEntity(
      new FlamethrowerFlames(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        50
      )
    );
    
    this.gameEngine.addEntity(
      new FlamethrowerFlames(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        25
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
        -25
      )
    );


    this.gameEngine.addEntity(
      new FlamethrowerFlames(
        this.gameEngine,
        bulletX,
        bulletY,
        enemy,
        this,
        -50
      )
    );
  }
}
