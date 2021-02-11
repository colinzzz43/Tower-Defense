class Hud {
    constructor() {

    }

}


class TowerStoreMenu {
	
	/*
		Constructor for the TowerStoreMenu object
		
		Parameters:
		@gameEngine				the game engine that will use this object
		@topLeftCornerX			the x-coordinate in canvas where top left corner of the store menu will be
		@topLeftCornerY			the y-coordinate in canvas where top left corner of the store menu will be
		@towerImagesArray		the array containing images of each tower type
		@ctx					the canvas that this tower store menu will be applied to
		@level					the level that will use this store menu		
	*/
	constructor(gameEngine, topLeftCornerX, topLeftCornerY, towerImagesArray, ctx, level) {
		Object.assign(this, {gameEngine, topLeftCornerX, topLeftCornerY, towerImagesArray, ctx, level});
		
		this.menuBoxWidth = 140;
		this.menuBoxHeight = 590;
		this.selectedIcon = "none";
		this.towerIcons = [];
		
		this.initializeIcons();
		this.mouseInteraction();
		this.widthScale = widthScaling();
	}
	
	/*
		Draw the store menu
	*/
	draw(ctx) {
		this.drawMenuBox();
		for (var i = 0; i < this.towerIcons.length; i++) {
			this.towerIcons[i].draw(ctx);
		}
	}
	
	/*
		Update the state of the store menu
	*/
	update() {
		// do nothing for now
	}		
	
	/*
		Draw the shapes to make the store menu
	*/
	drawMenuBox() {	
	
		// Save the previous stroke settings before changing them for drawing the menu
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
		var grd = this.ctx.createRadialGradient(975,350,0,975,350,500);
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
		this.ctx.strokeText("Tower Store", this.topLeftCornerX + 10, this.topLeftCornerY + 29);
		
		this.ctx.closePath();
	}
	
	/*
		Create icons for each tower type and fill the store menu with them
	*/
	initializeIcons() {
		
		// Centerize the rows of icons in the menu
		var leftX = this.topLeftCornerX + (this.menuBoxWidth / 10);
		var rightX = this.topLeftCornerX + (this.menuBoxWidth/2) + (this.menuBoxWidth / 20);
		var centerX = this.topLeftCorner + (this.menuBoxWidth/4)
		var y = this.topLeftCornerY + (this.menuBoxHeight / 12);
		
		// Vertical pixel space between the top left corners of the rows of icons in the menu
		var verticalSpace = 110;
		
		// First Row: Pistol and MG
		var pistolIcon = new TowerIcon(gameEngine, "Pistol", 10, this.towerImagesArray[0], leftX, y, 16, 37, this.ctx, this.level);
		this.towerIcons.push(pistolIcon);
		var mgIcon = new TowerIcon(gameEngine, "MG", 25,  this.towerImagesArray[1], rightX, y, 24, 40, this.ctx, this.level);
		this.towerIcons.push(mgIcon);
		y += verticalSpace;
		
		// Second Row: Shotgun and Cannon
		var shotgunIcon = new TowerIcon(gameEngine, "Shotgun", 25, this.towerImagesArray[2], leftX, y , 22, 34, this.ctx, this.level);
		this.towerIcons.push(shotgunIcon);
		var cannonIcon = new TowerIcon(gameEngine, "Cannon", 40, this.towerImagesArray[3], rightX, y, 23, 33, this.ctx, this.level);
		this.towerIcons.push(cannonIcon);
		y += verticalSpace;		
		
		// Third Row: Flamethrower and Laser
		var flamethrowerIcon = new TowerIcon(gameEngine, "Flame", 40, this.towerImagesArray[4], leftX, y, 33, 36, this.ctx, this.level);
		this.towerIcons.push(flamethrowerIcon);		
		var laserIcon = new TowerIcon(gameEngine, "Laser", 60, this.towerImagesArray[5], rightX, y, 22, 35, this.ctx, this.level);
		this.towerIcons.push(laserIcon);	
		y += verticalSpace;	
		
		// Fourth Row: Matter and Rocket
		var matterIcon = new TowerIcon(gameEngine, "Matter", 75, this.towerImagesArray[6], leftX, y, 24, 37, this.ctx, this.level);	
		this.towerIcons.push(matterIcon);
		var rocketIcon = new TowerIcon(gameEngine, "Rocket", 75, this.towerImagesArray[7], rightX, y, 23, 37, this.ctx, this.level);
		this.towerIcons.push(rocketIcon);
		y += verticalSpace;		
		
		// Fifth Row: Spazer
		var spazerIcon = new TowerIcon(gameEngine, "Spazer", 75, this.towerImagesArray[8], leftX + 30, y, 22, 30, this.ctx, this.level);
		this.towerIcons.push(spazerIcon);		

		// Add tower icons to game engine
		this.gameEngine.addEntity(pistolIcon);
		this.gameEngine.addEntity(mgIcon);
		this.gameEngine.addEntity(shotgunIcon);
		this.gameEngine.addEntity(cannonIcon);
		this.gameEngine.addEntity(flamethrowerIcon);
		this.gameEngine.addEntity(laserIcon);
		this.gameEngine.addEntity(matterIcon);
		this.gameEngine.addEntity(rocketIcon);
		this.gameEngine.addEntity(spazerIcon);
	}
	

	/*
		Set a tower icon's selection state to true
		
		Parameter:
		@icon		the tower icon whose selection state will be set to true
	*/
	turnOnIcon(icon) {
		icon.selected = true;
	}
	
	/*
		Set a tower icon's selection state to false
		
		Parameter:
		@icon		the tower icon whose selection state will be set to false
	*/
	turnOffIcon(icon) {
		icon.selected = false;
	}
	
	
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
			var iconClickedOn = false;
			
			// go through tower icon array to see if mouse cursor clicked on the box of a tower icon
			for (var i = 0; i < that.towerIcons.length; i++) {
				var tower = that.towerIcons[i];
				var topLeftX = tower.xCanvas * that.widthScale;
				var topLeftY = tower.yCanvas * that.widthScale;
				var iconWidth = tower.iconBoxWidth * that.widthScale;
				var iconHeight = tower.iconBoxHeight * that.widthScale;
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					iconClickedOn = true;
					if (!tower.transparent) {
						if (!tower.selected) {							
							that.turnOnIcon(tower);
							that.selectedIcon = tower.getTowerType();							
							that.level.placeTowerType = tower.towerType;
							
						} else {
							that.turnOffIcon(tower);
							that.selectedIcon = "none";
						}
					} 
				}						
			}
			
			// if mouse cursor clicked outside the boundaries of the map and not on a tower icon, deselect the currently selected icon
			var levelMapTopLeftX = that.level.topLeftCornerX * that.widthScale;
			var levelMapTopLeftY = that.level.topLeftCornerY * that.widthScale;
			var levelMapWidth = that.level.mapWidth * that.widthScale * that.level.drawScale;
			var levelMapHeight = that.level.mapHeight * that.widthScale * that.level.drawScale;
			if ( !iconClickedOn && (x < levelMapTopLeftX || x > levelMapTopLeftX + levelMapWidth) 
				|| (y < levelMapTopLeftY || y > levelMapTopLeftY + levelMapHeight) ) {
				that.selectedIcon = "none";
			}
			
			// if mouse cursor selects a tower icon while another icon is selected, then de-select the previous icon
			for (var i = 0; i < that.towerIcons.length; i++) {
				var tower = that.towerIcons[i];
				if (tower.isSelected() && tower.getTowerType() !== that.selectedIcon) 
					that.turnOffIcon(tower);
			}
			
			// if an icon is currently selected then turn on terrain grid map; otherwise turn the map off
			if (that.selectedIcon !== "none") {
				that.level.showGridMap = true;
			} else {
				that.level.showGridMap = false;
			}
		}, false);
		
		// add mouse move event listener which detects whether mouse cursor is over an icon or not
		that.ctx.canvas.addEventListener("mousemove", function (e) {
			var canvasCoordinates = getXandY(e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;			
			for (var i = 0; i < that.towerIcons.length; i++) {	
				var tower = that.towerIcons[i];
				var topLeftX = tower.xCanvas * that.widthScale;
				var topLeftY = tower.yCanvas * that.widthScale;
				var iconWidth = tower.iconBoxWidth * that.widthScale;
				var iconHeight = tower.iconBoxHeight * that.widthScale;				
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					tower.mouseover = true;
				} else {
					tower.mouseover = false;
				}
			}
		}, false);
		
	};	
}
