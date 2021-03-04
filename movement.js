class EnemyMovement {
	/*
		Constructor fot the EnemyMovement class
		
		Parameters:
		@speed 			the speed of the enemy's movement,
		@direction 		the direction of the enemy's movement,
		@x 				the current x-coordinate on canvas of where the enemy is located,
		@y 				the current y-coordiante on canvas of where the enemy is located,
		@levelGrid 		the terrain tile grid that the enemy will move on
	*/
	constructor(speed, direction, x, y, levelGrid) {
		Object.assign(this, {speed, direction, x, y, levelGrid});
		
		// The tile on the level grid of where the enemy is located
		this.tileSideScale = this.levelGrid.getScaledSquareTilePixelLength();
		this.currentTileRow = Math.floor( (this.y - this.levelGrid.yCanvas) / this.tileSideScale);
		this.currentTileColumn = Math.floor( (this.x - this.levelGrid.xCanvas)  / this.tileSideScale);
		
		// The possible directions for the enemy to go
		this.up = "up";
		this.right = "right";
		this.down = "down";
		this.left = "left";
		this.neutral = "neutral";
		
		this.nextTurnAtTile = null;
	};
	
	
	/*
		Change the current direction of the enemy by making it turn 'left' or 'right' that is relative to the enemy's current direction
		
		Parameters: 
		@row		 the tile row where the enemy currently is, 
		@column		 the tile column where the enemy currently is
	*/
	changeDirection(row, column) {
		switch(this.direction) {
			case "up":   // if enemy is currently moving vertically up on map, make it go horizontally left or right relative to view from map			
				if (this.levelGrid.getTile(row, column - 1) === 0) {
					this.direction = "left";
				} else {
					this.direction = "right";
				}
				break;
			case "right":  // if enemy is currently horizontally right on map, make it go vertically up or down relative to view from map
				if (this.levelGrid.getTile(row - 1, column) === 0) {					
					this.direction = "up";					
				} else {
					this.direction = "down";
				}
				break;
			case "down":  // if enemy is currently moving vertically down on map, make it go horizontally left or right relative to view from map
				if (this.levelGrid.getTile(row, column + 1) === 0) {
					this.direction = "right";
				} else {
					this.direction = "left";
				}
				break;
			case "left":   // if enemy is currently horizontally left on map, make it go vertically up or down relative to view from map
				if (this.levelGrid.getTile(row + 1, column) === 0) {
					this.direction = "down";
				} else {
					this.direction = "up";
				}
				break;
			default:	// if there is path terrain to change direction to, set enemy direction to neutral
				this.direction = "neutral";
				break;
		}
		this.turns++;
	};
	
	
	// Return the current direction of the enemy
	getDirection() {
		return this.direction;
	};
	
	
	// Return the terrain type of the next adjacent tile in the enemy's current direction
	getNextTerrainTileInCurrentDirection() {
		switch(this.direction) {
			case "up": 
				return this.levelGrid.getTile(this.currentTileRow - 1, this.currentTileColumn);
				break;
			case "right":
				return this.levelGrid.getTile(this.currentTileRow, this.currentTileColumn + 1);
				break;
			case "down":
				return this.levelGrid.getTile(this.currentTileRow + 1, this.currentTileColumn);
				break;
			case "left":
				return this.levelGrid.getTile(this.currentTileRow, this.currentTileColumn - 1);
				break;
			default:  // if direction is 'neutral', return the tile the enemy is standing on
				return this.levelGrid.getTile(this.currentTileRow, this.currentTileColumn);
				break;
		}
	};
	
	/*
		Iterate through all turn tiles on level map and return the 
		nearest path turn tile in the enemy's current direction
		
		Parameter:
		@direction		the current direction the enemy is facing
	*/
	scanForNextTurnInCurrentDirection() {

		// Retrieve the array of the level grid's path turns and set closest turn tile to null
		var pathTurns = this.levelGrid.getPathTurns();
		var closestTurnTile = null;
		
		// Make the pixel length offset used to help calculate the turn tile's center coordinates
		var centerOffset = this.tileSideScale / 2;
		
		console.log(this.direction);
		
		// Using enemy's current direction to scan path turns array for closest turn tile in front of enemy.
		// Each direction case has the same steps, but slightly different calculations for each case.
		// The steps are explained thoroughly in the "up" case of the 'switch' code section
		switch(this.direction) {
			
			case "up":		
				// Step 1: Create a object containing incomplete information about the next turn tile
				closestTurnTile = {
					row: null, 
					column: this.currentTileColumn, 
					centerX: this.x, 
					centerY: null, 
					directions: null
				}
				
				// Loop through all the map's path turn tiles to find the closest turn tile
				// that is in the enemy's direction (Steps 2 - 4 will be repeated with each tile)
				for (var i = 0; i < pathTurns.length; i++) {
					
					// Step 2: If an iterated map turn tile is located in the enemy's current direction
					// and is not located on the same tile where the enemy is,
					// then consider that turn tile
					if (pathTurns[i].column === this.currentTileColumn
						&& pathTurns[i].row !== this.currentTileRow) {
							
						// Step 3: If that turn tile is closer to the enemy than a previously considered
						// turn tile or that there has not yet been a turn tile considered,
						// then mark that turn tile as the closest tile to change direction on.
						if (pathTurns[i].row < this.currentTileRow 
							&& (pathTurns[i].row > closestTurnTile.row 
							|| closestTurnTile.row === null) ) {
							
							// Step 4: Get the x and y pixel coordinates of the center of that marked turn tile
							// and then create a new object that has the closest turn tile
							var x = (pathTurns[i].column * this.tileSideScale) + this.levelGrid.xCanvas + centerOffset;
							var y = (pathTurns[i].row * this.tileSideScale) + this.levelGrid.yCanvas + centerOffset;
							closestTurnTile = {
								row: pathTurns[i].row, 
								column: this.currentTileColumn, 
								centerX: x, 
								centerY: y,
								directions: pathTurns[i].directions
							}							
						}						
					}
				}
				break;
				
			case "right":		
				// Step 1
				closestTurnTile = {
					row: this.currentTileRow, 
					column: null, 
					centerX: null, 
					centerY: this.y, 
					directions: null
				}
				
				// Loop
				for (var i = 0; i < pathTurns.length; i++) {;
					
					// Step 2
					if (pathTurns[i].column !== this.currentTileColumn
						&& pathTurns[i].row === this.currentTileRow) {
							
						// Step 3
						if (pathTurns[i].column > this.currentTileColumn 
							&& (pathTurns[i].column < closestTurnTile.column 
								|| closestTurnTile.column === null) ) {						
							  
							// Step 4
							var x = (pathTurns[i].column * this.tileSideScale) + this.levelGrid.xCanvas + centerOffset;
							var y = (pathTurns[i].row * this.tileSideScale) + this.levelGrid.yCanvas +centerOffset;
							closestTurnTile = {
								row: this.currentTileRow, 
								column: pathTurns[i].column, 
								centerX: x, 
								centerY: y,
								directions: pathTurns[i].directions
							};						
						}
					}
				}
				
				
				if (closestTurnTile.column === null)
					closestTurnTile = {
						row: -1, 
						column: -1, 
						centerX: -100, 
						centerY: -100, 
						directions: ["neutral"]
					}			
				break;	
				
			case "down":
				// Step 1:
				closestTurnTile = {
					row: null, 
					column: this.currentTileColumn, 
					centerX: this.x, 
					centerY: null, 
					directions: null
				}
				
				// Loop:
				for (var i = 0; i < pathTurns.length; i++) {
					
					// Step 2:
					if (pathTurns[i].column === this.currentTileColumn
						&& pathTurns[i].row !== this.currentTileRow) {
							
						// Step 3:
						if ( pathTurns[i].row > this.currentTileRow
							&& (pathTurns[i].row < closestTurnTile.row 
								|| closestTurnTile.row === null) ) {
							
							// Step 4:
							var x = (pathTurns[i].column * this.tileSideScale) + this.levelGrid.xCanvas + centerOffset;
							var y = (pathTurns[i].row * this.tileSideScale) + this.levelGrid.yCanvas + centerOffset;
							closestTurnTile = {
								row: pathTurns[i].row, 
								column: this.currentTileColumn, 
								centerX: x, 
								centerY: y,
								directions: pathTurns[i].directions
							}							
						}						
					}
				}
				break;
				
			case "left":
				// Step 1
				closestTurnTile = {
					row: this.currentTileRow, 
					column: null, 
					centerX: null, 
					centerY: this.y, 
					directions: null
				}
				
				// Loop
				for (var i = 0; i < pathTurns.length; i++) {
					
					// Step 2
					if (pathTurns[i].column !== this.currentTileColumn
						&& pathTurns[i].row === this.currentTileRow) {
							
						// Step 3
						if (pathTurns[i].column < this.currentTileColumn
							&& (pathTurns[i].column > closestTurnTile.column 
								|| closestTurnTile.column === null) ) {						
							  
							// Step 4
							var x = (pathTurns[i].column * this.tileSideScale) + this.levelGrid.xCanvas + centerOffset;
							var y = (pathTurns[i].row * this.tileSideScale) + this.levelGrid.yCanvas +centerOffset;
							closestTurnTile = {
								row: this.currentTileRow, 
								column: pathTurns[i].column, 
								centerX: x, 
								centerY: y,
								directions: pathTurns[i].directions
							};
							console.log(`Grid Coords: ${this.levelGrid.xCanvas}, ${this.levelGrid.yCanvas}`);
							console.log(`Closest Row: ${closestTurnTile.row}; Closest Column: ${closestTurnTile.column}; At Coords: ${closestTurnTile.centerX},${closestTurnTile.centerY}`);
						}
					}
				}
				break;
				
			default:
				closestTurnTile = {
					row: -1, 
					column: -1, 
					centerX: -100, 
					centerY: -100, 
					directions: ["neutral"]
				}
				break;
				
		}
		console.log(`Next Tile: Coords {${closestTurnTile.centerX}, ${closestTurnTile.centerY}}; Tile {${closestTurnTile.row}, ${closestTurnTile.column}}`);
		this.nextTurnAtTile = closestTurnTile;
//		return closestTurnTile;
	};
	
	/*
		Return the coordinates and legal direction of the enemy's upcoming path turn tile
	*/
	getNextTurnTile() {
		return this.nextTurnAtTile;
	}
	
	
	// Return the canvas coordinates of the enemy on the level tile grid.
	getCoordinates() {
		return {x: this.x, y: this.y, tileRow: this.currentTileRow, tileColumn: this.currentTileColumn};
	};
	
	
	/*
		Update the current canvas position and tile position of enemy on level tile grid.
		
		Parameters:
		@x	 the x-coordinate on canvas of where the enemy's position will be,
		@y	 the y-coordainte on canvas of where the enemy's position will be
	*/
	updatePosition(x, y) {
		this.x = x;
		this.y = y;
			
		this.currentTileRow = Math.floor( (this.y-this.levelGrid.yCanvas) / this.tileSideScale);
		this.currentTileColumn = Math.floor( (this.x-this.levelGrid.xCanvas) / this.tileSideScale);
	};
	
	
	// Return the current speed of the enemy
	getSpeed() {
		return this.speed;
	};
	
	/* Return the tile and its center xy coordinates on grid map where the 
		enemy will have to change its current direction on
	*/
	getTileToMakeTurnAt() {
		if (this.turns < this.levelGrid.pathTurns.length) {		
			return this.levelGrid.pathTurns[this.turns];
		} else {
			return {row: -1, column: -1, centerX: -10, centerY: -10};
		}
	};
	
	
	// Return if the enemy is within the bounds of the grid area or not
	enemyIsOnGrid() {
		var numOfRows = this.levelGrid.getNumOfRows();
		var numOfColumns = this.levelGrid.getNumOfColumns();
		if ( (this.currentTileRow >= 0 && this.currentTileRow < numOfRows) && 
			  (this.currentTileColumn >= 0 && this.currentTileColumn < numOfColumns) ) {
			return true;
		} else {
			return false;
		} 
	};
	
	
	// Return if the enemy has reached the tile of where the destination is on the grid map
	hasReachedDestination() {
		var destinationTiles = this.levelGrid.getDestination();
		for (var i = 0; i < destinationTiles.length; i++) {
			var destinationRow = destinationTiles[i].row;
			var destinationColumn = destinationTiles[i].column;
			if ( this.currentTileRow === destinationRow
				 && this.currentTileColumn === destinationColumn ) {
				this.speed = 0;
				return true;
			} 		
		}
		return false;
	};
}
