class Pistol extends Tower {
  // lvl 1
  static maxHP = 150;
  static fireRate = 1; 
  static shootingRadius = 70; 
  static damage = 20; 
  static cost = 20; 
  
  // lvl 2
  static maxHP2 = 250;
  static fireRate2 = 0.8;
  static shootingRadius2 = 70;
  static damage2 = 20;
  static cost2 = 40;

  // lvl 3
  static maxHP3 = 350;
  static fireRate3 = 1;
  static shootingRadius3 = 90;
  static damage3 = 30;
  static cost3 = 60;

  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = [];
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level1/1_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level2/2_sheet.png"));
    this.spritesheet.push(ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level3/3_sheet.png"));

    this.animations = [];
    this.frameWidth = 16;
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

    // stats
    this.HP = Pistol.maxHP;
    this.fireRate = Pistol.fireRate;
    this.shootingRadius = Pistol.shootingRadius * this.scale; 
    this.damage = Pistol.damage; 
    this.cost = Pistol.cost;

    this.depreciated = 0.8;
    this.radius = 10 * this.scale;

    // other
    this.xOffset = (this.frameWidth * this.scale) / 2;
    this.yOffset = (this.frameHeight - 5) * this.scale;

    this.buy(Pistol.cost);
  }

  shoot(enemy) {
    // shooting animation
    // enemy.takeHit(this.damage);
    
    var bulletX = this.x;
    var bulletY = this.y - this.yOffset;
    switch(this.facing) {
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
      new PistolBullet(
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
        this.user.decreaseBalance(Pistol.cost2);
        this.HP = Pistol.maxHP;
        this.fireRate = Pistol.fireRate;
        this.shootingRadius = Pistol.shootingRadius * this.scale; 
        this.damage = Pistol.damage; 

        this.frameHeight = 44;
        this.yOffset = this.frameHeight * this.scale - 5 * this.scale;
      } else {
        this.user.decreaseBalance(Pistol.cost3);
        this.HP = Pistol.maxHP;
        this.fireRate = Pistol.fireRate;
        this.shootingRadius = Pistol.shootingRadius * this.scale; 
        this.damage = Pistol.damage; 

        this.frameHeight = 45;
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
