class HUD {
	
	/*
		Constructor for the HUD class
		
		Parameters:
		@gameEngine				the game engine that will use this object
		@topLeftCornerX			the x-coordinate in canvas where top left corner of the HUD will be
		@topLeftCornerY			the y-coordinate in canvas where top left corner of the HUD will be	
		@ctx					the canvas that this HUD will be applied to
		@level					the level that will use this HUD					
	*/
	constructor(
		gameEngine,
		topLeftCornerX,
		topLeftCornerY,
		ctx,
		level
	) {
		Object.assign(this, {
			gameEngine,
			topLeftCornerX,
			topLeftCornerY,
			ctx,
			level
		});
		
		// Interact with the User entity that is written 
		// as a field in the SceneManager entity
		this.user = this.gameEngine.camera.user;
        this.game = this.gameEngine;

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

		

		this.menuBoxWidth = 1190;
		this.menuBoxHeight = 50;
		this.userIcons = [];
		
		// this.initializeIcons();
		this.mouseInteraction();
		this.widthScale = widthScaling();		
		
        this.waves = 1;
        this.scores = 0;
    
        this.height = 480;
        
        // Level Map Screen
        this.levelMap = {
            xCanvas: 0,
            yCanvas: 0,
            width: 300,
            height: 50
        };
        


		this.heartImage = ASSET_MANAGER.getAsset("./sprites/other/heart.png");

        this.titleGif = ASSET_MANAGER.getAsset("./sprites/title.png");
        
		// Timer
		this.gameStarted = false;
		this.TIME_LIMIT = 5;
		this.timePassed = 0;
		this.timerRestarted = false;
		this.speedChanged = false;
		this.timeLeft = this.TIME_LIMIT;
		this.timerInterval = null;
		this.startTimer();
	};

    startTimer() {
        if (this.timerRestarted || this.speedChanged) {
            clearInterval(this.timerInterval);
            this.timerRestarted = false;
            this.speedChanged = false;
        }
        this.timerInterval = setInterval(() => {
          if (!this.paused) {
            // The amount of time passed increments by one
            this.timePassed += 0.01;
            this.timeLeft = this.TIME_LIMIT - this.timePassed;
            if (this.timeLeft < 0) {
                this.timeLeft = 0;
				this.gameStarted = true;

            }
          }
        }, (100 / this.speed) );

      };
	
	/*
		Draw the official user menu
	*/
	draw(ctx) {
        this.HP = this.gameEngine.camera.base.HP;
        this.coins = this.user.balance;
        this.scores = this.game.camera.user.scores;
		this.drawMenuBox();
		for (var i = 0; i < this.userIcons.length; i++) {
			this.userIcons[i].draw(ctx);
		}		
	};
	
	/*
		Update the state of the user menu
	*/
	update() {
		// do nothing for now
        if (this.timerRestarted || this.speedChanged) {
            this.startTimer();
        }
	};
	
	/*
		Draw the shapes to make the user menu
	*/
	drawMenuBox() {
		this.ctx.beginPath();

		
		// Draw the rectangle for HUD
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 10;
		this.ctx.rect(this.topLeftCornerX, this.topLeftCornerY, this.menuBoxWidth, this.menuBoxHeight);
		this.ctx.stroke();	
		this.ctx.strokeStyle = "lightgray";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(this.topLeftCornerX - 2, this.topLeftCornerY - 2, this.menuBoxWidth + 4, this.menuBoxHeight + 4);	
		
		// Fill the background color of HUD with gradient
		var grd = this.ctx.createRadialGradient(0,500,0,0,350,500);
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"White");




		this.ctx.fillStyle = grd;
		this.ctx.fill();
		
		// Draw the Tower Store Sign on HUD
		this.ctx.strokeStyle = "navy";
		this.ctx.lineWidth = 3;
		// this.ctx.strokeRect(this.topLeftCornerX + 5, this.topLeftCornerY + 10, this.menuBoxWidth - 10, 25);		
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 2;
		this.ctx.font = "20px monospace";
		// this.ctx.strokeText("User Menu", this.topLeftCornerX + 20, this.topLeftCornerY + 29);
        this.ctx.drawImage(this.titleGif, 340, 5, 500, 50);

        this.gameStatsDisplay(this.ctx);

        var horizontalAlign = this.levelMap.xCanvas + 
        (this.levelMap.width * 0.45);
        var verticalAlign = this.levelMap.yCanvas +
        (this.levelMap.height * 0.8);

        this.coinAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
			horizontalAlign + 800,
			verticalAlign * 0.7,
            1.8
        );

		this.ctx.closePath();		
	};
	
	/*
		Create icons for user feature type and fill the user menu with them
	*/	
	// initializeIcons() {
		
	// 	// Centerize the rows of icons in the menu
	// 	var centerX = this.topLeftCornerX + (this.menuBoxWidth/15);
	// 	var y = this.topLeftCornerY + (this.menuBoxHeight / 12);
		
	// 	// Vertical pixel space between the top left corners of the rows of icons in the menu
	// 	var verticalSpace = 90;

	// 	// Create the 'Undo' Icon
	// 	var undoIcon = new UndoIcon(this.gameEngine, centerX, y, this.ctx, this.level);
	// 	this.userIcons.push(undoIcon);
	// 	y += verticalSpace;
		
	// 	// Create the 'Speed' Icon
	// 	var speedIcon = new SpeedIcon(this.gameEngine, centerX, y, this.ctx, this.level);
	// 	this.userIcons.push(speedIcon);
	// 	y += verticalSpace;
		
	// 	// Create the 'Mute' Icon
	// 	var muteIcon = new MuteIcon(this.gameEngine, centerX, y, this.ctx, this.level);
	// 	this.userIcons.push(muteIcon);
	// 	y += verticalSpace;
		
	// 	// Create the 'Pause' Icon
	// 	var pauseIcon = new PauseIcon(this.gameEngine, centerX, y, this.ctx, this.level);
	// 	this.userIcons.push(pauseIcon);
	// 	y += verticalSpace;		
		
	// 	// Create the 'Restart' Icon
	// 	var restartIcon = new RestartIcon(this.gameEngine, centerX, y, this.ctx, this.level);
	// 	this.userIcons.push(restartIcon);	

	// 	// Add user icon entities to game engine
	// 	this.gameEngine.addEntity(undoIcon);
	// 	this.gameEngine.addEntity(speedIcon);		
	// 	this.gameEngine.addEntity(muteIcon);
	// 	this.gameEngine.addEntity(pauseIcon);
	// 	this.gameEngine.addEntity(restartIcon);	
		
	// };
	
	/*
		apply the mouse interaction for the user menu and its icons
	*/
	mouseInteraction() {
		var that = this;
		
		// Get x,y coordinates of canvas where mouse pointer is
		var getXandY = function (e) {
			var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
			var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
			
			return { x: x, y: y };
		}

		// add mouse click event listener which selects and de-selects the tower icon when clicked on directly
		that.ctx.canvas.addEventListener("click", function (e) {
			var canvasCoordinates = getXandY(e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;

			for (var i = 0; i < that.userIcons.length; i++) {
				var icon = that.userIcons[i];
				var topLeftX = icon.xCanvas * that.widthScale;
				var topLeftY = icon.yCanvas * that.widthScale;
				var iconWidth = icon.iconBoxWidth * that.widthScale;
				var iconHeight = icon.iconBoxHeight * that.widthScale;	
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {	
					if (   icon instanceof SpeedIcon 
						|| icon instanceof MuteIcon
						|| icon instanceof PauseIcon   ) {
						icon.changeLabel();
					}
					icon.userIconFunction();
				}					
			}

		}, false);
				
		// add mouse move event listener which detects whether mouse cursor is over an icon or not
		that.ctx.canvas.addEventListener("mousemove", function (e) {
			var canvasCoordinates = getXandY(e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;			
			for (var i = 0; i < that.userIcons.length; i++) {	
				var icon = that.userIcons[i];
				var topLeftX = icon.xCanvas * that.widthScale;
				var topLeftY = icon.yCanvas * that.widthScale;
				var iconWidth = icon.iconBoxWidth * that.widthScale;
				var iconHeight = icon.iconBoxHeight * that.widthScale;				
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					icon.mouseover = true;
				} else {
					icon.mouseover = false;
				}
			}
		}, false);		
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
		ctx.font = "25px monospace";
		ctx.fillStyle = "Black";
		ctx.fillText(
			("SCORES: " + this.scores).padStart(8, "0"),
			horizontalAlign,
			verticalAlign 
		);
		
		// Coin Currency
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.6);
		ctx.fillText(
			" x" + (this.coins < 10 ? "0" : "") + this.coins,
			horizontalAlign + 785,
			verticalAlign * 1.3
		);

		// HP and Waves
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.6);
		if (this.HP > 0) { // show hp when above 0, else show defeat
		  ctx.drawImage(this.heartImage, horizontalAlign + 25, verticalAlign - 25, 35, 35);
		  ctx.fillText(" x" + this.HP , horizontalAlign + 65, verticalAlign+5);
		} else  {
		  ctx.fillStyle = "RED";
		  ctx.fillText("GAME OVER" , horizontalAlign + 5, verticalAlign);
		  ctx.fillStyle = "Black";
		}
		
		// this.gameStarted = false;

		// Time and level display
		horizontalAlign = this.levelMap.xCanvas + 
			(this.levelMap.width * 0.85);
			ctx.fillText("LEVEL " + this.game.camera.currentLevel, horizontalAlign + 630, verticalAlign * 0.7);
		if (this.gameStarted) {
			ctx.fillText("WAVES " + this.game.camera.currentWave + "/5", horizontalAlign + 780, verticalAlign * 0.7);

		} else {
			ctx.fillText("TIME:", horizontalAlign + 780, verticalAlign * 0.7);
			horizontalAlign = this.levelMap.xCanvas + 
				(this.levelMap.width * 0.885);
			ctx.fillText(Math.floor(this.timeLeft), horizontalAlign + 855, verticalAlign * 0.7);
		}

	};
}