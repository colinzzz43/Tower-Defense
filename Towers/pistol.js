class Pistol extends Tower {
    constructor(gameEngine, x, y, level) {
        super(gameEngine, x, y, level);

        // spritesheet and animation
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level1/pistol-tower-sheet.png");
        this.animations = [];
        var i;
        for (i = 0; i < 8; i++) {
            this.animations.push(new Animator(this.spritesheet, 16 * i, 0,
                (this.frameWidth = 16), (this.frameHeight = 37), 1, 1, 0, false, true));
        }

        // stats
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