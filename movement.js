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
		this.currentTileRow = Math.floor( (this.y - this.levelGrid.yCanvas)  /this.tileSideScale);
		this.currentTileColumn = Math.floor( (this.x - this.levelGrid.xCanvas)  /this.tileSideScale);
		
		// The possible directions for the enemy to go
		this.up = "up";
		this.right = "right";
		this.down = "down";
		this.left = "left";
		this.neutral = "neutral";
		
		// Number of turns the enemy has already made, and the tile locationwhere it'll make it's next turn
		this.turns = 0;
		this.nextTurnAtTile = this.levelGrid.pathTurns[this.turns];
	}
	
	
	/*
		Change the current direction of the enemy by making it turn 'left' or 'right' that is relative to the enemy's current direction
		
		Parameters: 
		@row		 the tile row where the enemy currently is, 
		@column		 the tile column where the enemy currently is
	*/
	changeDirection(row, column) {
//		console.log(`Turn at row ${row}, column ${column}`);
		switch(this.direction) {
			case "up":   // if enemy is currently moving vertically up on map, make it go horizontally left or right relative to view from map
//				console.log(`Next tile in Left Direction: ${this.levelGrid.getTile(row, column - 1)}`);
//				console.log(`Next tile in Right Direction: ${this.levelGrid.getTile(row, column + 1)}`);				
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
//		console.log(`Enemy made turn number ${this.turns}, now moving ${this.direction}`);
	}
	
	
	// Return the current direction of the enemy
	getDirection() {
		return this.direction;
	}
	
	
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
	}
	
	
	// Return the canvas coordinates of the enemy on the level tile grid.
	getCoordinates() {
		return {x: this.x, y: this.y, tileRow: this.currentTileRow, tileColumn: this.currentTileColumn};
	}
	
	
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
	}
	
	
	// Return the current speed of the enemy
	getSpeed() {
		return this.speed;
	}
	
	/* Return the tile and its center xy coordinates on grid map where the 
		enemy will have to change its current direction on
	*/
	getTileToMakeTurnAt() {
		if (this.turns < this.levelGrid.pathTurns.length) {		
			return this.levelGrid.pathTurns[this.turns];
		} else {
			return {row: -1, column: -1, centerX: -10, centerY: -10};
		}
	}
	
	
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
	}
	
	
	// Return if the enemy has reached the tile of where the destination is on the grid map
	hasReachedDestination() {
		var destinationTile = this.levelGrid.getDestination();
		if (this.currentTileRow === destinationTile.row && this.currentTileColumn === destinationTile.column) {
			this.speed = 0;
			return true;
		} else {
			return false;
		}
	}
}