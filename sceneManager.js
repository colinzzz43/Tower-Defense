class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;

    this.coinAnimation = new Animator(
      ASSET_MANAGER.getAsset("./sprites/other/coin2.png"),
      0,
      0,
      16,
      16,
      8,
      0.2,
      0,
      false,
      true
    );
    this.base = this.game.base;
    this.user = this.game.user;
    this.waves = 1;
    this.scores = 0;
  }

  update() {
    this.HP = this.base.HP;
    this.coins = this.user.balance;
  }

  addCoin() {}

  draw(ctx) {
    this.gameStatsDisplay(ctx);
    this.coinAnimation.drawFrame(this.game.clockTick, ctx, 500, 200, 3);
  }
  gameStatsDisplay(ctx) {
    ctx.font = "30px Langar, cursive, serif, sans-serif";
    ctx.fillStyle = "White";
    ctx.fillText("Tower Defense", 1.5 * 60, 1 * 60);
    ctx.fillText(
      ("Scores: " + this.scores).padStart(8, "0"),
      1.5 * 60,
      1.5 * 60
    );
    ctx.fillText(
      "x" + (this.coins < 10 ? "0" : "") + this.coins + " coins",
      6.5 * 60,
      1.5 * 60
    );
    ctx.fillText("HP" + " " + this.HP, 9 * 60, 1 * 60);
    ctx.fillText(this.waves + " / 10 waves", 9.5 * 60, 1.5 * 60);
    ctx.fillText("TIME", 12.7 * 60, 1 * 60);
    ctx.fillText("400", 13 * 60, 1.5 * 60);
  }
  // stats: score, currency, HP, waves
  // Store
  //
}
