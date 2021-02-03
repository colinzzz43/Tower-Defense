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

    // Timer
    this.TIME_LIMIT = 20;

    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timerInterval = null;
    this.startTimer();
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      // The amount of time passed increments by one
      this.timePassed = this.timePassed += 1;
      this.timeLeft = this.TIME_LIMIT - this.timePassed;
      if (this.timeLeft < 1) {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  update() {
    this.HP = this.base.HP;
    this.coins = this.user.balance;
    this.scores = this.game.user.scores;
  }

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
    ctx.fillText(this.HP + " " + "HP", 9.5 * 60, 1 * 60);
    ctx.fillText(this.waves + " / 10 waves", 9.5 * 60, 1.5 * 60);
    ctx.fillText("TIME", 12.7 * 60, 1 * 60);
    ctx.fillText(this.timeLeft, 13 * 60, 1.5 * 60);
  }
}
