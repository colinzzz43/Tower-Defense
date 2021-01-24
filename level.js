class Level {
	
	/*
		Constructor for the Level class.
		- Parameters: 
			'mapImage': the source file of the map level image, 
			'topLeftCornerX': the x-coordinate of image to begin drawing from, 'topLeftCornerY': the y-coordinate of image to begin drawing from, 
			'mapWidth': the width in pixels from topLeftCornerX of the image to draw, 'mapHeight': the height in pixels from topLeftCornerY of the image to draw, 
			'tileRows': the number of grid tile rows spanning the height of the map, 'tileColumns': the number of grid tile columns spanning the width of the map, 
			'squareTileDimension': the height and width in pixels of each grid tile, 'squareTileBorder': the boldness in pixels of the border separating adjacent grid tiles 
	*/
	constructor(mapImage, topLeftCornerX, topLeftCornerY, mapWidth, mapHeight, tileRows, tileColumns, squareTileDimension, squareTileBorder) {

		Object.assign(this, {mapImage, topLeftCornerX, topLeftCornerY, mapWidth, mapHeight, tileRows, tileColumns, squareTileDimension, squareTileBorder});
		this.tiles = [tileColumns][tileRows];
		
		this.xCanvas = null;
		this.yCanvas = null;
		
		this.path = 'path';
		this.towerTerrain = 'towerTerrain';
		this.obstacle = 'obstacle';
	}
	
	/*
		Draw the graphical image of the level map.
		- Parameters: 
			'ctx': the ID of the canvas that the map will be drawn on,
			'x': the x-coordinate on canvas where the top left corner of the image will be drawn on,
			'y': the y-coordinate on canvas where the top left corner of the image will be drawn on,
			'scale': the scaling of the width and height of the image drawn on canvas.
	*/
	drawMap(ctx, x, y, scale) {
		this.xCanvas = x;
		this.yCanvas = y;
		ctx.drawImage(this.mapImage, this.topLeftCornerX, this.topLeftCornerY, this.mapWidth, this.mapHeight, x, y, this.mapWidth * scale, this.mapWidth * scale);
	}
	
	
	/*
		Label each tile on each row, from top to bottom, on the image the appropriate terrain type using a .txt file.
		- '0' for 'towerTerrain', '1' for 'path, '2' for 'obstacle'.
		- Parameter: 'terrainLevelMap': the .txt file containing an array of numbers from 0 to 2 mapping each tile on the map a certain terrain type
		- Example of the text of a terrain level map .txt file:
			2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 2 1 1 1 1 0 0 0 0 0 0 0 0 0
			0 0 1 0 0 1 0 0 0 2 0 0 0 0 0
			0 0 1 0 0 1 0 0 0 1 1 1 1 1 1
			1 1 1 0 0 1 0 0 0 1 0 0 0 0 0
			0 0 0 0 0 1 1 1 1 1 0 0 0 0 0
			0 2 0 0 0 0 0 0 0 0 0 0 0 0 0
			0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
			2 2 2 0 0 0 2 2 2 0 0 0 2 2 0
	*/
	set mapTerrains(terrainLevelMap) {
		const lineReader = require('line-reader');
		
		int line = 0;
		lineReader.eachLine(terrainLevelMap, (line, last) => {
			for (let i = 0; i < line.length; i += 2) {
				if (line.substr(i, 1) === '0') this.tites[i/2][line] = this.towerTerrain;
				if (line.substr(i, 1) === '1') this.tites[i/2][line] = this.path;
				if (line.substr(i, 1) === '2') this.tites[i/2][line] = this.obstacle;
			}
			line++;
		}
	}
	
	/* 
		Get the terrain type that is assigned to a specified grid tile.
		- Parameters:  'row': the row number for the desired tile, 'column': the column number for the desired tile. 
	*/
	get terrainType(row, column) {
		if ( (column >= 0 && column < this.tileColumns) && (row >= 0 && row < this.tileRows) ) {
			return this.tiles[row][column];
		} else {
			return;
		}
	}
	
}