class Level {
	/*
		Constructor for the Level class.
		- Parameters: 
			'gameEngine': the game engine that uses this level object,
			'mapImage': the source file of the map level image, 
			'xCanvas': the x-coordinate in canvas where top left corner of map will be drawn,
			'yCanvas': the y-coordinate in canvas where top left corner of map will be drawn,
			'topLeftCornerX': the x-coordinate of image to begin drawing from, 'topLeftCornerY': the y-coordinate of image to begin drawing from, 
			'mapWidth': the width in pixels from topLeftCornerX of the image to draw, 'mapHeight': the height in pixels from topLeftCornerY of the image to draw, 
			'drawScale': the scaling of how the image on canvas is drawn,
			'mapLevel': the numerical level of the image map
	*/
	constructor(gameEngine, mapImage, xCanvas, yCanvas, topLeftCornerX, topLeftCornerY, mapWidth, mapHeight, drawScale, mapLevel) {

		Object.assign(this, {gameEngine, mapImage, xCanvas, yCanvas, topLeftCornerX, topLeftCornerY, mapWidth, mapHeight, drawScale, mapLevel} );
		this.gameEngine.level = this;	
		this.terrainGridTiles = new LevelTerrainMap(this.mapLevel);
		this.showGridMap = false;
		
		// Numbers labeling a specific terrain for a tile.
		this.path = 0;
		this.towerTerrainOpen = 1;
		this.towerTerrainOccupied = -1;
		this.obstacle = 2;
	}
	
	/*
		Update the level map by turning on and off the terrain grid map
	*/
	update() {
		this.showGridMap = document.getElementById("grid_map").checked;
	}
	
	
	/*
	    Used by the game engine to officially draw the level map on canvas.
	*/
	draw(ctx) {
		this.drawMap(ctx, this.drawScale);  // draw map image itself
		
		// draw grid tiles on map if 'this.showGridMap' is set to true
		this.terrainGridTiles.showTileGrid(this.showGridMap, ctx, this.drawScale);
	}
	
	
	/*
		Draw the graphical image of the level map.
		- Parameters: 
			'ctx': the ID of the canvas that the map will be drawn on,
			'x': the x-coordinate on canvas where the top left corner of the image will be drawn on,
			'y': the y-coordinate on canvas where the top left corner of the image will be drawn on,
			'scale': the scaling of the width and height of the image drawn on canvas.
	*/
	drawMap(ctx, scale) {
		ctx.drawImage(this.mapImage, this.topLeftCornerX, this.topLeftCornerY, this.mapWidth, this.mapHeight, this.xCanvas, this.yCanvas, this.mapWidth * scale, this.mapHeight * scale);
	}
	
	
	/* 
		Get the terrain type that is assigned to a specified grid tile.
		- Parameters:  'row': the row number for the desired tile, 'column': the column number for the desired tile. 
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
			return "not_an_obstacle_on_grid";
		}
	}
	
	
	/*
		Set a specific tile, if it is tower terrain, to either occupied or unoccupied
		- '1' for towerTerrainOpen, '-1' for towerTerrainOccupied
		- Parameter:   'tile': the tile whose occupancy state is to be set.
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
	}
	
}


class LevelTerrainMap {
	constructor(mapLevel) {
		Object.assign(this, {mapLevel});
		this.mapArray = null;	
		this.numOfTileRows = null;
		this.numOfTileColumns = null;
		this.squareTileSidePixelLength = null;
		this.squareTileBorderPixelWeight = null;
		this.initializeGridMap();
		console.log(this.mapArray);
		
		this.path = 0;
		this.towerTerrainOpen = 1;
		this.towerTerrainOccupied = -1;
		this.obstacle = 2;
	}
	
	
	/*
		Create a pre-defined 2D array representing the terrain makeup of a level map.
	*/
	initializeGridMap() {
		if (this.mapLevel === 1) {
			this.levelOneMap();
		} 
	}
	
	
	/*
		Creates a 2D-array pre-defined for the first level
	*/
	levelOneMap() {
		this.numOfTileRows = 10;
		this.numOfTileColumns = 15;
		this.squareTileSidePixelLength = 40;
		this.squareTileBorderPixelWeight = 1;
		this.mapArray = [
			[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1],
			[1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
			[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1]			
		];		
	}
	
	
	/*
		Return the 2D terrain map array
	*/
	getMapArray() {
		return this.mapArray;
	}
	
	
	/*
		Get the number of rows of the 2D terrain array
	*/
	getNumOfRows() {
		return this.numOfTileRows;
	}
	
	
	/*
		Get the number of columns of the 2D terrain array
	*/
	getNumOfColumns() {
		return this.numOfTileColumns;
	}
	
	
	/*
		Return the value of a specific tile of the 2D terrain map array
		- Parameters: 'row': the row number of the tile, 'column': the column number of the tile
	*/
	getTile(row, column) {
		if ( (row >= 0 && row < this.getNumOfRows()) && (column >= 0 && column < this.getNumOfColumns()) ) {
			return this.mapArray[row][column];			
		} else {
			return "";
		}	
	}
	
	
	/*
		Set the value of a specific tile of the 2D terrain map array
		- Parameters: 
			'row': the row number of the tile, 
			'column': the column number of the tile, 
			'newValue': the new value of the specified tile
	*/
	setTile(row, column, newValue) {
		if ( (row >= 0 && row < this.getNumOfRows()) && (column >= 0 && column < this.getNumOfColumns()) ) {
			this.mapArray[row][column] = newValue;
		}
	}
	
	
	/*
		Turn on or turn off the tile grid map that highlights the terrain tiles of the map
		- Parameter:	
			'visible': the boolean that determines if the grid map is on (if true) or off (if false),
			'ctx': the ID of the canvas the grid map will be drawn on,
			'scale': the scaling of the dimensions of the grid map 
	*/
	showTileGrid(visible, ctx, scale) {
		if (visible === true) {
			var square = this.squareTileSidePixelLength * scale;	
			ctx.lineWidth = this.squareTileBorderPixelWeight * scale;
			for (var i = 0; i < this.numOfTileRows; i++) {
				for (var j = 0; j < this.numOfTileColumns; j++) {
					ctx.strokeRect(j * square, i * square, square, square);
				}
			}			
		}
	}
}
