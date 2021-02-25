class SceneManager {
  constructor(game, ctx) {
	  
	Object.assign(this, {game, ctx});
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
    
//  this.user = this.game.user;

//	this.base = this.game.base;
	
    this.waves = 1;
    this.scores = 0;

    this.height = 480;
	
	// Level Map Screen
	this.levelMap = {
		xCanvas: 150,
		yCanvas: 0,
		width: 900,
		height: 600
	};
	
	this.canvasMap = {
		width: PARAMS.WIDTH,
		height: PARAMS.HEIGHT
	};
	
	// Pause Screen
	this.paused = false;
//	this.game.paused = this.paused;
	
	// Game Speed
	this.speed = 1;
//	this.game.speed = this.speed;
    
	// Game Mute
	this.muted = false;
	
	    // Timer
    this.TIME_LIMIT = 5;
    this.timePassed = 0;
	this.timerRestarted = false;
	this.speedChanged = false;
    this.timeLeft = this.TIME_LIMIT;
    this.timerInterval = null;
    this.startTimer();
	
	
	// Load the prototype level, along with user and tower store menus, to the game engine
	this.loadGamePrototype();
  }
  
  startTimer() {
	if (this.timerRestarted || this.speedChanged) {
		clearInterval(this.timerInterval);
		this.timerRestarted = false;
		this.speedChanged = false;
	}
    this.timerInterval = setInterval(() => {
	  if (!this.paused) {
		// The amount of time passed increments by one
		this.timePassed += 0.1;
		this.timeLeft = this.TIME_LIMIT - this.timePassed;
		if (this.timeLeft < 0) {
			this.timeLeft = 0;
		}
	  }
    }, (100 / this.speed) );
  };


  loadGamePrototype() {
	  
	// user entity created first 
	this.user = new User(this.game);
	this.game.addEntity(this.user);  
	
	// level entity
	var map = ASSET_MANAGER.getAsset("./Level/map_prototype.png");
	var level = new Level(gameEngine, map, this.levelMap.xCanvas, this.levelMap.yCanvas, 
						  0, 0, 600, 400, 1.5, 1, this.ctx);
	this.game.addEntity(level);
	
	// After level entity is added to game engine, new field 'levelEnemyWaves' is 
	// put into level to ensure enemies are drawn on top of map image
	level.levelEnemyWaves = new LevelWave(level);
	
	// tower store menu
	var towerStoreMenu = new TowerStoreMenu(gameEngine, 1055, 5, this.ctx, level);
	this.game.addEntity(towerStoreMenu);
	  
	// user menu
	var userMenu = new UserMenu(gameEngine, 5, 5, this.ctx, level);
	this.game.addEntity(userMenu);
	
  };


  update() {
//	this.muted = this.game.muted;
//	this.speed = this.game.speed;
//	this.paused = this.game.paused;
    this.HP = this.base.HP;
    this.coins = this.user.balance;
    this.scores = this.game.camera.user.scores;
	if (this.timerRestarted || this.speedChanged) {
		this.startTimer();
	}
  };

  addCoin() {};

  /*
	Display the game stats
  */
  draw(ctx) {
	  this.gameStatsDisplay(ctx);
	  this.coinAnimation.drawFrame(
		  this.game.clockTick,
		  ctx,
		  this.levelMap.xCanvas + (this.levelMap.width * 0.335),
		  this.levelMap.yCanvas + (this.levelMap.height * 0.82),
		  3
	  );
	  if (this.paused) this.drawPauseScreen(ctx);
	  if (this.muted || this.paused) 
		this.muteBGM()
	  else {

		this.BGM.volume = 0.1;
		this.BGM.muted = false;
		this.BGM.play(); 
	  }
  };

	/*
		Display the game stats, excluding the coin animation
	*/
	gameStatsDisplay(ctx) {
		var horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.05);
		var verticalAlign = this.levelMap.yCanvas +
			(this.levelMap.height * 0.8);
		  
		// Tower Defense Game Name and Scores
		ctx.font = "30px Langar, cursive, serif, sans-serif";
		ctx.fillStyle = "White";
		ctx.fillText("Tower Defense", horizontalAlign, verticalAlign);
		ctx.fillText(
			("Scores: " + this.scores).padStart(8, "0"),
			horizontalAlign,
			verticalAlign * 1.1
		);
		
		// Coin Currency
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.38);
		ctx.fillText(
			"x" + (this.coins < 10 ? "0" : "") + this.coins + " coins",
			horizontalAlign,
			verticalAlign * 1.1
		);

		// HP and Waves
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.6);
		if (this.HP > 0) { // show hp when above 0, else show defeat
		  ctx.fillText("Base: " + this.HP + " " + "HP", horizontalAlign, verticalAlign);
		} else  {
		  ctx.fillText("DEFEAT" , horizontalAlign, verticalAlign);
		}
		ctx.fillText(this.waves + " / 10 waves", horizontalAlign, verticalAlign * 1.1);
		
		// Time
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.85);
		ctx.fillText("TIME", horizontalAlign, verticalAlign);
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.885);
		ctx.fillText(Math.floor(this.timeLeft), horizontalAlign, verticalAlign * 1.1);
	};

  /*
  
  */
  muteBGM () {
      this.BGM.volume = 0;
      this.BGM.play();
     
  };
  
  /*
	 draw the transparent pause screen on the level map
  */
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
  };
 
}
