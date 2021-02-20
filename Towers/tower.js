class Tower {
  // abstract class for towers
  constructor(gameEngine, x, y, level) {
    Object.assign(this, { gameEngine, x, y, level });

    this.facing = 6; // facing left default
    this.user = this.gameEngine.user; // the user interacting with the tower
    this.elapsedTime = 0;
    this.towerLevel = 1;
	
	// speed multiplier
	this.towerSpeedMultipler = this.level.levelSpeedMultiplier;
	
	// pause state
	this.towerPaused = this.level.levelPaused;
  }

  update() {
	this.towerSpeedMultipler = this.level.levelSpeedMultiplier;
	this.towerPaused = this.level.levelPaused;
	if (this.towerPaused) {
		// do nothing
	} else {
		this.elapsedTime += (this.gameEngine.clockTick * this.towerSpeedMultipler);
		var that = this;
		// tower detection
		this.gameEngine.entities.forEach(function (entity) {
		  // tower detection
		  if (entity instanceof Enemy) {
			// tower shoots enemy in shooting bounds
			if (
			  canShoot(that, entity) &&
			  that.elapsedTime > that.fireRate &&
			  entity.exist
			) {
			  that.elapsedTime = 0;
			  that.facing = getFacing(entity, that);
			  that.shoot(entity);
			  // console.log("Slime HP: ", entity.HP);
			  // that.printMonsterHP(entity.HP);
			}
		  }
		});		
	}
	
  }

  showBoundingCircle(context) {
    // entity bound
    context.setLineDash([]);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = "#FD0";
    context.fill();
    context.stroke();

    // shooting bound
    context.setLineDash([8, 15]);
    context.beginPath();
    context.arc(this.x, this.y, this.shootingRadius, 0, 2 * Math.PI);
    context.stroke();
  }

  buy(cost) {
    // check if the user has the sufficient fund
    if (this.user.balance >= cost) {
      this.user.decreaseBalance(cost);
    }
  }

  // waitiing for Tower upgrade functionality to be added to the game (week 7) - Colin
  upgrade(cost) {
    // check if the user has the sufficient fund
    if (this.user.balance >= cost && this.level < 3) {
      this.user.decreaseBalance(cost);
      this.towerLevel++;
    }
  }

  // printMonsterHP(HP) {
  //   document.getElementById("printMonsterHP").innerHTML = HP;
  // }

  sell() {
    // Add the money back to the user balance
    this.user.increaseBalance(this.towerLevel * this.cost * this.depreciated);
    // Remove itself from the map (remove entity from the gameengine)
    this.gameEngine.removeEntity(this);
  }

  dead() {
    this.removeFromWorld = true;

    // After tower is removed from world, set the terrain tile it was on to open tower terrain
    var tilePosition = this.getTilePosition();
    this.level.changeStateOfTowerTerrain(tilePosition.row, tilePosition.column);
  }

  getShootingRange() {
    return this.shootingRadius;
  }

  getTilePosition() {
    var tileSideLength = this.level.getTilePixelImageSize();
    var row = Math.floor( (this.y - this.level.yCanvas) / tileSideLength);
    var column = Math.floor( (this.x - this.level.xCanvas) / tileSideLength);
    return { row: row, column: column };
  }

  getCost() {
    return this.cost;
  }

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);

    if (this.HP === 0) {
      this.dead();
    }
  }

  draw(context) {
    this.showBoundingCircle(context);
    this.drawHealth(
      context,
      this.x,
      this.y - this.yOffset - 30,
      this.HP,
      100,
      10
    );
	
	var speedMultiplier = this.towerSpeedMultipler;
	if (this.towerPaused) {
		speedMultiplier = 0;
	}
	
    this.animations[this.facing].drawFrame(
      (this.gameEngine.clockTick * speedMultiplier),
      context,
      this.x - this.xOffset,
      this.y - this.yOffset,
      PARAMS.SCALE
    );
    // context.drawImage(this.spritesheet, this.x, this.y);
  }

  drawHealth(ctx, x, y, HP, width, thickness) {
    var percentage = width * (HP / this.maxHP);
    ctx.beginPath();
    ctx.rect(x - width / 2, y, percentage, thickness);
    if (percentage > 63) {
      ctx.fillStyle = "green";
    } else if (percentage > 37) {
      ctx.fillStyle = "gold";
    } else if (percentage > 13) {
      ctx.fillStyle = "orange";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.closePath();
    ctx.fill();
  }
}
