class Level {
	/*
		Constructor for the Level class.
		
		Parameters: 
			@gameEngine			the game engine that uses this level object
			@mapImage 			the source file of the map level image 
			@xCanvas 			the x-coordinate in canvas where top left corner of map will be drawn
			@yCanvas 			the y-coordinate in canvas where top left corner of map will be drawn
			@topLeftCornerX 	the x-coordinate of image to begin drawing from
			@topLeftCornerY 	the y-coordinate of image to begin drawing from
			@mapWidth 			the width in pixels from topLeftCornerX of the image to draw
			@mapHeight 			the height in pixels from topLeftCornerY of the image to draw
			@drawScale 			the scaling of how the image on canvas is drawn
			@mapLevel 			the numerical level of the image map
			@ctx 				the canvas that this level map image will be applied to
	*/
	constructor(
		gameEngine,
		mapImage,
		xCanvas,
		yCanvas,
		topLeftCornerX,
		topLeftCornerY,
		mapWidth,
		mapHeight,
		drawScale,
		mapLevel,
		ctx
	) {
		Object.assign(this, {
			gameEngine,
			mapImage,
			xCanvas,
			yCanvas,
			topLeftCornerX,
			topLeftCornerY,
			mapWidth,
			mapHeight,
			drawScale,
			mapLevel,
			ctx,
		});

		// Apply game engine
		this.gameEngine.level = this;
		this.levelSpeedMultiplier = this.gameEngine.camera.speed;
		this.levelPaused = this.gameEngine.camera.paused;

		// Initialize terrain map grid for this level
		this.terrainGridTiles = new LevelTerrainMap(this);

		// Switch to turn on (true) and off (false) the visual grid map
		this.showGridMap = false;

		// Numbers labeling a specific terrain for a tile.
		this.path = 0;
		this.towerTerrainOpen = 1;
		this.towerTerrainOccupied = -1;
		this.obstacle = 2;

		// Type of tower to be placed. Modified by mouseInteraction method in TowerIcon class
		this.placeTowerType = "";
		
		// The most recently placed tower on the map
		this.newestTower = null;
//		this.placedTowers = [];
		
		// A 2D-Array that is relative to towers placed on tiles on the map
		this.mapOfTowers = [this.terrainGridTiles.numOfTileRows];
		for (var i = 0; i < this.terrainGridTiles.numOfTileRows; i++) {
			this.mapOfTowers[i] = new Array(this.terrainGridTiles.numOfTileColumns);
			for (var j = 0; j < this.terrainGridTiles.numOfTileColumns; j++) {
				this.mapOfTowers[i][j] = null;
			}			
		}
		
		// The base where the enemies move towards
		var baseTile = this.terrainGridTiles.getDestination();
		var baseXcoords = Math.floor( (baseTile.column * this.getTilePixelImageSize()) + 
							(this.xCanvas - (this.getTilePixelImageSize() / 2)) );
		var baseYcoords = Math.floor( (baseTile.row * this.getTilePixelImageSize()) +
							(this.getTilePixelImageSize() / 2) + this.yCanvas);
		this.base = new Base(this.gameEngine, baseXcoords, baseYcoords);
		this.gameEngine.addEntity(this.base);

		// Apply mouse click interaction of tiles to this level
		this.mouseInteraction();
		this.mouseHighlightedTile = {
		  row: -1,
		  column: -1,
		  color: "lightyellow",
		  mouse: "offMap",
		};
		this.interactionScale = widthScaling();

		this.user = this.gameEngine.camera.user; // the user interacting with the tower
		
		// Spawn the enemy waves on this level
//		this.levelEnemyWaves = new LevelWave(this);
	};

	/*
		Update does nothing to level
	*/
	update() {
		this.levelSpeedMultiplier = this.gameEngine.camera.speed;
		this.levelPaused = this.gameEngine.camera.paused;
		
		// update towers
		for (var i = 0; i < this.mapOfTowers.length; i++) {
			for (var j = 0; j < this.mapOfTowers[i].length; j++) {
				if (this.mapOfTowers[i][j] != null)
					this.mapOfTowers[i][j].update();
			}			
		}
	};

	/*
	    Used by the game engine to officially draw the level map on canvas.
	*/
	draw(ctx) {
		// draw map image itself
		this.drawMap(ctx, this.drawScale);

		// draw grid tiles on map if 'this.showGridMap' is set to true
		this.terrainGridTiles.showTileGrid(this.showGridMap, ctx, this.drawScale);

		// draw highlight on tile that the mouse cursor is currently over
		this.terrainGridTiles.drawTileHighlight(
			this.mouseHighlightedTile.row,
			this.mouseHighlightedTile.column,
			this.mouseHighlightedTile.color,
			this.mouseHighlightedTile.mouse
		);
		
		this.base.draw(ctx);
		
		// draw towers
		for (var i = 0; i < this.mapOfTowers.length; i++) {
			for (var j = 0; j < this.mapOfTowers[i].length; j++) {
				if (this.mapOfTowers[i][j] != null)
					this.mapOfTowers[i][j].draw(ctx);
			}			
		}
	};

	/*
		Draw the graphical image of the level map.
		
		Parameters: 
		@ctx		the ID of the canvas that the map will be drawn on
		@scale		the scaling of the width and height of the image drawn on canvas
	*/
	drawMap(ctx, scale) {
		ctx.drawImage(
			this.mapImage,
			this.topLeftCornerX,
			this.topLeftCornerY,
			this.mapWidth,
			this.mapHeight,
			this.xCanvas,
			this.yCanvas,
			this.mapWidth * scale,
			this.mapHeight * scale
		);
	};

	/* 
		Get the terrain type that is assigned to a specified grid tile.
		
		Parameters:
		@row		the row number for the desired tile 
		@column		the column number for the desired tile
	*/
	getTerrainType(row, column) {
		var tile = this.terrainGridTiles.getTile(row, column);
		if (tile === this.towerTerrainOpen) {
			return "towerTerrainOpen";
		} else if (tile === this.towerTerrainOccupied) {
			return "towerTerrainOccupied";
		} else if (tile === this.path) {
			return "path";
		} else if (tile === this.obstacle) {
			return "obstacle";
		} else {
			return "not_a_tile_on_grid";
		}
	};

	/*
		Set a specific tile, if it is tower terrain, to either occupied (-1) or unoccupied (1)
		
		Parameters:   
		@row		the row of the tile whose occupancy state is to be set.
		@column		the column of the tile whose occupancy state is to be set.
	*/
	changeStateOfTowerTerrain(row, column) {
		var tile = this.terrainGridTiles.getTile(row, column);
		if (tile !== this.towerTerrainOpen) {
			if (tile === this.towerTerrainOccupied) {
				this.terrainGridTiles.setTile(row, column, this.towerTerrainOpen);
			}
		} else {
		  this.terrainGridTiles.setTile(row, column, this.towerTerrainOccupied);
		}
		// console.log(this.terrainGridTiles.getMapArray());
	};

	/*
		Apply a mouse click interaction to the level map image
	*/
	mouseInteraction() {
		var that = this;

		// Get x,y coordinates of canvas where mouse pointer is
		var getXandY = function (e) {
			var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
			var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

			return { x: x, y: y };
		};

		// Add mouse click event listener that enables mouse user to place towers via clicking tiles on this level map, and highlight the clicked tiles a specific color: green if tower is successuful placed, red if otherwise
		that.ctx.canvas.addEventListener(
			"click",
			function (e) {
				var canvasCoordinates = getXandY(e);
				var tileSideLength = that.getTilePixelImageSize();
				var x = canvasCoordinates.x;
				var y = canvasCoordinates.y;
				var row = Math.floor( (y-(that.yCanvas*that.interactionScale)) / (tileSideLength * that.interactionScale));
				var column = Math.floor( (x-(that.xCanvas*that.interactionScale)) / (tileSideLength * that.interactionScale));
				var topLeftX = that.xCanvas * that.interactionScale;
				var topLeftY = that.yCanvas * that.interactionScale;
				var canvasWidth =
					that.drawScale * that.mapWidth * that.interactionScale;
				var canvasHeight =
					that.drawScale * that.mapHeight * that.interactionScale;
				if 	(
					x >= topLeftX &&
					x < topLeftX + canvasWidth &&
					y >= topLeftY &&
					y < topLeftY + canvasHeight &&
					that.showGridMap
				) {
					if (
						that.terrainGridTiles.getTile(row, column) ===
						that.towerTerrainOpen &&
						that.showGridMap
					) {
						that.placeTower(row, column);
						console.log('click green tile');
						that.mouseHighlightedTile = {
							row: row,
							column: column,
							color: "lawngreen",
							mouse: "onMap",
						};
					} else {
						that.mouseHighlightedTile = {
							row: row,
							column: column,
							color: "red",
							mouse: "onMap",
						};
					}
				}
				that.gameEngine.entities.forEach(function (entity) {
					if (entity instanceof Tower) {
						let towerX = Math.floor(entity.x * that.interactionScale);
						let towerY = Math.floor(entity.y * that.interactionScale);
						let boundBoxOffset = (tileSideLength*that.interactionScale) / 2
						if ( ( x >= towerX - boundBoxOffset && x <= towerX + boundBoxOffset ) 
							&& ( y >= towerY - boundBoxOffset && y <= towerY + boundBoxOffset ) ) {
							if (entity.selected == false) {
								entity.selected = true;
							} else {
								entity.selected = false;
							}
						} 
					}
				});	
			},
			false
		);

		// Add mouse move event listener that enables mouse user to highlight a terrain tile via moving over it on this level map
		that.ctx.canvas.addEventListener(
			"mousemove",
			function (e) {
				var canvasCoordinates = getXandY(e);
				var tileSideLength = that.getTilePixelImageSize();
				var x = canvasCoordinates.x;
				var y = canvasCoordinates.y;
				var row = Math.floor( (y-(that.yCanvas*that.interactionScale)) / (tileSideLength * that.interactionScale) );
				var column = Math.floor( (x-(that.xCanvas*that.interactionScale)) / (tileSideLength * that.interactionScale) );
				var topLeftX = (that.xCanvas * that.interactionScale);
				var topLeftY = (that.yCanvas * that.interactionScale);
				var canvasWidth =
					that.drawScale * that.mapWidth * that.interactionScale;
				var canvasHeight =
					that.drawScale * that.mapHeight * that.interactionScale;
				if (
					x >= topLeftX &&
					x < topLeftX + canvasWidth &&
					y >= topLeftY &&
					y < topLeftY + canvasHeight &&
					that.showGridMap
				) {
					that.mouseHighlightedTile = {
						row: row,
						column: column,
						color: "white",
						mouse: "onMap",
					};
				} else {
					that.mouseHighlightedTile = {
						row: row,
						column: column,
						color: "white",
						mouse: "offMap",
					};
				}	
			},
			false
		);

		// Add mouse out event listener that enables level to un-highlight any tile the mouse cursor last moved over when the cursor moved outside the level boundaries
		that.ctx.canvas.addEventListener(
			"mouseout",
			function (e) {
				var canvasCoordinates = getXandY(e);
				that.mouseHighlightedTile = {
					row: 0,
					column: 0,
					color: "white",
					mouse: "offMap",
				};
			},
			false
		);
	};

  /*
		Add a new tower entity to the level map grid and the game engine itself
		
		Parameters: 
		@row		the row of the tile grid where new tower will be placed
		@column		the column of the tile grid where new tower will be placed
	*/
  placeTower(row, column) {
    var xTower = (column * this.getTilePixelImageSize()) + this.xCanvas;
    var yTower = (row * this.getTilePixelImageSize()) + this.yCanvas;
    var xOffset = (this.terrainGridTiles.squareTileSidePixelLength / 2) * this.drawScale;
    var yOffset = (this.terrainGridTiles.squareTileSidePixelLength / 2) * this.drawScale;
    switch (this.placeTowerType) {
      case "Pistol":
        if (this.enoughPurchasePower(Pistol.cost)) {
          var newTower = new Pistol(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "MG":
        if (this.enoughPurchasePower(MG.cost)) {
          var newTower = new MG(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Shotgun":
        if (this.enoughPurchasePower(Shotgun.cost)) {
          var newTower = new Shotgun(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Cannon":
        if (this.enoughPurchasePower(Cannon.cost)) {
          var newTower = new Cannon(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Flame":
        if (this.enoughPurchasePower(Flamethrower.cost)) {
          var newTower = new Flamethrower(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Laser":
        if (this.enoughPurchasePower(Laser.cost)) {
          var newTower = new Laser(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Matter":
        if (this.enoughPurchasePower(Matter.cost)) {
          var newTower = new Matter(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Rocket":
        if (this.enoughPurchasePower(Rocket.cost)) {
          var newTower = new Rocket(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Spazer":
        if (this.enoughPurchasePower(Spazer.cost)) {
          var newTower = new Spazer(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
    }
    if (newTower) {
      this.gameEngine.addEntity(newTower);
      this.changeStateOfTowerTerrain(row, column);
//	  this.placedTowers.push(newTower);
	  this.mapOfTowers[row][column] = newTower;
	  this.newestTower = this.mapOfTowers[row][column];
    }
  };
  
	/*
		Remove a tower that is already placed on the map 
		(happens only when 'Undo' user icon is successfully clicked on)
		
		Parameters:
		@row		the row where the desired tower to be removed is at
		@column		the column where the desired tower to be removed is at
	*/
	removeTower(row, column) {
		var gridTile = this.terrainGridTiles.getTile(row, column);
		if ( gridTile === this.towerTerrainOccupied ) {
			var towerTile = this.mapOfTowers[row][column].getTilePosition();
			if (this.newestTower !== null) {
				var tileOfNewestTower = this.newestTower.getTilePosition();
				if ( towerTile.row === tileOfNewestTower.row
					 && towerTile.column === tileOfNewestTower.column ) {
					this.newestTower = null;
				}
			}
			this.mapOfTowers[row][column].removeFromWorld = true;
			this.mapOfTowers[row][column] = null;
			this.changeStateOfTowerTerrain(row, column);
			
			/*
			var i = 0;
			var numberOfTowers = this.placedTowers.length;
			var tileOfNewestTower = this.newestTower.getTilePosition();
			while ( i < numberOfTowers && this.newestTower !== null ) {
				var towerTile = this.placedTowers[i].getTilePosition();
				if ( towerTile.row === tileOfNewestTower.row
					 && towerTile.column === tileOfNewestTower.column ) {
					this.placedTowers[i].removeFromWorld = true;
					this.placedTowers.splice(i, 1);
					this.newestTower = null;
					this.changeStateOfTowerTerrain(row, column);
				};
				i++;
			};
			*/
			
		}
	};

	/*
		Check balance before placing the towers
	*/
	enoughPurchasePower(cost) {
		console.log("Balance is: ", this.user.balance, " and it costs: ", cost);
		if (this.user.balance >= cost) return true;
		else return false;
	};

	/*
		Return the tile grid that this level uses
	*/
	getGrid() {
		return this.terrainGridTiles;
	};

	/*
		Return the pixel length of a square tile as drawn to scale on the canvas
	*/
	getTilePixelImageSize() {
		return (
		this.terrainGridTiles.getSquareTileSidePixelLength() * this.drawScale
		);
	};
}

class LevelTerrainMap {
    /*
		Constructor for the LevelTerrainMap
		
		Parameter:
		@level		the level itself that this new terrain tile map will be put on
	*/
  constructor(level) {
    Object.assign(this, { level });
	
	// The grid map array itself
    this.mapArray = null;
	this.xCanvas = this.level.xCanvas;
	this.yCanvas = this.level.yCanvas;
	
	// Number of tile rows and columns, the pixel length of each tile, and thickness of tile border
    this.numOfTileRows = null;
    this.numOfTileColumns = null;
    this.squareTileSidePixelLength = null;
    this.squareTileBorderPixelWeight = null;
	
	// tile where fixed path begins
	this.startTile = null;
	this.startDirection = null;
	
	// tile where fixed path ends
    this.destinationTile = null;
	
	// array of tiles that each mark a turn of direction on the fixed path
	// they are listed in the order relative from the path's beginning to the end
	this.pathTurns = [];
	
	// initiailize the grip map for the specific level
    this.initializeGridMap();

    this.path = 0;
    this.towerTerrainOpen = 1;
    this.towerTerrainOccupied = -1;
    this.obstacle = 2;
  };


    /*
		Initialize the grid map for the specified level.
	*/
  initializeGridMap() {
    if (this.level.mapLevel === 1) {
      this.setLevelMapGridProperities(levelOneGrid);   // 'levelOneGrid' from 'levelMapProperties.json'
    }
  };


	/*
		Take the pre-defined propertries of the map grid
		for the specified level from a JSON file
		
		@levelFile		the pre-defined data stored in a JSON file
	*/
  setLevelMapGridProperities(levelFile) {
    this.numOfTileRows = levelFile.tileRows;
    this.numOfTileColumns = levelFile.tileColumns;
    this.squareTileSidePixelLength = levelFile.tilePixelLength;
    this.squareTileBorderPixelWeight = levelFile.tileBorderPixelWeight;

    this.mapArray = levelFile.mapArray;
	
	this.startTile = levelFile.startTile;
	this.startDirection = levelFile.startDirection;
    this.destinationTile = levelFile.destinationTile;
	
	var tileTurns = levelFile.tileTurns;
	this.initializePathTurns(tileTurns);	
  };

  /*
		Initialize the array that contains all the tiles in which the path changes direction 
		on the tile grid, and that each tile contains the xy coordinates marking their tile center
		in which the enemy changes direction on
		
		Parameter:
		
		@tileTurns	the array containing all the tile locations where the path changes direction
    */
  initializePathTurns(tileTurns) {
	  
	// values used to calculate a square tile's center coordinates
	var tileSideLength = this.level.drawScale * this.squareTileSidePixelLength;
	var tileCenterOffset = tileSideLength / 2;	  	  
	  
	for (var i = 0; i < tileTurns.length; i++) {
		var turnRow = tileTurns[i][0];
		var turnColumn = tileTurns[i][1];
		this.pathTurns.push(
			{ row: turnRow, 
			  column: turnColumn, 
			  centerX: (tileSideLength * turnColumn) + tileCenterOffset + this.xCanvas,
			  centerY: (tileSideLength * turnRow) + tileCenterOffset + this.yCanvas
			}
		);
	}
  };

  /*
		Return the 2D terrain map array
	*/
  getMapArray() {
    return this.mapArray;
  };

  /*
		Get the number of rows of the 2D terrain array
	*/
  getNumOfRows() {
    return this.numOfTileRows;
  };

  /*
		Get the number of columns of the 2D terrain array
	*/
  getNumOfColumns() {
    return this.numOfTileColumns;
  };

  /*
		Return the value of a specific tile of the 2D terrain map array
		
		Parameters: 
		@row		the row number of the tile
		@column		the column number of the tile
	*/
  getTile(row, column) {
    if (
      row >= 0 &&
      row < this.getNumOfRows() &&
      column >= 0 &&
      column < this.getNumOfColumns()
    ) {
      return this.mapArray[row][column];
    } else {
      return "off_grid";
    }
  };

  /*
		Set the value of a specific tile of the 2D terrain map array
		
		Parameters: 
		@row			the row number of the tile, 
		@column			the column number of the tile, 
		@newValue		the new value of the specified tile
	*/
  setTile(row, column, newValue) {
    if (
      row >= 0 &&
      row < this.getNumOfRows() &&
      column >= 0 &&
      column < this.getNumOfColumns()
    ) {
      this.mapArray[row][column] = newValue;
    }
  };

  /*
		Return the tile that is marked the start tile on this tile grid
    */
  getStart() {
	return this.startTile;
  }

  /*
		Return the tile that is marked the destination tile on this tile grid
	*/
  getDestination() {
    return this.destinationTile;
  };

  /*
		Return the pixel length of the side of the grid tile
	*/
  getSquareTileSidePixelLength() {
    return this.squareTileSidePixelLength;
  };
  
  /*
		Return the pixel length of the side of the grid tile, but it is scaled to the map drawn on cavnas
	*/
  getScaledSquareTilePixelLength() {
	  return this.squareTileSidePixelLength * this.level.drawScale;
  };

  /*
		Turn on or turn off the tile grid map that highlights the terrain tiles of the map
		
		Parameter:	
		@visible	the boolean that determines if the grid map is on (if true) or off (if false)
	*/
  showTileGrid(visible) {
    if (visible === true) {
      var square = this.squareTileSidePixelLength * this.level.drawScale;
      this.level.ctx.beginPath();
      this.level.ctx.setLineDash([]);
      this.level.ctx.lineWidth = 1;
      this.squareTileBorderPixelWeight * this.level.drawScale;
      this.level.ctx.strokeStyle = "gold";
      for (var i = 0; i < this.numOfTileRows; i++) {
        for (var j = 0; j < this.numOfTileColumns; j++) {
          this.level.ctx.strokeRect((j * square) + this.xCanvas, (i * square) + this.yCanvas, square, square);
        }
      }
      this.level.ctx.lineWidth = 1;
      this.level.ctx.strokeStyle = "black";
      this.level.ctx.closePath();
    }
  };

  /*
		Draw a transparent square of a specified color that highlights one terrain tile grid
		
		Parameters:
		@row		the row of the tile that is to be highlighted
		@column		the column of the tile that is to be highlighted
		@color		the color of the highlight
		@mouse		indication if the mouse is on ("onMap") or off ("offMap") the grid area
	*/
  drawTileHighlight(row, column, color, mouse) {
    // set stroke settings before drawing highlight
    var squarePixelSide = this.level.getTilePixelImageSize();
    this.level.ctx.beginPath();
    this.level.ctx.fillStyle = color;
    this.level.ctx.lineWidth = this.squareTileBorderPixelWeight * 3;
    this.level.ctx.strokeStyle = color;
    this.level.ctx.setLineDash([]);
	var xOffset = this.level.xCanvas;
	var yOffset = this.level.yCanvas;

    // if mouse is "onMap" then draw highlight; otherwise don't draw a highlight
    if (mouse === "onMap") {
      this.level.ctx.rect(
        (column * squarePixelSide) + xOffset,
        (row * squarePixelSide) + yOffset,
        squarePixelSide,
        squarePixelSide
      );
      if (color === "red") {
        // if the highlight color is red, draw an 'X' inside the red box
        this.level.ctx.moveTo(
			(column * squarePixelSide) + xOffset, 
			(row * squarePixelSide) + yOffset
		);
        this.level.ctx.lineTo(
          ((column + 1) * squarePixelSide) + xOffset,
          ((row + 1) * squarePixelSide) + yOffset
        );
        this.level.ctx.moveTo(
          (column * squarePixelSide) + xOffset,
          ((row + 1) * squarePixelSide) + yOffset
        );
        this.level.ctx.lineTo(
          ((column + 1) * squarePixelSide) + xOffset,
          (row * squarePixelSide) + yOffset
        );
      }
    } else {
      this.level.ctx.rect(0, 0, 0, 0);
    }
    this.level.ctx.stroke();
    this.level.ctx.globalAlpha = 0.5;
    this.level.ctx.fill();

    // set stroke settings back to what they were prior to calling this method
    this.level.ctx.globalAlpha = 1;
    this.level.ctx.fillStyle = "black";
    this.level.ctx.strokeStyle = "black";
    this.level.ctx.lineWidth = 1;
    this.level.ctx.closePath();
  };
}
