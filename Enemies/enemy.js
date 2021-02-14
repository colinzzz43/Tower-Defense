class Enemy {
  constructor(gameEngine, x, y, level, spawnTime) {
    Object.assign(this, { gameEngine, x, y, level, spawnTime });

    // user
    this.user = this.gameEngine.user;

    // frame height + width
    this.frameHeight = 150;
    this.frameWidth = 150;

    // states
    this.paused = false; // used when HUD is set up

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
  }

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
  }

  determineDirection(movement) {
    // slime determines which direction it must go on
    var coordinates = movement.getCoordinates();
    //	console.log(`Slime is at tile ${currentRow}, ${currentColumn}`);

    // is the enemy on the terrain tile grid, if so then it has to be fixed on the path terrain until it reaches destination
    if (movement.enemyIsOnGrid() && !movement.hasReachedDestination()) {
      var tileScale = this.level.drawScale * 40;
      var xCenterOfTile = tileScale * coordinates.tileColumn + 30;
      var yCenterOfTile = tileScale * coordinates.tileRow + 30;

      // has it reached the center of the tile it's located in, if it has then enemy takes note of the next tile in its current direction
      if (coordinates.x === xCenterOfTile && coordinates.y === yCenterOfTile) {
        var currentTileInCurrentDirection = this.grid.getTile(
          coordinates.tileRow,
          coordinates.tileColumn
        );
        var nextTileInCurrentDirection = movement.getNextTerrainTileInCurrentDirection();

        // if the next adjacent tile in enemy's direction is not a path tile, then it changes direction to that where there is a path tile
        if (currentTileInCurrentDirection !== nextTileInCurrentDirection) {
          movement.changeDirection(coordinates.tileRow, coordinates.tileColumn);
        }
      }
    }
  }

  getMovement(movement, x, y) {
    // slime movement
    var speed = movement.getSpeed();
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
  }

  drawHealth(ctx, x, y, HP, maxHP, movement, entityPosition) {
    var width = 100;
    var thickness = 10;
    var percentage = width * (HP / maxHP);
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

    movement.updatePosition(entityPosition.x, entityPosition.y);
  }

  attackBase() {
    this.removeFromWorld = true; // disappear when reaching the base
  }
}
