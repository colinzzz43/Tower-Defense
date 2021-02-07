class PistolTower extends Tower {
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level1/pistol-tower-sheet.png");
    this.animations = [];
    this.animations.push(new Animator(this.spritesheet, 0, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16 * 2, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16 * 3, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16 * 4, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16 * 5, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16 * 6, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
    this.animations.push(new Animator(this.spritesheet, 16 * 7, 0,
        (this.frameWidth = 16), (this.frameHeight = 37), 1, 1 ,0, false, true));
    //stats
    this.HP = 20;
    this.maxHP = this.HP;
    this.facing = 0;
    this.damage = 10;
    this.cost = 10; // basic = 10 for prototype
    this.depreciated = 0.8; // depreciation rate is set to 0.8 for prototype
    this.radius = 10 * PARAMS.SCALE; // entity radius
    this.shootingRadius = 50 * PARAMS.SCALE; // basic = 90 for prototype
    this.fireRate = 1;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 5 * PARAMS.SCALE;
  }
}

class MachineGunTower extends Tower {
    constructor(gameEngine, x, y, level) {
      super(gameEngine, x, y, level);
      this.spritesheet = ASSET_MANAGER.getAsset("./prototype-tower.png");
      this.animations = [];
      this.animations.push(new Animator(this.spritesheet, 0, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16 * 2, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16 * 3, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16 * 4, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16 * 5, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16 * 6, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
      this.animations.push(new Animator(this.spritesheet, 16 * 7, 0,
          (this.frameWidth = 16), (this.frameHeight = 37), 1, 1 ,0, false, true));
      //stats
      this.HP = 10;
      this.maxHP = this.HP;
      this.facing = 0;
      this.damage = 10;
      this.cost = 10; // basic = 10 for prototype
      this.depreciated = 0.8; // depreciation rate is set to 0.8 for prototype
      this.radius = 10 * PARAMS.SCALE; // entity radius
      this.shootingRadius = 50 * PARAMS.SCALE; // basic = 90 for prototype
      this.fireRate = 0.5;
  
      // other
      this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2;
      this.yOffset = this.frameHeight * PARAMS.SCALE - 5 * PARAMS.SCALE;
    }
  }
