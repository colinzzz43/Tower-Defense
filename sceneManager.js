class SceneManager {
  constructor(game, ctx) {
	  
	Object.assign(this, {game, ctx});
    this.game = game;
    this.game.camera = this;

    ASSET_MANAGER.getAsset("./soundeffects/BGM.mp3");
    this.BGM = new Audio("./soundeffects/BGM.mp3");


    
//  this.user = this.game.user;

//	this.base = this.game.base;
	
    this.currentWave = 0;
    this.scores = 0;

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
	this.waveTimer = 5;
	this.timerRestarted = false;
	this.speedChanged = false;
    this.timerInterval = null;
    // this.startTimer();
	
	
	  // Load the prototype level, along with user and tower store menus, to the game engine
	  this.loadGamePrototype();
  }
  
  // commented out as this.waveTimes is not defined
//   startTimer() {
// 	if (this.timerRestarted || this.speedChanged) {
// 		clearInterval(this.timerInterval);
// 		this.timerRestarted = false;
// 		this.speedChanged = false;
// 	}
//     this.timerInterval = setInterval(() => {
// 	  if (!this.paused) {
// 		// The amount of time passed increments by one
// 		this.waveTimer -= 0.1;

// 		// Countdown to next wave. When 0, increment current wave
// 		// and reset waveTimer to that wave's time
// 		if (this.waveTimer <= 0) {
// 			if (this.currentWave == 0 || this.currentWave < this.waveTimes.length - 1) {
// 				this.currentWave++;
// 				this.waveTimer = this.waveTimes[this.currentWave];
				
// 			} else {
// 				this.waveTimer = -1;
// 			}
// 		}

// 	  }
//     }, (100 / this.speed) );
//   };


  loadGamePrototype() {
	  
	// user entity created first 
	this.user = new User(this.game);
	this.game.addEntity(this.user);  
	
	// level entity
	var map = ASSET_MANAGER.getAsset("./Level/images/map_prototype.png");
	var level = new Level(gameEngine, map, this.levelMap.xCanvas, this.levelMap.yCanvas, 
						  0, 0, 600, 400, 1.5, 1, this.ctx);
	this.game.addEntity(level);
	
	// After level entity is added to game engine, new field 'levelEnemyWaves' is 
	// put into level to ensure enemies are drawn on top of map image
	// level.levelEnemyWaves = new LevelWave(level);
	
	// tower store menu
	var towerStoreMenu = new TowerStoreMenu(gameEngine, 1055, 5, this.ctx, level);
	// new field towerStoreMenu added to level for tower selection interaction
	level.towerStoreMenu = towerStoreMenu;
	this.game.addEntity(towerStoreMenu);
	  
	// user menu
	var userMenu = new UserMenu(gameEngine, 5, 55, this.ctx, level);
	this.game.addEntity(userMenu);
	
	// description box
	var descriptionMenu = new DescriptionBox(gameEngine, 5, 605, this.ctx, level);
	this.game.addEntity(descriptionMenu);

	// hud
	var hud = new HUD(gameEngine, 5, 5, this.ctx, level);
	this.game.addEntity(hud);
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
		horizontalAlign = this.levelMap.xCanvas + (this.levelMap.width * 0.6);
		if (this.HP > 0) { // show hp when above 0, else show defeat
		  ctx.fillText("Base: " + this.HP + " " + "HP", horizontalAlign, verticalAlign);
		} else  {
		  ctx.fillText("DEFEAT" , horizontalAlign, verticalAlign);
		}
		ctx.fillText(this.currentWave + " / " + this.waveTimes.length + " waves", horizontalAlign, verticalAlign * 1.1);
		
		// Time
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.85);
		ctx.fillText("TIME", horizontalAlign, verticalAlign);
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.885);
		ctx.fillText(Math.floor(this.waveTimer + 1), horizontalAlign, verticalAlign * 1.1);
	};

  /*
    Mute the background music
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
