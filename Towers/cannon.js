class Cannon extends Tower {
    constructor(gameEngine, x, y, level) {
        super(gameEngine, x, y, level);

        // spritesheet and animation
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/towers/cannon/Level1/1_sheet.png");
        this.animations = [];

        var i;
        for (i = 0; i < 8; i++) {
        this.animations.push(new Animator(this.spritesheet, 23 * i, 0,
            (this.frameWidth = 22), (this.frameHeight = 34), 1, 1, 0, false, true));
        }

        //stats
        this.HP = 10;
        this.maxHP = this.HP;
        this.fireRate = 1.3; // Fire rate: Slow
        this.shootingRadius = 50 * PARAMS.SCALE; // Range: Medium
        this.damage = 15; // Damage: Strong
        this.cost = 40; // Cost: 40 coins
        this.facing = 6; // facing left default
        this.depreciated = 0.8;
        this.radius = 10 * PARAMS.SCALE;

        // other
        this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2 + 2;
        this.yOffset = this.frameHeight * PARAMS.SCALE - 20;
    }
}