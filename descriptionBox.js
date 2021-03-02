class DescriptionBox {
	
	/*
		Constructor for the DescriptionBox class
		
		Parameters:
		@gameEngine				the game engine that will use this object
		@topLeftCornerX			the x-coordinate in canvas where top left corner of the description box will be
		@topLeftCornerY			the y-coordinate in canvas where top left corner of the description box will be will be	
		@ctx					the canvas that this description box will be will be applied to
		@level					the level that will use this description box will be					
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
		
		this.menuBoxWidth = 1190;
		this.menuBoxHeight = 100;
		this.userIcons = [];
		
		this.initializeIcons();
		this.mouseInteraction();
		this.widthScale = widthScaling();		
		
	};
	
	/*
		Draw the official Description Box 
	*/
	draw(ctx) {
		this.drawDescriptionBox();
	
	};
	
	/*
		Update the state of the user menu
	*/
	update() {
		// do nothing for now
	};
	
	/*
		Draw the shapes to make the user menu
	*/
	drawDescriptionBox() {
		this.ctx.beginPath();
		
		// Draw the rectangle for menu box
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 10;
		this.ctx.rect(this.topLeftCornerX, this.topLeftCornerY, this.menuBoxWidth, this.menuBoxHeight);
		this.ctx.stroke();	
		this.ctx.strokeStyle = "lightgray";
		this.ctx.lineWidth = 2;
		this.ctx.strokeRect(this.topLeftCornerX - 2, this.topLeftCornerY - 2, this.menuBoxWidth + 4, this.menuBoxHeight + 4);	
		
		// Fill the background color of menu box with gradient
		var grd = this.ctx.createRadialGradient(0,350,0,0,350,500);
		grd.addColorStop(0,"LightSteelBlue");
		grd.addColorStop(1,"White");
		this.ctx.fillStyle = grd;
		this.ctx.fill();
		
		// Draw the Tower Store Sign on Menu
		this.ctx.strokeStyle = "navy";
		this.ctx.lineWidth = 3;
		this.ctx.strokeRect(this.topLeftCornerX + 5, this.topLeftCornerY + 10, this.menuBoxWidth - 10, 25);		
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 2;
		this.ctx.font = "20px monospace";
		this.ctx.strokeText("Description Box", this.topLeftCornerX + 500, this.topLeftCornerY + 29);
		this.ctx.strokeText("To place a tower on the map, first click a tower icon in the Tower Store menu on" , this.topLeftCornerX + 100, this.topLeftCornerY + 55);
		this.ctx.strokeText("the right then click a grid tile on the map. Click the selected icon again to de-select it", this.topLeftCornerX + 50, this.topLeftCornerY + 75);
		this.ctx.strokeText("turn off grid.", this.topLeftCornerX + 510, this.topLeftCornerY + 95);
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
		var undoIcon = new UndoIcon(this.gameEngine, centerX, y, this.ctx, this.level);
		this.userIcons.push(undoIcon);
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
		
		// Create the 'Restart' Icon
		var restartIcon = new RestartIcon(this.gameEngine, centerX, y, this.ctx, this.level);
		this.userIcons.push(restartIcon);	

		// Add user icon entities to game engine
		this.gameEngine.addEntity(undoIcon);
		this.gameEngine.addEntity(speedIcon);		
		this.gameEngine.addEntity(muteIcon);
		this.gameEngine.addEntity(pauseIcon);
		this.gameEngine.addEntity(restartIcon);	
		
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