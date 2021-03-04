class LevelScreen {
	
	/*
		Constructor for the LevelScreen class
		
		Parameters:
		@gameEngine				the game engine that will use this object
		@topLeftCornerX			the x-coordinate in canvas where top left corner of the user menu will be
		@topLeftCornerY			the y-coordinate in canvas where top left corner of the user menu will be	
		@ctx					the canvas that this user menu will be applied to
		@level					the level that will use this user menu					
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



		this.menuBoxWidth = 1190;
		this.menuBoxHeight = 535;
		this.userIcons = [];
		
		this.initializeIcons();
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
        
        
        	    // Timer
    this.TIME_LIMIT = 20;
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
            this.timePassed += 0.1;
            this.timeLeft = this.TIME_LIMIT - this.timePassed;
            if (this.timeLeft < 0) {
                this.timeLeft = 0;
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

		
		// Draw the rectangle for LevelScreen
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 10;
		this.ctx.rect(this.topLeftCornerX, this.topLeftCornerY, this.menuBoxWidth, this.menuBoxHeight);
		this.ctx.stroke();	
		// this.ctx.strokeStyle = "lightgray";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(this.topLeftCornerX - 2, this.topLeftCornerY - 2, this.menuBoxWidth + 4, this.menuBoxHeight + 4);	
		
		// Fill the background color of LevelScreen with gradient
		var grd = this.ctx.createRadialGradient(0,0,0,0,0,130);
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"White");




		this.ctx.fillStyle = grd;
		this.ctx.fill();
		
		// Draw the Tower Store Sign on LevelScreen
		this.ctx.strokeStyle = "navy";
		this.ctx.lineWidth = 3;
		// this.ctx.strokeRect(this.topLeftCornerX + 5, this.topLeftCornerY + 10, this.menuBoxWidth - 10, 25);		
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 2;
		this.ctx.font = "20px monospace";
		// this.ctx.strokeText("User Menu", this.topLeftCornerX + 20, this.topLeftCornerY + 29);
        // this.ctx.drawImage(this.titleGif, 325, 5, 500, 50);

        // this.gameStatsDisplay(this.ctx);

        var horizontalAlign = this.levelMap.xCanvas + 
        (this.levelMap.width * 0.45);
        var verticalAlign = this.levelMap.yCanvas +
        (this.levelMap.height * 0.8);

        this.coinAnimation.drawFrame(
            this.game.clockTick,
            this.ctx,
			horizontalAlign + 735,
			verticalAlign * 0.7,
            1.8
        );

		this.ctx.closePath();		
	};
	
	/*
		Create icons for user feature type and fill the user menu with them
	*/	
	initializeIcons() {
		
		// Centerize the rows of icons in the menu
		var centerX = this.topLeftCornerX + (this.menuBoxWidth/15);
		var y = this.topLeftCornerY + (this.menuBoxHeight / 12);
		
		// Vertical pixel space between the top left corners of the rows of icons in the menu
		var verticalSpace = 90;

		// Create the 'Undo' Icon
		var levelOneIcon = new LevelOneIcon(this.gameEngine, centerX, y, this.ctx, this.level);
		this.userIcons.push(levelOneIcon);
		y += verticalSpace;
		
		// Create the 'Speed' Icon
		var speedIcon = new SpeedIcon(this.gameEngine, centerX, y, this.ctx, this.level);
		this.userIcons.push(speedIcon);
		y += verticalSpace;
		
		// Create the 'Mute' Icon
		var muteIcon = new MuteIcon(this.gameEngine, centerX, y, this.ctx, this.level);
		this.userIcons.push(muteIcon);
		y += verticalSpace;
		
		// Create the 'Pause' Icon
		var pauseIcon = new PauseIcon(this.gameEngine, centerX, y, this.ctx, this.level);
		this.userIcons.push(pauseIcon);
		y += verticalSpace;		
		
	// 	// Create the 'Restart' Icon
	// 	var restartIcon = new RestartIcon(this.gameEngine, centerX, y, this.ctx, this.level);
	// 	this.userIcons.push(restartIcon);	

	// 	// Add user icon entities to game engine
		this.gameEngine.addEntity(levelOneIcon);
		this.gameEngine.addEntity(speedIcon);		
		this.gameEngine.addEntity(muteIcon);
		this.gameEngine.addEntity(pauseIcon);
		
	};
	
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


}

class LevelOneIcon {

	constructor(
		gameEngine,
		xCanvas,
		yCanvas,
		ctx,
		level
	) {
		Object.assign(this, {
			gameEngine,
			xCanvas,
			yCanvas,
			ctx,
			level			
		});
		
            // spritesheet
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/levelscreen/Level 1.png");
    this.animation = new Animator(
      this.spritesheet,
      0,
      0,
      48,
      48,
      1,
      0.1,
      0,
      false,
      true
    );



		// the state of whether this icon is selected
		this.selected = false;
		
		// the state of whether the mouse cursor is hovering over the icon
		this.mouseover = false;
		
		// the pixel width and height proportions of the user icon box
		this.iconBoxWidth = 120;
		this.iconBoxHeight = 60;
	};
	
	/*
		draw the user menu icon box
	*/
	draw(ctx) {
        this.animation.drawFrame(
            this.gameEngine.clockTick,
            ctx,
            50,
            213,
            2
          );
        // ctx.drawImage(this.spritesheet, ctx, 50, 213);

		
		// draw the box that will contain the tower icon image		
		ctx.setLineDash([]);
		ctx.strokeStyle = "navy";
		ctx.lineWidth = 2;
		if (this.mouseover && !this.selected) {
			ctx.fillStyle = "lightgrey";			
		} else {
			ctx.fillStyle = "white";
		}
		ctx.rect(this.xCanvas, this.yCanvas, this.iconBoxWidth, this.iconBoxHeight);
		ctx.fill();
		ctx.stroke();	
		
	};
	
	/*
		draw the text that labels the user menu icon
	*/
	drawLabel(ctx, label, sublabel) {
		ctx.lineWidth = 1;
		ctx.font = "24px Arial";
		ctx.fillStyle = "black";
		
		if (sublabel) {
			var verticalAlign = this.yCanvas + 25;
		} else {
			var verticalAlign = this.yCanvas + 38;
		}
		var textWidth = ctx.measureText(label).width;
		var horizontalCenter = this.xCanvas + (this.iconBoxWidth / 2) - (textWidth/2);
		ctx.fillText(label, horizontalCenter, verticalAlign);
		
	};

	/*
		draw a highlight over the user menu icon if clicked on
	*/
	drawIconHighlight(ctx) {
		// if image is clicked to on and is not transparent, draw a transparent yellow box over it to highlight that the icon is selected		
		if (this.selected) {
			// set stroke settings to prepare to draw this tower icon highlight
			ctx.fillStyle = "yellow";
			ctx.strokeStyle = "yellow";
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.globalAlpha = 0.1;
			ctx.fill();
			
			// set stroke settings back to way prior to calling this method
			ctx.globalAlpha = 1;
			ctx.lineWidth = 1;
			ctx.fillStyle = "black";
			ctx.strokeStyle = "black";
		}		
	};

    update() {

    };


	

}

