class SceneManager {
  constructor(game) {
    this.game = game;
    this.game.camera = this;

    ASSET_MANAGER.getAsset("./soundeffects/BGM.mp3");
    this.BGM = new Audio("./soundeffects/BGM.mp3");

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

    this.height = 480;
    // Timer
    this.TIME_LIMIT = 20;

    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timerInterval = null;
    this.startTimer();
	
	// Level Map Screen
	this.levelMap = {
		xCanvas: 150,
		yCanvas: 0,
		width: 900,
		height: 600
	}
	
	// Pause Screen
	this.paused = false;
	this.game.paused = this.paused;
	
	// Game speed
	this.speed = 1;
	this.game.speed = this.speed;
    
  this.muted = false;


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
  this.muted = this.game.muted;
	this.speed = this.game.speed;
	this.paused = this.game.paused;
    this.HP = this.game.base.HP;
    this.coins = this.user.balance;
    this.scores = this.game.user.scores;
  }

  addCoin() {}

  draw(ctx) {
    this.gameStatsDisplay(ctx);
    this.coinAnimation.drawFrame(
      this.game.clockTick,
      ctx,
      5.7 * 60,
      1.035 * this.height,
      3
    );
	if (this.paused) this.drawPauseScreen(ctx);
  if (this.muted || this.paused) this.muteBGM()
  else {
    this.BGM.volume = 0.1;
    this.BGM.play(); 
  };
  }
  gameStatsDisplay(ctx) {
    ctx.font = "30px Langar, cursive, serif, sans-serif";
    ctx.fillStyle = "White";
    ctx.fillText("Tower Defense", 1.5 * 60, 1 * this.height);
    ctx.fillText(
      ("Scores: " + this.scores).padStart(8, "0"),
      1.5 * 60,
      1.1 * this.height
    );
    ctx.fillText(
      "x" + (this.coins < 10 ? "0" : "") + this.coins + " coins",
      6.5 * 60,
      1.1 * this.height
    );

    if (this.HP > 0) { // show hp when above 0, else show defeat
      ctx.fillText(this.HP + " " + "HP", 9.5 * 60, 1 * this.height);
    } else  {
      ctx.fillText("DEFEAT" , 9.5 * 60, 1 * this.height);
    }
    ctx.fillText(this.waves + " / 10 waves", 9.5 * 60, 1.1 * this.height);
    ctx.fillText("TIME", 12.7 * 60, 1 * this.height);
    ctx.fillText(this.timeLeft, 13 * 60, 1.1 * this.height);
  }
  // stats: score, currency, HP, waves
  // Store
  //

  muteBGM () {
      this.BGM.volume = 0;
      this.BGM.play();
     
  }
  
  drawPauseScreen(ctx) {
	ctx.beginPath();
	ctx.globalAlpha = 0.5;
	ctx.fillStyle = "black";
	ctx.fillRect(
		this.levelMap.xCanvas, 
		this.levelMap.yCanvas, 
		this.levelMap.width, 
		this.levelMap.height
	);
	ctx.globalAlpha = 1;	  
	ctx.fillStyle = "white";
	ctx.font = "60px Langar, cursive, serif, sans-serif";	
	var canvasWidthCenter = this.game.ctx.canvas.width;
	var centerX = (canvasWidthCenter - (this.game.ctx.measureText("Paused").width)) / 2 ;
	ctx.fillText("Paused", centerX, 600 / 2);
	ctx.font = "20px Langar, cursive, serif, sans-serif";	
	var pauseSubtitle = "Click Resume to Continue Game"
	centerX = (canvasWidthCenter - (this.game.ctx.measureText(pauseSubtitle).width)) / 2 ;
	ctx.fillText(pauseSubtitle, centerX, 700 / 2);	
	ctx.closePath();
  }
 
}
