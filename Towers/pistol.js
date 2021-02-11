class Pistol extends Tower {
  static cost = 10;
  constructor(gameEngine, x, y, level) {
    super(gameEngine, x, y, level);

    // spritesheet and animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/pistol/Level1/1_sheet.png"
    );
    this.animations = [];
    this.frameWidth = 16;
    this.frameHeight = 37;
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

    // stats
    this.HP = 30;
    this.maxHP = this.HP;
    this.fireRate = 1; // Fire rate: Moderate
    this.shootingRadius = 50 * PARAMS.SCALE; // Range: Medium
    this.damage = 10; // Damage: Moderate
    this.cost = 10; // Cost: 10 coins
    this.depreciated = 0.8;
    this.radius = 10 * PARAMS.SCALE;

    // other
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 15;

    this.buy(Pistol.cost);
  }
}
