class Tower {
  // abstract class for towers
  constructor(gameEngine, x, y, level) {
    Object.assign(this, { gameEngine, x, y, level });

    // the user interacting with the tower
    this.user = this.gameEngine.camera.user;

    this.facing = 6; // facing left default
    this.elapsedTime = 0;
    this.towerLevel = 1;

    this.scale = this.gameEngine.camera.currentLevel > 1 ? 1.8 : 3;

    // speed multiplier
    this.towerSpeedMultipler = this.level.levelSpeedMultiplier;

    // pause state
    this.towerPaused = this.level.levelPaused;

    // mouse click selection
    this.selected = true;
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
        // Spazer tower does not shoot controlled enemies
        if (entity instanceof Enemy && !(that instanceof Spazer && entity.controlled)) {
          // tower shoots enemy in shooting bounds
          if (canShoot(that, entity) && that.elapsedTime > that.fireRate &&
            entity.exist) {
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

  drawTileHighlight(context) {
    if (this.selected) {
      let tileLength = this.level.getTilePixelImageSize();
      // set stroke settings to prepare to draw this tower icon highlight
      context.beginPath();
      context.setLineDash([]);
      context.fillStyle = "dodgerblue";
      context.strokeStyle = "dodgerblue";
      context.lineWidth = 3;
      context.rect(this.x - tileLength / 2, this.y - tileLength / 2,
        tileLength, tileLength);
      context.stroke();
      context.globalAlpha = 0.1;
      context.fill();

      context.globalAlpha = 1;
      context.lineWidth = 1;
      context.fillStyle = "black";
      context.strokeStyle = "black";
    }
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
    if (this.user.balance - cost >= 0 && this.level < 3 && this.user.balance > 0) {
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
    //    this.gameEngine.removeEntity(this);

    // Change the spot where this tower was back to open tower terrain
    var xOffset = (this.level.terrainGridTiles.squareTileSidePixelLength / 2) * this.level.drawScale;
    var yOffset = (this.level.terrainGridTiles.squareTileSidePixelLength / 2) * this.level.drawScale;
    var towerRow = Math.floor((this.y - this.level.yCanvas - yOffset) / this.level.getTilePixelImageSize());
    var towerColumn = Math.floor((this.x - this.level.xCanvas - xOffset) / this.level.getTilePixelImageSize());
    console.log(`Tower removed at Row: ${towerRow}, Column: ${towerColumn}`)
    this.level.removeTower(towerRow, towerColumn);
  }

  dead() {
    this.removeFromWorld = true;
    //	var index = this.level.placedTowers.indexOf(this);
    //	this.level.placedTowers.splice(index, 1);

    // After tower is removed from world, set the terrain tile it was on to open tower terrain
    var tilePosition = this.getTilePosition();
    this.level.removeTower(tilePosition.row, tilePosition.column);
    //   this.level.changeStateOfTowerTerrain(tilePosition.row, tilePosition.column);

    // If the tower removed is the newest tower placed, set the level's 'newestTower' variable
    // to null so that the 'Undo' icon linked to 'newestTower' can be disabled.
    /*
    if ( this.level.newestTower !== null) {
      var tileOfNewestTower = this.level.newestTower.getTilePosition();
      if ( tilePosition.row === tileOfNewestTower.row 
        && tilePosition.column === tileOfNewestTower.column )
          this.level.newestTower = null;
    }
    */

  }

  getShootingRange() {
    return this.shootingRadius;
  }

  getTilePosition() {
    var tileSideLength = this.level.getTilePixelImageSize();
    var row = Math.floor((this.y - this.level.yCanvas) / tileSideLength);
    var column = Math.floor((this.x - this.level.xCanvas) / tileSideLength);
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
    this.drawTileHighlight(context);
    //    this.showBoundingCircle(context);

    var width = this.scale > 2 ? 100 : 50;
    this.drawHealth(
      context,
      this.x,
      this.y - this.yOffset - 30,
      this.HP,
      width,
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
      this.scale
    );
    // context.drawImage(this.spritesheet, this.x, this.y);
  }

  drawHealth(ctx, x, y, HP, width, thickness) {
    // var percentage = width * (HP / this.maxHP);
    var percentage = width * (HP / this.maxHP);
    var healthPercent = HP/this.maxHP * 100;
    ctx.beginPath();
    ctx.rect(x - width /2 , y*1.05, percentage, thickness);
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
  }
}
