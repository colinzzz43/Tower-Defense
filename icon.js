class TowerIcon {
	/*
		Constructor for the TowerIcon class
		
		Parameters:
		@gameEngine			the game engine that uses this tower icon object
		@towerType			the type of tower as a String
		@iconImage			the source file of the tower icon image
		@xCanvas 			the x-coordinate in canvas where top left corner of map will be drawn
		@yCanvas 			the y-coordinate in canvas where top left corner of map will be drawn
		@imageWidth			the width in pixels from the top left corner of the image to draw
		@imageHeight		the height in pixels from the top left corner of the image to draw
		@ctx				the canvas that this level map image will be applied to
		@level				the level that will use this tower icon
	*/
	constructor(gameEngine, towerType, iconImage, xCanvas, yCanvas, imageWidth, imageHeight, ctx, level) {
		Object.assign(this, {gameEngine, towerType, iconImage, xCanvas, yCanvas, imageWidth, imageHeight, ctx, level});
		
		this.selected = false;
		this.mouseover = false;
		this.transparent = false;
		
		this.iconBoxWidth = 40;
		this.iconBoxHeight = 50;
		
		this.mouseInteraction();
	};

	/* 
		draw the entire tower icon on canvas
	*/
	draw(ctx) {
		ctx.beginPath();
		this.drawIcon(ctx);
		this.drawText(ctx);
		this.drawIconHighlight(ctx);		
		ctx.closePath();
	};
	
	
	/*
		draw the icon box with the icon image inside it
	*/
	drawIcon(ctx) {
		
		// draw the box that will contain the tower icon image		
		ctx.setLineDash([]);
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		if (this.mouseover && !this.selected && !this.transparent) {
			ctx.fillStyle = "lightgrey";			
		} else {
			ctx.fillStyle = "white";
		}
		ctx.rect(this.xCanvas, this.yCanvas, this.iconBoxWidth, this.iconBoxHeight);
		ctx.fill();
		ctx.stroke();	
		
		// draw the tower icon image inside the box
		if (this.transparent) ctx.globalAlpha = 0.2;
		var paddingWidth = (this.iconBoxWidth - this.imageWidth) / 2;
		var paddingHeight = (this.iconBoxHeight - this.imageHeight) / 2;
		ctx.drawImage(this.iconImage, 0, 0, this.imageWidth, this.imageHeight, this.xCanvas + paddingWidth, this.yCanvas + paddingHeight, this.imageWidth, this.imageHeight);
		if (this.transparent) ctx.globalAlpha = 1;
		
	};
	
	/*
		draw the text that labels the tower icon
	*/
	drawText(ctx) {
		ctx.lineWidth = 1;
		ctx.font = "15px Ariel";
		ctx.strokeText(this.towerType, this.xCanvas, this.yCanvas + 68);
	};

	/*
		draw a highlight over the tower icon if selected
	*/
	drawIconHighlight(ctx) {
		// if image is clicked to on and is not transparent, draw a transparent yellow box over it to highlight that the icon is selected		
		if (this.selected && !this.transparent) {
			// set stroke settings to prepare to draw this tower icon highlight
			ctx.fillStyle = "cyan";
			ctx.strokeStyle = "cyan";
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
	
	/*
		icon updates only the state of turning on and off the map grid on level map image,
		if grid is on (true) then it enables users to place towers on map; otherwise if off (false) user can't place towers
	*/
	update() {
		/* 
			With multiple icons, updating showGridMap runs into issues as each icon is calling their own update method,
			overrwriting each others change to showGridMap. Moved changing showGridMap into the mouseInteraction method.
		*/
		// if (this.selected) {
		// 	this.level.showGridMap = true;
		// } else {
		// 	this.level.showGridMap = false;
		// }
	};
	
	/*
		apply the mouse interaction for the tower icon
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
			if ( (x >= that.xCanvas && x <= that.xCanvas + that.iconBoxWidth) && (y >= that.yCanvas && y <= that.yCanvas + that.iconBoxHeight) ) {					
				if (!that.selected && !that.transparent) {		
					that.selected = true;
		
					// on select, change showGridMap to true and set placeTowerType of Level object to this towerType
					that.level.showGridMap = true;
					that.level.placeTowerType = that.towerType;
				} else {
					that.selected = false;

					// on deselect, change showGridMap to false
					that.level.showGridMap = false;
				}
			}
		}, false);
		
		// add mouse move event listener which detects whether mouse cursor is over the icon or not
		that.ctx.canvas.addEventListener("mousemove", function (e) {
			var canvasCoordinates = getXandY(e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;			
			if ( (x >= that.xCanvas && x <= that.xCanvas + that.iconBoxWidth) && (y >= that.yCanvas && y <= that.yCanvas + that.iconBoxHeight) ) {
				that.mouseover = true;
			} else {
				that.mouseover = false;
			}
		}, false);
		
	};

}