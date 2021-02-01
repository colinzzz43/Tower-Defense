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
    this.HP = 0;
    this.coins = 0;
    this.round = 0;
    this.waves = 0;
  }

  update() {}

  addCoin() {}

  draw(ctx) {
    ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
    ctx.fillStyle = "White";
    ctx.fillText("MARRIOTT", 1.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
    ctx.fillText(
      (this.score + "").padStart(8, "0"),
      1.5 * PARAMS.BLOCKWIDTH,
      1.5 * PARAMS.BLOCKWIDTH
    );
    ctx.fillText(
      "x" + (this.coins < 10 ? "0" : "") + this.coins,
      6.5 * PARAMS.BLOCKWIDTH,
      1.5 * PARAMS.BLOCKWIDTH
    );
    ctx.fillText("WORLD", 9 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
    ctx.fillText("1-1", 9.5 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);
    ctx.fillText("TIME", 12.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);
    ctx.fillText("400", 13 * PARAMS.BLOCKWIDTH, 1.5 * PARAMS.BLOCKWIDTH);

    this.coinAnimation.drawFrame(this.game.clockTick, ctx, 500, 200, 3);
  }
}
