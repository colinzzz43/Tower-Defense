class TowerStoreMenu {
  /*
		Constructor for the TowerStoreMenu object
		
		Parameters:
		@gameEngine				the game engine that will use this object
		@topLeftCornerX			the x-coordinate in canvas where top left corner of the store menu will be
		@topLeftCornerY			the y-coordinate in canvas where top left corner of the store menu will be
		@ctx					the canvas that this tower store menu will be applied to
		@level					the level that will use this store menu		
	*/
  constructor(gameEngine, topLeftCornerX, topLeftCornerY, ctx, level) {
    Object.assign(this, {
      gameEngine,
      topLeftCornerX,
      topLeftCornerY,
      ctx,
      level,
    });

    // interact with the user entity that is fielded in sceneManager entity
    this.user = this.gameEngine.camera.user;

    this.menuBoxWidth = 140;
    this.menuBoxHeight = 590;
	this.widthScale = widthScaling();
	
    this.selectedIcon = "none";
    this.storeIcons = [];
    this.towerImagesArray = this.retrieveTowerIconImages();

	// create the icon buttons for the menu
    this.initializeIcons();
	
	// create the mouse interactions for the tower store menu	
	this.towerStoreClick = this.createMouseClick(this);
	this.towerStoreMove = this.createMouseMove(this);
	this.implementMouseInteractions();
  };

	/*
		Draw the store menu
	*/
	draw(ctx) {
		this.drawMenuBox();
		for (var i = 0; i < this.storeIcons.length; i++) {
		this.storeIcons[i].draw(ctx);
		}
	};

	/*
		Update the state of the store menu
	*/
	update() {
		if (this.removeFromWorld) 
			this.removeMouseInteractions();
	};

  /*
		Draw the shapes to make the store menu
	*/
  drawMenuBox() {
    // Save the previous stroke settings before changing them for drawing the menu
    this.ctx.beginPath();

    // Draw the rectangle for menu box
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 10;
    this.ctx.rect(
      this.topLeftCornerX,
      this.topLeftCornerY,
      this.menuBoxWidth,
      this.menuBoxHeight
    );
    this.ctx.stroke();
    this.ctx.strokeStyle = "lightgray";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      this.topLeftCornerX - 2,
      this.topLeftCornerY - 2,
      this.menuBoxWidth + 4,
      this.menuBoxHeight + 4
    );

    // Fill the background color of menu box with gradient
    var grd = this.ctx.createRadialGradient(975, 350, 0, 975, 350, 500);
    grd.addColorStop(0, "LightSteelBlue");
    grd.addColorStop(1, "White");
    this.ctx.fillStyle = grd;
    this.ctx.fill();

    // Draw the Tower Store Sign on Menu
    this.ctx.strokeStyle = "navy";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(
      this.topLeftCornerX + 5,
      this.topLeftCornerY + 10,
      this.menuBoxWidth - 10,
      25
    );
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.font = "18px monospace";
    this.ctx.strokeText(
      "Tower Store",
      this.topLeftCornerX + 10,
      this.topLeftCornerY + 29
    );

    this.ctx.closePath();
  };

	/*
		Retrieve all the tower sprite images to be used for the icons in the tower store.
	*/
	retrieveTowerIconImages() {
		var towerIconImages = [];
		var pistolImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/pistol/Level1/1_left.png"
		);
		towerIconImages.push(pistolImage);
		var mgImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/mg/Level1/1_left.png"
		);
		towerIconImages.push(mgImage);
		var shotgunImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/shotgun/Level1/1_left.png"
		);
		towerIconImages.push(shotgunImage);
		var cannonImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/cannon/Level1/1_left.png"
		);
		towerIconImages.push(cannonImage);
		var flamethrowerImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/flamethrower/Level1/1_left.png"
		);
		towerIconImages.push(flamethrowerImage);
		var laserImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/laser/Level1/1_left.png"
		);
		towerIconImages.push(laserImage);
		var matterImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/matter/Level1/1_left.png"
		);
		towerIconImages.push(matterImage);
		var rocketImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/rocket/Level1/1_left.png"
		);
		towerIconImages.push(rocketImage);
		var spazerImage = ASSET_MANAGER.getAsset(
		  "./sprites/towers/spazer/Level1/1_left.png"
		);
		towerIconImages.push(spazerImage);
		return towerIconImages;
	};

	/*
		Create icons for each tower type and fill the store menu with them
	*/
  initializeIcons() {
    // Centerize the rows of icons in the menu
    var leftX = this.topLeftCornerX + this.menuBoxWidth / 10;
    var rightX =
      this.topLeftCornerX + this.menuBoxWidth / 2 + this.menuBoxWidth / 20;
    var centerX = this.topLeftCorner + this.menuBoxWidth / 4;
    var y = this.topLeftCornerY + this.menuBoxHeight / 12;

    // Vertical pixel space between the top left corners of the rows of icons in the menu
    var verticalSpace = 110;

    // First Row: Pistol and MG
    var pistolIcon = new TowerIcon(
      this.gameEngine,
      "Pistol",
      Pistol.cost,
      this.towerImagesArray[0],
      leftX,
      y,
      16,
      37,
      this.ctx,
      this.level
    );
    this.storeIcons.push(pistolIcon);
    var mgIcon = new TowerIcon(
      this.gameEngine,
      "MG",
      MG.cost,
      this.towerImagesArray[1],
      rightX,
      y,
      24,
      40,
      this.ctx,
      this.level
    );
    this.storeIcons.push(mgIcon);
    y += verticalSpace;

    // Second Row: Shotgun and Cannon
    var shotgunIcon = new TowerIcon(
      this.gameEngine,
      "Shotgun",
      Shotgun.cost,
      this.towerImagesArray[2],
      leftX,
      y,
      22,
      34,
      this.ctx,
      this.level
    );
    this.storeIcons.push(shotgunIcon);
    var cannonIcon = new TowerIcon(
      this.gameEngine,
      "Cannon",
      Cannon.cost,
      this.towerImagesArray[3],
      rightX,
      y,
      23,
      33,
      this.ctx,
      this.level
    );
    this.storeIcons.push(cannonIcon);
    y += verticalSpace;

    // Third Row: Flamethrower and Laser

    var flamethrowerIcon = new TowerIcon(
      this.gameEngine,
      "Flame",
      Flamethrower.cost,
      this.towerImagesArray[4],
      leftX,
      y,
      33,
      36,
      this.ctx,
      this.level
    );
    this.storeIcons.push(flamethrowerIcon);
    var rocketIcon = new TowerIcon(
      this.gameEngine,
      "Rocket",
      Rocket.cost,
      this.towerImagesArray[7],
      rightX,
      y,
      23,
      37,
      this.ctx,
      this.level
    );
    this.storeIcons.push(rocketIcon);
    y += verticalSpace;

    // Fourth Row: Laser and Matter
    var laserIcon = new TowerIcon(
      this.gameEngine,
      "Laser",
      Laser.cost,
      this.towerImagesArray[5],
      leftX,
      y,
      22,
      35,
      this.ctx,
      this.level
    );
    this.storeIcons.push(laserIcon);
    var matterIcon = new TowerIcon(
      this.gameEngine,
      "Matter",
      Matter.cost,
      this.towerImagesArray[6],
      rightX,
      y,
      24,
      37,
      this.ctx,
      this.level
    );
    this.storeIcons.push(matterIcon);
    y += verticalSpace;

    // Fifth Row: Spazer, upgrade, and sell
    var spazerIcon = new TowerIcon(
      this.gameEngine,
      "Spazer",
      Spazer.cost,
      this.towerImagesArray[8],
      leftX,
      y,
      22,
      30,
      this.ctx,
      this.level
    );
    this.storeIcons.push(spazerIcon);
    var upgradeButton = new StoreButton(
      this.gameEngine,
      "upgrade",
      rightX,
      y,
      this.ctx,
      this.level
    );
    this.storeIcons.push(upgradeButton);
    var sellButton = new StoreButton(
      this.gameEngine,
      "sell",
      rightX,
      y + 40,
      this.ctx,
      this.level
    );
    this.storeIcons.push(sellButton);

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
    this.gameEngine.addEntity(upgradeButton);
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
		Add all mouse event listeners needed for interaction with 
		this TowerStoreMenu object to HTML canvas.
	*/
	implementMouseInteractions() {		
		// mouse click interactions
		this.ctx.canvas.addEventListener("click", this.towerStoreClick, false);
		
		// mouse move interactions
		this.ctx.canvas.addEventListener("mousemove", this.towerStoreMove, false);	
	};
	
	/*
		Remove all mouse event listeners associated with this TowerStoreMenu object 
		from the HTML canvas.
	*/	
	removeMouseInteractions() {			
		this.ctx.canvas.removeEventListener("click", this.towerStoreClick);
		
		this.ctx.canvas.removeEventListener("mousemove", this.towerStoreMove);		
	};
	
	/*
		Create the actions that will happen with the TowerStoreMenu object when
		the mouse is clicked within canvas	
	*/	
	createMouseClick(that) {
		return function (e) {
			var canvasCoordinates = getXandY(that, e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;
			var iconClickedOn = false;
			
			// go through store icon array to see if mouse cursor clicked on the box of a store icon
			for (var i = 0; i < that.storeIcons.length; i++) {
				var icon = that.storeIcons[i];
				var topLeftX = icon.xCanvas * that.widthScale;
				var topLeftY = icon.yCanvas * that.widthScale;
				var iconWidth = icon.iconBoxWidth * that.widthScale;
				var iconHeight = icon.iconBoxHeight * that.widthScale;
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					iconClickedOn = true;
					if (icon instanceof TowerIcon) {
						if (!icon.transparent) {
							if (!icon.selected) {							
								that.turnOnIcon(icon);
								that.selectedIcon = icon.getTowerType();							
								that.level.placeTowerType = icon.towerType;
								
							} else {
								that.turnOffIcon(icon);
								that.selectedIcon = "none";
							}
						} 
					} else if (icon instanceof StoreButton) {
						that.gameEngine.entities.forEach(function (entity) {
							if (entity instanceof Tower && entity.selected) {
								switch(icon.buttonName) {
									case "upgrade":
										entity.upgrade();
										break;
									case "sell":
										entity.sell();
										break;
								}
							}
						});
					}
				}						
			}
			
			// if mouse cursor clicked outside the boundaries of the map and not on a store icon, deselect the currently selected icon		
			var levelMapTopLeftX = that.level.xCanvas * that.widthScale;
			var levelMapTopLeftY = that.level.yCanvas * that.widthScale;
			var levelMapWidth = that.level.mapWidth * that.widthScale * that.level.drawScale;
			var levelMapHeight = that.level.mapHeight * that.widthScale * that.level.drawScale;
			if ( !iconClickedOn && 
				(x < levelMapTopLeftX || x > levelMapTopLeftX + levelMapWidth) 
				|| (y < levelMapTopLeftY || y > levelMapTopLeftY + levelMapHeight) ) {
				that.selectedIcon = "none";
			}
			
			// if mouse cursor selects a store icon while another icon is selected, then de-select the previous icon
			for (var i = 0; i < that.storeIcons.length; i++) {
				var icon = that.storeIcons[i];
				if (icon.isSelected() && icon.getTowerType() !== that.selectedIcon) 
					that.turnOffIcon(icon);
			}
			
			// if an icon is currently selected then turn on terrain grid map; otherwise turn the map off
			if (that.selectedIcon !== "none") {
				that.level.showGridMap = true;
			} else {
				that.level.showGridMap = false;
			}					
		}
	};
	
	/*
		Create the actions that will happen with the TowerStoreMenu object when
		the mouse is moved within canvas	
	*/
	createMouseMove(that) {
		return function (e) {
			var canvasCoordinates = getXandY(that, e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;			
			for (var i = 0; i < that.storeIcons.length; i++) {	
				var towerIcon = that.storeIcons[i];
				var topLeftX = towerIcon.xCanvas * that.widthScale;
				var topLeftY = towerIcon.yCanvas * that.widthScale;
				var iconWidth = towerIcon.iconBoxWidth * that.widthScale;
				var iconHeight = towerIcon.iconBoxHeight * that.widthScale;				
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					towerIcon.mouseover = true;
				} else {
					towerIcon.mouseover = false;
				}
			}				
		};
	};


  /*
		apply the mouse interaction for the tower store menu and its icons
	*/
	mouseInteraction() {
		var that = this;
		
		// Get x,y coordinates of canvas where mouse pointer is
		var getXandY = function (e) {
			var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
			var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
			
			return { x: x, y: y };
		}
		
		// add mouse click event listener which selects and de-selects the store icon when clicked on directly
		that.ctx.canvas.addEventListener("click", function (e) {
			var canvasCoordinates = getXandY(e);
			var x = canvasCoordinates.x;
			var y = canvasCoordinates.y;
			var iconClickedOn = false;
			
			// go through store icon array to see if mouse cursor clicked on the box of a store icon
			for (var i = 0; i < that.storeIcons.length; i++) {
				var icon = that.storeIcons[i];
				var topLeftX = icon.xCanvas * that.widthScale;
				var topLeftY = icon.yCanvas * that.widthScale;
				var iconWidth = icon.iconBoxWidth * that.widthScale;
				var iconHeight = icon.iconBoxHeight * that.widthScale;
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					iconClickedOn = true;
					if (icon instanceof TowerIcon) {
						if (!icon.transparent) {
							if (!icon.selected) {							
								that.turnOnIcon(icon);
								that.selectedIcon = icon.getTowerType();							
								that.level.placeTowerType = icon.towerType;
								
							} else {
								that.turnOffIcon(icon);
								that.selectedIcon = "none";
							}
						} 
					} else if (icon instanceof StoreButton) {
						that.gameEngine.entities.forEach(function (entity) {
							if (entity instanceof Tower && entity.selected) {
								switch(icon.buttonName) {
									case "upgrade":
										console.log("cost to upgrade: ", entity.upgradeCost);
										entity.upgrade();
										break;
									case "sell":
										entity.sell();
										break;
								}
							}
						});
					}
				}						
			}
			
			// if mouse cursor clicked outside the boundaries of the map and not on a store icon, deselect the currently selected icon		
			var levelMapTopLeftX = that.level.xCanvas * that.widthScale;
			var levelMapTopLeftY = that.level.yCanvas * that.widthScale;
			var levelMapWidth = that.level.mapWidth * that.widthScale * that.level.drawScale;
			var levelMapHeight = that.level.mapHeight * that.widthScale * that.level.drawScale;
			if ( !iconClickedOn && 
				(x < levelMapTopLeftX || x > levelMapTopLeftX + levelMapWidth) 
				|| (y < levelMapTopLeftY || y > levelMapTopLeftY + levelMapHeight) ) {
				that.selectedIcon = "none";
			}
			
			// if mouse cursor selects a store icon while another icon is selected, then de-select the previous icon
			for (var i = 0; i < that.storeIcons.length; i++) {
				var icon = that.storeIcons[i];
				if (icon.isSelected() && icon.getTowerType() !== that.selectedIcon) 
					that.turnOffIcon(icon);
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
			for (var i = 0; i < that.storeIcons.length; i++) {	
				var towerIcon = that.storeIcons[i];
				var topLeftX = towerIcon.xCanvas * that.widthScale;
				var topLeftY = towerIcon.yCanvas * that.widthScale;
				var iconWidth = towerIcon.iconBoxWidth * that.widthScale;
				var iconHeight = towerIcon.iconBoxHeight * that.widthScale;				
				if ( (x >= topLeftX && x <= topLeftX + iconWidth) && (y >= topLeftY && y <= topLeftY + iconHeight) ) {
					towerIcon.mouseover = true;
				} else {
					towerIcon.mouseover = false;
				}
			}
			// that.gameEngine.entities.forEach(function (entity) {
			// 	if (entity instanceof Tower) {
			//   		// tower shoots enemy in shooting bounds
			// 		let towerX = entity.x;
			// 		let towerY = entity.y;
			// 		let tileLength = that.level.getTilePixelImageSize();
			// 		if ( (x >= towerX - tileLength / 2 && x <= towerX + tileLength / 2) 
			// 			&& (y >= towerY - tileLength / 2 && y <= towerY + tileLength / 2)) {
			// 			console.log("here");
			// 		}
			// 	}
			//   });		
		}, false);
		
	};	
}


class TowerIcon {
  /*
		Constructor for the TowerIcon class
		
		Parameters:
		@gameEngine			the game engine that uses this tower icon object
		@towerType			the type of tower as a String
		@iconImage			the source file of the tower icon image
		@xCanvas 			the x-coordinate in canvas where top left corner of icon will be drawn
		@yCanvas 			the y-coordinate in canvas where top left corner of icon will be drawn
		@imageWidth			the width in pixels from the top left corner of the image to draw
		@imageHeight		the height in pixels from the top left corner of the image to draw
		@ctx				the canvas that this tower icon will be applied to
		@level				the level that will use this tower icon
	*/
  constructor(
    gameEngine,
    towerType,
    price,
    iconImage,
    xCanvas,
    yCanvas,
    imageWidth,
    imageHeight,
    ctx,
    level
  ) {
    Object.assign(this, {
      gameEngine,
      towerType,
      price,
      iconImage,
      xCanvas,
      yCanvas,
      imageWidth,
      imageHeight,
      ctx,
      level,
    });

    this.selected = false;
    this.mouseover = false;
    this.transparent = false;

    this.iconBoxWidth = 50;
    this.iconBoxHeight = 70;

    //		this.mouseInteraction();
  }

  /* 
		draw the entire tower icon on canvas
	*/
  draw(ctx) {
    ctx.beginPath();
    this.drawIcon(ctx);
    this.drawText(ctx);
    this.drawIconHighlight(ctx);
    ctx.closePath();
  }

  /*
		draw the icon box with the icon image inside it
	*/
  drawIcon(ctx) {
    // draw the box that will contain the tower icon image
    ctx.setLineDash([]);
    ctx.strokeStyle = "navy";
    ctx.lineWidth = 2;
    if (this.mouseover && !this.selected && !this.transparent) {
      switch (this.towerType) {
        case "Cannon":
          this.gameEngine.dB.messageCode = 1;
          break;
        case "Flame":
          this.gameEngine.dB.messageCode = 2;
          break;
        case "Laser":
          this.gameEngine.dB.messageCode = 3;
          break;
        case "Matter":
          this.gameEngine.dB.messageCode = 4;
          break;
        case "MG":
          this.gameEngine.dB.messageCode = 5;
          break;
        case "Pistol":
          this.gameEngine.dB.messageCode = 6;
          break;
        case "Rocket":
          this.gameEngine.dB.messageCode = 7;
          break;
        case "Shotgun":
          this.gameEngine.dB.messageCode = 8;
          break;
        case "Spazer":
          this.gameEngine.dB.messageCode = 9;
          break;
      }
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
    ctx.drawImage(
      this.iconImage,
      0,
      0,
      this.imageWidth,
      this.imageHeight,
      this.xCanvas + paddingWidth,
      this.yCanvas + paddingHeight,
      this.imageWidth,
      this.imageHeight
    );
    if (this.transparent) ctx.globalAlpha = 1;
  }

  /*
		draw the text that labels the tower icon
	*/
  drawText(ctx) {
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";
    ctx.strokeStyle = "black";

    var textWidth = ctx.measureText(this.towerType).width;
    var center = this.xCanvas + this.iconBoxWidth / 2;
    ctx.strokeText(this.towerType, center - textWidth / 2, this.yCanvas + 60);

    var coinString = `${this.price} Coins`;
    textWidth = ctx.measureText(coinString).width;
    ctx.strokeText(coinString, center - textWidth / 2, this.yCanvas + 85);
  }

  /*
		draw a highlight over the tower icon if selected
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
  }

  /*
		update the state of the icon
	*/
  update() {
    if (this.level.levelPaused) {
      this.transparent = true;
    } else {
      this.transparent = false;
    }
  }

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

class StoreButton {
  constructor(gameEngine, buttonName, xCanvas, yCanvas, ctx, level) {
    Object.assign(this, {
      gameEngine,
      buttonName,
      xCanvas,
      yCanvas,
      ctx,
      level,
    });

    this.selected = false;
    this.mouseover = false;

    this.transparent = false;

    this.iconBoxWidth = 50;
    this.iconBoxHeight = 30;
  }

  draw(ctx) {
    ctx.beginPath();
    this.drawIcon(ctx);
    this.drawText(ctx);
    this.drawIconHighlight(ctx);
    ctx.closePath();
  }

  drawIcon(ctx) {
    // draw the box that will contain the tower icon image
    ctx.setLineDash([]);
    ctx.strokeStyle = "navy";
    ctx.lineWidth = 2;
    if (this.mouseover) {
      ctx.fillStyle = "lightgrey";
      switch (this.buttonName) {
        case "upgrade":
          this.gameEngine.dB.messageCode = 10;
          break;
        case "sell":
          this.gameEngine.dB.messageCode = 11;
          break;
      }
    } else {
      ctx.fillStyle = "white";
    }
    ctx.rect(this.xCanvas, this.yCanvas, this.iconBoxWidth, this.iconBoxHeight);
    ctx.fill();
    ctx.stroke();
  }

  /*
		draw the text that labels the button icon
	*/
  drawText(ctx) {
    ctx.lineWidth = 1;
    ctx.font = "12px Arial";
    ctx.strokeStyle = "black";

    var textWidth = ctx.measureText(this.buttonName).width;
    var center = this.xCanvas + 50 / 2;
    ctx.strokeText(this.buttonName, center - textWidth / 2, this.yCanvas + 20);
  }

  /*
		draw a highlight over the button icon if selected
	*/
  drawIconHighlight(ctx) {}

  /*
		update the state of the button
	*/
  update() {
    if (this.level.levelPaused) {
      this.transparent = true;
    } else {
      this.transparent = false;
    }
  }

  /*
		Return the selection state of this button
	*/
  isSelected() {
    return this.selected;
  }
}
