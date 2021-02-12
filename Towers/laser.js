class Laser extends Tower {
  static cost = 90;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/laser/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 22;
    this.frameHeight = 35;
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
    this.HP = 10;
    this.maxHP = this.HP;
    this.fireRate = 0.4; // Fire rate: Very Fast
    this.shootingRadius = 70 * PARAMS.SCALE; // Range: Long
    this.damage = 5; // Damage: Weak
    this.cost = 90; // Cost: 90 coins
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 - 3;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(Laser.cost);
  }
}
