class SceneManager {
	constructor(game, ctx) {

		Object.assign(this, { game, ctx });
		this.game = game;
		this.game.camera = this;

		ASSET_MANAGER.getAsset("./soundeffects/BGM.mp3");
		this.BGM = new Audio("./soundeffects/BGM.mp3");

		this.currentWave = 0;
		this.scores = 0;
		this.allWavesDefeated = false;

		this.levelMap = {
			xCanvas: 150,
			yCanvas: 60,
			width: 900,
			height: 600
		};

		this.canvasMap = {
			width: PARAMS.WIDTH,
			height: PARAMS.HEIGHT
		};

		// Pause Screen
		this.paused = false;

		// Game Speed
		this.speed = 1;

		// Game Mute
		this.muted = false;

		// Timer
		this.waveTimer = 5;
		this.timerRestarted = false;
		this.speedChanged = false;
		this.timerInterval = null;

		this.transition = true;
		this.sceneType = "title";
		this.game.addEntity(new Transition(this.sceneType));
	}

	resetStats() {
		this.currentWave = 0;
		this.speed = 1;
		this.scores = 0;
		this.paused = false;
	}

	startTimer() {
		if (this.timerRestarted || this.speedChanged) {
			if (this.timerRestarted) {	
				this.waveTimer = 5;
			}
			clearInterval(this.timerInterval);
			this.timerRestarted = false;
			this.speedChanged = false;
		}
		
		this.timerInterval = setInterval(() => {
			if (!this.paused) {
				// The amount of time passed increments by one
				this.waveTimer -= 0.1;

				// Countdown to next wave. When 0, increment current wave
				// and reset waveTimer to that wave's time
				if (this.waveTimer !== '∞') {
					if (this.waveTimer <= 0) {
						// just to get wave to increase to 5th one.
						if (this.currentWave < this.waveTimes.length - 1) {
							this.currentWave++;
							this.waveTimer = this.waveTimes[this.currentWave];

						} else {
							this.waveTimer = -1;
						}
					}						
				}
			}
		}, (100 / this.speed));
	};

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
		level.levelEnemyWaves = new LevelWave(level);
		this.waveTimes = level.levelEnemyWaves.waveTimes; // new field for array of wave times
		this.waveTimer = this.waveTimes[this.currentWave];

		// tower store menu
		var towerStoreMenu = new TowerStoreMenu(gameEngine, 1055, 65, this.ctx, level);
		// new field towerStoreMenu added to level for tower selection interaction
		level.towerStoreMenu = towerStoreMenu;
		this.game.addEntity(towerStoreMenu);

		// user menu
		var userMenu = new UserMenu(gameEngine, 5, 65, this.ctx, level);
		level.userMenu = userMenu;		
		this.game.addEntity(userMenu);

		// description box
		var descriptionMenu = new DescriptionBox(gameEngine, 5, 665, this.ctx, level);
		this.game.addEntity(descriptionMenu);

		// hud
		var hud = new HUD(gameEngine, 5, 5, this.ctx, level);
		this.game.addEntity(hud);
	};

	loadGameLevel2() {

		// user entity created first 
		this.user = new User(this.game);
		this.game.addEntity(this.user);

		// level entity
		var map = ASSET_MANAGER.getAsset("./Level/images/SnowMap.png");
		var level = new Level(gameEngine, map, this.levelMap.xCanvas, this.levelMap.yCanvas,
			0, 0, 960, 640, 0.9375, 2, this.ctx);
		this.game.addEntity(level);


		// After level entity is added to game engine, new field 'levelEnemyWaves' is 
		// put into level to ensure enemies are drawn on top of map image
		level.levelEnemyWaves = new LevelWave(level);
		this.waveTimes = level.levelEnemyWaves.waveTimes; // new field for array of wave times
		this.waveTimer = this.waveTimes[this.currentWave];


		// tower store menu
		var towerStoreMenu = new TowerStoreMenu(gameEngine, 1055, 65, this.ctx, level);
		// new field towerStoreMenu added to level for tower selection interaction
		level.towerStoreMenu = towerStoreMenu;
		this.game.addEntity(towerStoreMenu);

		// user menu
		var userMenu = new UserMenu(gameEngine, 5, 65, this.ctx, level);
		level.userMenu = userMenu;
		this.game.addEntity(userMenu);

		// description box
		var descriptionMenu = new DescriptionBox(gameEngine, 5, 665, this.ctx, level);
		this.game.addEntity(descriptionMenu);

		// hud
		var hud = new HUD(gameEngine, 5, 5, this.ctx, level);
		this.game.addEntity(hud);
	};

	loadGameLevel3() {

		// user entity created first 
		this.user = new User(this.game);
		this.game.addEntity(this.user);

		// level entity
		var map = ASSET_MANAGER.getAsset("./Level/images/DesertMap.png");
		var level = new Level(gameEngine, map, this.levelMap.xCanvas, this.levelMap.yCanvas,
			0, 0, 960, 640, 0.9375, 3, this.ctx);
		this.game.addEntity(level);


		// After level entity is added to game engine, new field 'levelEnemyWaves' is 
		// put into level to ensure enemies are drawn on top of map image
		level.levelEnemyWaves = new LevelWave(level);
		this.waveTimes = level.levelEnemyWaves.waveTimes; // new field for array of wave times
		this.waveTimer = this.waveTimes[this.currentWave];

		// tower store menu
		var towerStoreMenu = new TowerStoreMenu(gameEngine, 1055, 65, this.ctx, level);
		// new field towerStoreMenu added to level for tower selection interaction
		level.towerStoreMenu = towerStoreMenu;
		this.game.addEntity(towerStoreMenu);

		// user menu
		var userMenu = new UserMenu(gameEngine, 5, 65, this.ctx, level);
		level.userMenu = userMenu;			
		this.game.addEntity(userMenu);

		// description box
		var descriptionMenu = new DescriptionBox(gameEngine, 5, 665, this.ctx, level);
		this.game.addEntity(descriptionMenu);

		// hud
		var hud = new HUD(gameEngine, 5, 5, this.ctx, level);
		this.game.addEntity(hud);
	};

	loadGameLevel4() {

		// user entity created first 
		this.user = new User(this.game);
		this.game.addEntity(this.user);

		// level entity
		var map = ASSET_MANAGER.getAsset("./Level/images/GrassMap.png");
		var level = new Level(gameEngine, map, this.levelMap.xCanvas, this.levelMap.yCanvas,
			0, 0, 960, 640, 0.9375, 4, this.ctx);
		this.game.addEntity(level);


		// After level entity is added to game engine, new field 'levelEnemyWaves' is 
		// put into level to ensure enemies are drawn on top of map image
		level.levelEnemyWaves = new LevelWave(level);
		this.waveTimes = level.levelEnemyWaves.waveTimes; // new field for array of wave times
		this.waveTimer = this.waveTimes[this.currentWave];


		// tower store menu
		var towerStoreMenu = new TowerStoreMenu(gameEngine, 1055, 65, this.ctx, level);
		// new field towerStoreMenu added to level for tower selection interaction
		level.towerStoreMenu = towerStoreMenu;
		this.game.addEntity(towerStoreMenu);

		// user menu
		var userMenu = new UserMenu(gameEngine, 5, 65, this.ctx, level);
		level.userMenu = userMenu;			
		this.game.addEntity(userMenu);

		// description box
		var descriptionMenu = new DescriptionBox(gameEngine, 5, 665, this.ctx, level);
		this.game.addEntity(descriptionMenu);

		// hud
		var hud = new HUD(gameEngine, 5, 5, this.ctx, level);
		this.game.addEntity(hud);
	};

	clearEntities() {
		this.game.entities.forEach(entity => {
			if (!(entity instanceof SceneManager)) {
				entity.removeFromWorld = true;
			}
			
			if ( entity instanceof UserMenu ||
				 entity instanceof TowerStoreMenu ||
				 entity instanceof Level ) {
				entity.removeMouseInteractions();
			}
		});
		console.log(this.game.entities);
	}

	update() {
		if ( (this.timerRestarted || this.speedChanged) && !this.transition) {
			this.startTimer();
		}

		// in the middle of game
		if (!this.transition) {
			if (this.sceneType == "level") {
				
				// if the base is destroyed before all enemies are killed,
				// transition scene from level to game over screen
				if (this.base.HP <= 0) {
					this.transition = true;
					this.sceneType = "gameover";
					this.clearEntities();
					this.game.addEntity(new Transition(this.sceneType));
					
				// if all waves of enemies are killed before the base HP reaches zero,
				// transition scene from level to game won screen
				} 
				if (this.allWavesDefeated) {
					this.transition = true;
					this.sceneType = "gamewon";
					this.clearEntities();
					this.game.addEntity(new Transition(this.sceneType));
				}
			}
		}

		// switch b/w transition scenes
		switch (this.sceneType) {
			case "title":
				if (this.game.click) {
					var mouseX = this.game.click.x;
					var mouseY = this.game.click.y;
					if (mouseX > 385 && mouseY > 335 && mouseX < 615 && mouseY < 390) {
						this.transition = true;
						this.sceneType = "levelselect";
						// this.sceneType = "gamewon";

						this.clearEntities();
						this.game.addEntity(new Transition(this.sceneType));
					}
				}
				break;
			case "levelselect":
				if (this.game.click) {
					var mouseX = this.game.click.x;
					var mouseY = this.game.click.y;
					// level 1
					if (mouseX > 105 && mouseX < 390 && mouseY > 470 && mouseY < 562) {
						this.transition = false;
						this.timerRestarted = true;
						this.sceneType = "level";
						this.currentLevel = 1;
						this.clearEntities();
						this.loadGamePrototype();
					}

					// level 2
					if (mouseX > 710 && mouseX < 890 && mouseY > 480 && mouseY < 540) {
						this.transition = false;
						this.timerRestarted = true;
						this.sceneType = "level";
						this.currentLevel = 2;
						this.clearEntities();
						this.loadGameLevel2();
					}

					// level 3
					if (mouseX > 710 && mouseX < 885 && mouseY > 100 && mouseY < 160) {
						this.transition = false;
						this.timerRestarted = true;
						this.sceneType = "level";
						this.currentLevel = 3;
						this.clearEntities();
						this.loadGameLevel3();
					}

					// level 4
					if (mouseX > 160 && mouseX < 340 && mouseY > 105 && mouseY < 155) {
						this.transition = false;
						this.timerRestarted = true;
						this.sceneType = "level";
						this.currentLevel = 4;
						this.clearEntities();
						this.loadGameLevel4();
					}
				}
				break;
			case "gameover":
				if (this.game.click) {
					var mouseX = this.game.click.x;
                    var mouseY = this.game.click.y;

					// home: go back to level selection screen
					var startX = 245;
                    var endX = 400;
                    var startY = 338;
                    var endY = 380;
					if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
						this.transition = true;
                        this.sceneType = "levelselect";
						this.clearEntities();
						this.game.addEntity(new Transition(this.sceneType));

                    } 

                    // restart: restart level
                    startX = 555;
                    startY = 332;
                    endX = 820;
                    endY = 381;
                    if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
                        this.transition = false;
						this.timerRestarted = true;
						this.sceneType = "level";
						this.clearEntities();
						this.resetStats();

						switch(this.currentLevel) {
							case 1:
								this.loadGamePrototype();
								break;
							case 2:
								this.loadGameLevel2();
								break;
							case 3:
								this.loadGameLevel3();
								break;
							case 4:
								this.loadGameLevel4();
								break;
						}
                    } 
				}
				break;
			case "gamewon":
				if (this.game.click) {
					var mouseX = this.game.click.x;
                    var mouseY = this.game.click.y;					
					
					// home button
					var startX = 260;
                    var endX = 410;
                    var startY = 410;
                    var endY = 450;
                    if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
						this.transition = true;
                        this.sceneType = "levelselect";
						this.clearEntities();
						this.game.addEntity(new Transition(this.sceneType));
					}

					// restart button
					startX = 535;
                    endX = 800;
                    // same startY and endY
                    if (mouseX > startX && mouseX < endX && mouseY > startY && mouseY < endY) {
						this.transition = false;
						this.timerRestarted = true;
						this.sceneType = "level";
						this.clearEntities();
						this.resetStats();

						switch(this.currentLevel) {
							case 1:
								this.loadGamePrototype();
								break;
							case 2:
								this.loadGameLevel2();
								break;
							case 3:
								this.loadGameLevel3();
								break;
							case 4:
								this.loadGameLevel4();
								break;
						}
					}
				}
				break;
			

		}

	};

	addCoin() { };

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
	  Mute the background music
	*/
	muteBGM() {
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
		var centerX = (canvasWidthCenter - (this.game.ctx.measureText("Paused").width)) / 2;
		ctx.fillText("Paused", centerX, 600 / 2);
		ctx.font = "20px Langar, cursive, serif, sans-serif";
		var pauseSubtitle = "Click Resume to Continue Game"
		centerX = (canvasWidthCenter - (this.game.ctx.measureText(pauseSubtitle).width)) / 2;
		ctx.fillText(pauseSubtitle, centerX, 700 / 2);
		ctx.closePath();
	};


}
