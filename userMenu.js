/*
	-----------------------------------------------------------------
		The User Menu Box
	-----------------------------------------------------------------
*/

class UserMenu {
	
	/*
		Constructor for the UserMenu class
		
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
		
		this.menuBoxWidth = 140;
		this.menuBoxHeight = 590;
		this.userIcons = [];
		
		this.initializeIcons();
		this.mouseInteraction();
		this.widthScale = widthScaling();		
		
	};
	
	/*
		Draw the official user menu
	*/
	draw(ctx) {
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
	};
	
	/*
		Draw the shapes to make the user menu
	*/
	drawMenuBox() {
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
		this.ctx.strokeText("User Menu", this.topLeftCornerX + 20, this.topLeftCornerY + 29);
		
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




/*
	-----------------------------------------------------------------
		Icons for the User Menu
	-----------------------------------------------------------------
*/

class UserMenuIcon {
	
	/*
		Constructor for the UserMenuIcon
		
		@gameEngine		the game engine that will use this user menu icon
		@xCanvas 		the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 		the y-coordinate in canvas where top left corner of icon will be drawn
		@ctx			the canvas that this user icon will be applied to
		@level			the level that will use this user icon
	*/
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
	drawIcon(ctx) {
		
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
	

}

class UndoIcon extends UserMenuIcon {
	
	/*
		Constructor for the UndoIcon
		
		@gameEngine		the game engine that will use this user menu icon
		@xCanvas 		the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 		the y-coordinate in canvas where top left corner of icon will be drawn
		@ctx			the canvas that this user icon will be applied to
		@level			the level that will use this user icon
	*/	
	constructor(
		gameEngine,
		xCanvas,
		yCanvas,
		ctx,
		level
	) {
		super(		
			gameEngine,
			xCanvas,
			yCanvas,
			ctx,
			level 
		);
	
		// The label for the 'undo' icon
		this.label = "Undo"
	
	};
	
	/*
		update the state of the icon
	*/
	update() {
		// do nothing for now
	};	
	
	/*
		draw the 'undo' icon in the user menu
	*/
	draw(ctx) {
		ctx.beginPath();
		super.drawIcon(ctx);
		super.drawLabel(ctx, this.label, false);
		super.drawIconHighlight(ctx);
		ctx.closePath();
	};
	
	/*
		execute the primary function of the 'undo' icon when clicked
	*/
	userIconFunction() {
		
	};
}


class SpeedIcon extends UserMenuIcon {

	/*
		Constructor for the Speed
		
		@gameEngine		the game engine that will use this user menu icon
		@xCanvas 		the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 		the y-coordinate in canvas where top left corner of icon will be drawn
		@ctx			the canvas that this user icon will be applied to
		@level			the level that will use this user icon
	*/		
	constructor(
		gameEngine,
		xCanvas,
		yCanvas,
		ctx,
		level
	) {
		super(		
			gameEngine,
			xCanvas,
			yCanvas,
			ctx,
			level 
		);
		
		// the label for the 'Speed' icon
		this.label = "Speed";
		
		// the speed mulitipliers that determine the pace of the gameplay speed
		this.speedMultipliers = ["1x", "2x", "4x"];		
		
		// the current sub-label for the 'Speed' icon
		this.sublabelStatus = this.speedMultipliers[0];
	
	};
	
	/*
		update the state of the icon
	*/
	update() {
		// do nothing for now
	};		
	
	/*
		draw the 'Speed' icon
	*/
	draw(ctx) {
		ctx.beginPath();
		super.drawIcon(ctx);
		super.drawLabel(ctx, this.label, true);
		this.drawSubLabel(ctx);
		super.drawIconHighlight(ctx);
		ctx.closePath();
	};
	
	drawSubLabel(ctx) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.font = "22px Arial";
		ctx.fillStyle = "black";	
		
		var subLabel = "";
		for (var i = 0; i < this.speedMultipliers.length; i++) {
			var multiplier = this.speedMultipliers[i];
			var xOffset = this.xCanvas + ( (this.iconBoxWidth / 3.5) * i) + (this.iconBoxWidth / 9);
			var verticalAlign = this.yCanvas + (this.iconBoxHeight * 0.85);
			ctx.fillText(multiplier, xOffset, verticalAlign);
			if (multiplier === this.sublabelStatus) {
				ctx.strokeStyle = "cyan";
				ctx.strokeText(multiplier, xOffset, verticalAlign);
				ctx.beginPath();
				ctx.moveTo(xOffset, verticalAlign + 3)
				ctx.lineTo(xOffset + ctx.measureText(multiplier).width, verticalAlign + 3);
				ctx.stroke();
				ctx.closePath();
				ctx.strokeStyle = "black";
			}
		}

	}
	
	/*
		Change the sublabel of the 'Speed' Icon when clicked
	*/
	changeLabel() {
		var index = this.speedMultipliers.indexOf(this.sublabelStatus);
		
		if (index < 2) {
			index++;
			console.log(this.speedMultipliers[index]);
			this.sublabelStatus = this.speedMultipliers[index];		
		} else {
			this.sublabelStatus = this.speedMultipliers[0];
		}
	};
	
	/*
		execute the primary function of the 'Speed' icon when clicked
	*/	
	userIconFunction() {
		this.gameEngine.speed = parseFloat(this.sublabelStatus);
	};
	
	/*
		Return the current gameplay speed
	*/
	getGameSpeed() {
		return parseFloat(this.sublabelStatus);
	}

}


class MuteIcon extends UserMenuIcon {
	
	/*
		Constructor for the MuteIcon
		
		@gameEngine		the game engine that will use this user menu icon
		@xCanvas 		the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 		the y-coordinate in canvas where top left corner of icon will be drawn
		@ctx			the canvas that this user icon will be applied to
		@level			the level that will use this user icon
	*/		
	constructor(
		gameEngine,
		xCanvas,
		yCanvas,
		ctx,
		level
	) {
		super(		
			gameEngine,
			xCanvas,
			yCanvas,
			ctx,
			level 
		);
		
		// the labels for the 'Mute' icon
		this.labels = [ "Mute", "Unmute" ];
		
		this.game = gameEngine;

		// the current label displayed on 'Mute' icon
		this.labelStatus = this.labels[0];
		this.muteEnabled = false;
	};
	
	/*
		update the state of the icon
	*/
	update() {
		// do nothing for now
	};
	
	/*
		draw the 'Mute' icon
	*/
	draw(ctx) {
		ctx.beginPath();
		super.drawIcon(ctx);
		super.drawLabel(ctx, this.labelStatus, true);
		this.drawMuteOrUnmuteSymbol(ctx);
		super.drawIconHighlight(ctx);
		ctx.closePath();
	};
		
	/*
		Draw the mute symbol for 'Mute' lable or draw unmute symbol for 'Unmute' label
	*/
	drawMuteOrUnmuteSymbol(ctx) {
		ctx.fillStyle = "black";
		
		// draw the speaker symbol
		var x1 = this.xCanvas + (this.iconBoxHeight * 0.75) 
		var y1 = this.yCanvas + (this.iconBoxHeight * 0.65);
		var x2 = x1;
		var y2 = this.yCanvas + (this.iconBoxHeight * 0.75);
		var x3 = this.xCanvas + (this.iconBoxHeight * 0.85);
		var y3 = y2;
		var x4 = this.xCanvas + (this.iconBoxHeight * 0.95);
		var y4 = this.yCanvas + (this.iconBoxHeight * 0.85);
		var x5 = x4;
		var y5 = this.yCanvas + (this.iconBoxHeight * 0.55);
		var x6 = x3;
		var y6 = y1;
		
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.lineTo(x4, y4);
		ctx.lineTo(x5, y5);
		ctx.lineTo(x6, y6);	
		ctx.fill();
		ctx.closePath();

		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		
		if (this.labelStatus === "Mute") {
			// draw an 'X' to right of speaker symbol
			x1 = this.xCanvas + (this.iconBoxHeight * 1.05);
			y1 = this.yCanvas + (this.iconBoxHeight * 0.6);
			x2 = this.xCanvas + (this.iconBoxHeight * 1.25);
			y2 = this.yCanvas + (this.iconBoxHeight * 0.8);
			x3 = x1
			y3 = y2
			x4 = x2
			y4 = y1		
			
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.moveTo(x3, y3);
			ctx.lineTo(x4, y4);
			ctx.stroke();
			ctx.closePath();
			
		} else {
			var centerX = this.xCanvas + (this.iconBoxHeight * 0.95);
			var centerY = this.yCanvas + (this.iconBoxHeight * 0.7);
			
			
			ctx.beginPath();
			ctx.arc(centerX, centerY, 5, -0.2*Math.PI, 0.2*Math.PI);
			ctx.stroke();			
			ctx.closePath();			
			
			ctx.beginPath();			
			ctx.arc(centerX, centerY, 10, -0.2*Math.PI, 0.2*Math.PI);
			ctx.stroke();			
			ctx.closePath();			
			
			ctx.beginPath();			
			ctx.arc(centerX, centerY, 15, -0.2*Math.PI, 0.2*Math.PI);
			ctx.stroke();			
			ctx.closePath();
		}
	}
	
	/*
		Change the label of the 'Mute' Icon when clicked
	*/
	changeLabel() {
		var index = this.labels.indexOf(this.labelStatus);
		
		if (index === 0) {
			this.labelStatus = this.labels[1];
		} else {
			this.labelStatus = this.labels[0];
		}
	};

	/*
		execute the primary function of the 'Mute' icon when clicked
	*/
	userIconFunction() {
		if (this.muteEnabled) {
			this.muteEnabled = false;
		} else {
			this.muteEnabled = true;
		}
		
		this.game.muted = this.muteEnabled;
	};	
}


class PauseIcon extends UserMenuIcon {
	
	/*
		Constructor for the PauseIcon
		
		@gameEngine		the game engine that will use this user menu icon
		@xCanvas 		the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 		the y-coordinate in canvas where top left corner of icon will be drawn
		@ctx			the canvas that this user icon will be applied to
		@level			the level that will use this user icon
	*/		
	constructor(
		gameEngine,
		xCanvas,
		yCanvas,
		ctx,
		level
	) {
		super(		
			gameEngine,
			xCanvas,
			yCanvas,
			ctx,
			level 
		);
		
		// the labels for the 'Pause' icon
		this.labels = [ "Pause", "Resume" ];
		
		// the current label displayed on 'Pause' icon
		this.labelStatus = this.labels[0];
		
		// the currently enabled pause state
		this.pauseEnabled = false;
	
	};	
	
	/*
		update the state of the icon
	*/
	update() {
		// do nothing for now
	};

	/*
		draw the 'Pause' icon
	*/
	draw(ctx) {
		ctx.beginPath();
		super.drawIcon(ctx);
		super.drawLabel(ctx, this.labelStatus, true);
		this.drawPauseOrPlaySymbol(ctx);
		super.drawIconHighlight(ctx);
		ctx.closePath();
	};	
	
	/*
		Draw the pause symbol for 'Pause' label or draw play symbol for 'Resume' label
	*/
	drawPauseOrPlaySymbol(ctx) {
		ctx.fillStyle = "black";
		if (this.labelStatus === "Pause") {
			
			// draw the pause symbol
			var horizontalCenter = this.xCanvas + (this.iconBoxWidth / 2);
			var verticalAlign = this.yCanvas + (this.yCanvas/10);
			var pauseWidth = this.iconBoxWidth / 25;
			var pauseHeight = this.iconBoxHeight / 3;
			var leftBarX = horizontalCenter - (pauseWidth * 1.5);
			var rightBarX = horizontalCenter + (pauseWidth * 0.5);
			ctx.fillRect(leftBarX, verticalAlign, pauseWidth, pauseHeight);
			ctx.fillRect(rightBarX, verticalAlign, pauseWidth, pauseHeight);
		} else {
			
			// draw the play symbol
			var x1 = this.xCanvas + (this.iconBoxWidth * 0.45);
			var y1 = this.yCanvas + (this.iconBoxHeight * 0.5);
			var x2 = x1;
			var y2 = this.yCanvas + (this.iconBoxHeight * 0.85);
			var x3 = this.xCanvas + (this.iconBoxWidth * 0.6);
			var y3 = this.yCanvas + (this.iconBoxHeight * 0.65);
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.closePath();
			ctx.fill();
		}
		ctx.fillStyle = "black";
	}
	
	/*
		Change the label of the 'Pause' Icon when clicked
	*/	
	changeLabel() {
		var index = this.labels.indexOf(this.labelStatus);
		
		if (index === 0) {
			this.labelStatus = this.labels[1];
		} else {
			this.labelStatus = this.labels[0];
		}
	}

	/*
		execute the primary function of the 'Pause' icon when clicked
	*/
	userIconFunction() {	
		if (this.pauseEnabled) {
			this.pauseEnabled = false;
		} else {
			this.pauseEnabled = true;
		}
		
		this.gameEngine.paused = this.pauseEnabled;
	};
}


class RestartIcon extends UserMenuIcon {
	
	/*
		Constructor for the RestartIcon
		
		@gameEngine		the game engine that will use this user menu icon
		@xCanvas 		the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 		the y-coordinate in canvas where top left corner of icon will be drawn
		@ctx			the canvas that this user icon will be applied to
		@level			the level that will use this user icon
	*/		
	constructor(
		gameEngine,
		xCanvas,
		yCanvas,
		ctx,
		level
	) {
		super(		
			gameEngine,
			xCanvas,
			yCanvas,
			ctx,
			level 
		);
	
		// the label for the 'Restart' icon	
		this.label = "Restart";
	
	};

	/*
		update the state of the icon
	*/
	update() {
		// do nothing for now
	};	

	/*
		draw the 'Restart' icon
	*/
	draw(ctx) {
		ctx.beginPath();
		super.drawIcon(ctx);
		super.drawLabel(ctx, this.label, false);
		super.drawIconHighlight(ctx);
		ctx.closePath();
	};	
	
	/*
		execute the primary function of the 'Restart' icon when clicked
	*/	
	userIconFunction() {
		
	};
}