class Slime {
  constructor(gameEngine, x, y, level) {
    Object.assign(this, {gameEngine, x, y, level} );

    this.animations = [];

    // spritesheet
    // might need to use slime1_side and flip so that slimes face right when animating
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/monster/slime/slime1_front.png"
    );

    this.death = ASSET_MANAGER.getAsset(
        "./sprites/monster/slime/slime_explode.png"
    );

    // animations
    this.aliveAnim = new Animator(this.spritesheet, 0, 0, 16, 16, 4, 0.15, 0, false, true);
    this.deadAnim = new Animator(this.death, 0, 0, 37, 41, 8, 0.25, 0, false, false);

    // states
    this.dead = false;
    this.takeHit = false;
    this.paused = false; // used when HUD is set up

    // other stats
    // this.velocity = {}; // used for moving the enemy across the map
    this.HP = 10;

    this.updateBC(); 
	
	// level grid and enemy movement
	this.grid = this.level.getGrid();
	this.movement = new EnemyMovement( 1, "right", this.x, this.y, this.grid );
  };

  // BC = bounding circle
  updateBC() {
    this.lastBC = this.BC;
    this.BC = new BoundingCircle(this.x, this.y, 8); // bounds the slime itself in a circle
  }

  update() {
    // if(this.dead) {
    //     // remove entity
    // }
    // if(this.paused) {
    //     // pause animation at certain frame
    // }
    // if (!this.paused && !this.dead) {
    //     // move slimes
        // this.x = this.x + 1; // move right;
    // }
    var that = this;

    // tower detection
    this.gameEngine.entities.forEach(function(entity) {
      if (entity.BC && that.BC.collide(entity.BC)) {
        if (entity instanceof Tower) that.attack();
      }
    }); 
	
	// slime determines which direction it must go on
	var coordinates = this.movement.getCoordinates();
				//	console.log(`Slime is at tile ${currentRow}, ${currentColumn}`);
	
	// is the enemy on the terrain tile grid, if so then it has to be fixed on the path terrain until it reaches destination
	if (this.movement.enemyIsOnGrid() && !this.movement.hasReachedDestination()) {
		var tileScale = this.level.drawScale * 40;
		var xCenterOfTile = (tileScale * coordinates.tileColumn) + 5;
		var yCenterOfTile = (tileScale * coordinates.tileRow) + 5;
		
		// has it reached the center of the tile it's located in, if it has then enemy takes note of the next tile in its current direction
		if ( coordinates.x === xCenterOfTile && coordinates.y === yCenterOfTile ) {
			var currentTileInCurrentDirection = this.grid.getTile(coordinates.tileRow, coordinates.tileColumn);
			var nextTileInCurrentDirection = this.movement.getNextTerrainTileInCurrentDirection();
					
			// if the next adjacent tile in enemy's direction is not a path tile, then it changes direction to that where there is a path tile
			if (currentTileInCurrentDirection !== nextTileInCurrentDirection && this.movement.moving === true) {
				this.movement.changeDirection(coordinates.tileRow, coordinates.tileColumn);
				console.log(`Slime changed direction to ${this.movement.getDirection()}`);
			} 
		}	
	}

	// slime movement	
	var speed = this.movement.getSpeed();
	if (this.movement.getDirection() === "up") {
		this.y += -speed;
	} else if (this.movement.getDirection() === "right") {
		this.x += speed;
	} else if (this.movement.getDirection() === "down") {
		this.y += speed;
	} else if (this.movement.getDirection() === "left") {
		this.x += -speed;
	} else {
		this.x += 0;
		this.y += 0;
	}
	
	this.movement.updatePosition(this.x, this.y);
  };

  draw(ctx) {
    if (this.dead) {
        this.deadAnim.drawFrame(this.gameEngine.clockTick, ctx, this.x-PARAMS.SCALE*10.5, this.y-PARAMS.SCALE*25, PARAMS.SCALE);
    } else {
        this.aliveAnim.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y, PARAMS.SCALE);
    }
  };

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);
    
    if (this.HP === 0) {
        this.dead = true;
    }
  };

  attack() {
    console.log("slime attack");
  };

  isDead() {};
}

class Goblin {
  constructor() {}

  updateBB() {}

  update() {}

  draw() {}

  attack() {}

  isDead() {}
}

class Skeleton {
  constructor() {}

  updateBB() {}

  update() {}

  draw() {}

  attack() {}

  isDead() {}
}

class Eyeball {
  constructor() {}

  updateBB() {}

  update() {}

  draw() {}

  attack() {}

  isDead() {}
}

class Mushroom {
  constructor() {}

  updateBB() {}

  update() {}

  draw() {}

  attack() {}

  isDead() {}
}

class Dragon {
  constructor() {}

  updateBB() {}

  update() {}

  draw() {}

  attack() {}

  isDead() {}
}

