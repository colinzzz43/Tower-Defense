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
	constructor(gameEngine, towerType, price, iconImage, xCanvas, yCanvas, imageWidth, imageHeight, ctx, level) {
		Object.assign(this, {gameEngine, towerType, price, iconImage, xCanvas, yCanvas, imageWidth, imageHeight, ctx, level});
		
		this.selected = false;
		this.mouseover = false;
		this.transparent = false;
		
		this.iconBoxWidth = 50;
		this.iconBoxHeight = 70;
		
//		this.mouseInteraction();
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
		ctx.strokeStyle = "navy";
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
		var paddingHeight = (this.iconBoxHeight - this.imageHeight) / 6;
		ctx.drawImage(this.iconImage, 0, 0, this.imageWidth, this.imageHeight, this.xCanvas + paddingWidth, this.yCanvas + paddingHeight, this.imageWidth, this.imageHeight);
		if (this.transparent) ctx.globalAlpha = 1;
		
	};
	
	/*
		draw the text that labels the tower icon
	*/
	drawText(ctx) {
		ctx.lineWidth = 1;
		ctx.font = "12px Arial";
		ctx.strokeStyle = "black";
		
		var textWidth = ctx.measureText(this.towerType).width;
		var center = this.xCanvas + (this.iconBoxWidth) / 2;
		ctx.strokeText(this.towerType, center - (textWidth/2), this.yCanvas + 60);
		
		var coinString = `${this.price} Coins`;
		textWidth = ctx.measureText(coinString).width;
		ctx.strokeText(coinString, center - (textWidth/2), this.yCanvas + 85);
	};

	/*
		draw a highlight over the tower icon if selected
	*/
	drawIconHighlight(ctx) {
		// if image is clicked to on and is not transparent, draw a transparent yellow box over it to highlight that the icon is selected		
		if (this.selected && !this.transparent) {
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
	
	/*
		update the state of the icon
	*/
	update() {
		// do nothing for now
	};
	
	/*
		Return the tower type for this icon
	*/
	getTowerType() {
		return this.towerType;
	}
	
	/*
		Return the selection state of this icon
	*/
	isSelected() {
		return this.selected;
	}
	


}