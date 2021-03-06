class Enemy {
	constructor(gameEngine, x, y, direction, level, spawnTime) {
		Object.assign(this, { gameEngine, x, y, direction, level, spawnTime });

		// user
		this.user = this.gameEngine.camera.user;

		// frame height + width
		this.frameHeight = 150;
		this.frameWidth = 150;

		// states
		this.enemyPaused = this.level.levelPaused; // used when HUD is set up

		// stats
		this.damageAgainstBase = 1;

		// grid
		this.grid = this.level.getGrid();

		// elapsed time to keep track of cooldown
		this.cooldownTime = 0;
		this.gameTime = 0;
		this.deathAnimationTime = 0;

		// does not exist until spawned
		this.exist = false;
		
		// speed multiplier
		this.enemySpeedMultipler = this.level.levelSpeedMultiplier;

		// Spazer control of enemy
		this.controlled = false;
		this.controlTime = 0;
	};

	// show bounds based on given radius
	showBounds(context, position, radius, setDashed) {
		// attack bound
		if (setDashed) {
			context.setLineDash([8, 15]);
			context.beginPath();
			context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
			context.stroke();
		}

		// entity bound
		else {
			context.setLineDash([]);
			context.beginPath();
			context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
			// context.fillStyle = "#FD0";
			// context.fill();
			context.stroke();
		}
	};

	
	/*
		Determine which direction the enemy should take depending if
		it is on a pathturn tile or not
		
		Parameter:
		@movement		the enemy's movement
	*/
	determineDirection(movement) {
	  
		// retrieve coordinates that enemy is currently at
		// and the coordinates for the next tile the enemy will turn at
		var coordinates = movement.getCoordinates();
		
		// Is the enemy on the terrain tile grid and not at the destination?
		if (movement.enemyIsOnGrid() && !movement.hasReachedDestination()) {  
			if (movement.getNextTurnTile() === null) {
				movement.scanForNextTurnInCurrentDirection();
			}
			
			var nextTurnAt = movement.getNextTurnTile();
			
			// Depending on the enemy's current direction, if enemy happens to be just on or just moved over
			// a turn tile's center coordinates, then make the enemy's current x- or y-position match that
			// of the tile's center x- or y-coordinate in which the enemy will change directions on
			switch (movement.getDirection()) {
				case "up":
					if (coordinates.x === nextTurnAt.centerX && coordinates.y <= nextTurnAt.centerY) {
						coordinates.y = nextTurnAt.centerY;
						coordinates.tileRow = Math.floor( (coordinates.y - this.level.yCanvas) / movement.tileSideScale);
						this.y = nextTurnAt.centerY;				
					}
					break;
				case "right":
					if (coordinates.x >= nextTurnAt.centerX && coordinates.y === nextTurnAt.centerY) {
						coordinates.x = nextTurnAt.centerX;	
						coordinates.tileColumn = Math.floor( (coordinates.x - this.level.xCanvas) / movement.tileSideScale);				
						this.x = nextTurnAt.centerX;				
					}					
					break;
				case "down":
					if (coordinates.x === nextTurnAt.centerX && coordinates.y >= nextTurnAt.centerY) {
						coordinates.y = nextTurnAt.centerY;	
						coordinates.tileRow = Math.floor( (coordinates.y - this.level.yCanvas) / movement.tileSideScale);				
						this.y = nextTurnAt.centerY;				
					}				
					break;
				case "left":
					if (coordinates.x <= nextTurnAt.centerX && coordinates.y === nextTurnAt.centerY) {
						coordinates.x = nextTurnAt.centerX;		
						coordinates.tileColumn = Math.floor( (coordinates.x - this.level.xCanvas) / movement.tileSideScale);				
						this.x = nextTurnAt.centerX;					
					}							
					break;
			}
			
			// if enemy has reached the center coordinates of the next turn tile, 
			// then change enemy's direction to one that is legal on that turn tile
			if (coordinates.x === nextTurnAt.centerX && coordinates.y === nextTurnAt.centerY) {				
				
				// Randomly choose any legal direction for the path turn tile the enemy is on
				var directionChoice = Math.floor( Math.random() * nextTurnAt.directions.length );
				movement.direction = nextTurnAt.directions[directionChoice];
				
				// After changing directions, scan in front of enemy's new facing direction for next turn tile
				movement.nextTurnAtTile = null;
				movement.scanForNextTurnInCurrentDirection();
			}			
		}
	};


	/*
		Update the enemy's position and then return its new position resulting from the updateCommands
		
		@movement		the enemy's movement
		@x				the enemy's x-coordinate
		@y				the enemy's y-coordinate
	*/
	getMovement(movement, x, y) {
		// enemy movement
		if (!this.enemyPaused) {	
			var speed = movement.getSpeed();
		} else {
			var speed = 0;
		}
		if (movement.getDirection() === "up") {
			y += -speed;
		} else if (movement.getDirection() === "right") {
			x += speed;
		} else if (movement.getDirection() === "down") {
			y += speed;
		} else if (movement.getDirection() === "left") {
			x += -speed;
		} else {
			x += 0;
			y += 0;
		}

		return { x: x, y: y };
	};


	/*
		Draw the visual health bar over the enemy sprite
		
		Parameters:
		@ctx					the canvas that the health bar will be drawn on
		@x						the x-coordinate on canvas where the top left corner of bar will be drawn
		@y						the y-coordinate on canvas where the top left corner of bar will be drawn
		@HP						the enemy's current health points
		@maxHP					the enemy's maximum health points
		@movement				the enemy's movement
		@entityPosition			the enemy's current xy-coordinates on canvas
	*/
	drawHealth(ctx, x, y, HP, maxHP, movement, entityPosition) {
//		var width = this.gameEngine.camera.currentLevel > 1 ? 50 : 50;
		var width = 50;
		var thickness = 6;
		var percentage = width * (HP / maxHP);
		var maxHealthOutline = width;
		var healthPercent = (HP / maxHP) * 100;
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeRect(x - width / 2, y, width, thickness);
		ctx.rect(x - width / 2, y, percentage, thickness);
		if (healthPercent > 63) {
			ctx.fillStyle = "green";
		} else if (healthPercent > 37) {
			ctx.fillStyle = "gold";
		} else if (healthPercent > 13) {
			ctx.fillStyle = "orange";
		} else {
			ctx.fillStyle = "red";
		}
		ctx.closePath();
		ctx.fill();

		movement.updatePosition(entityPosition.x, entityPosition.y);
	};


	attackBase() {
		this.removeFromWorld = true; // disappear when reaching the base
	};
}
