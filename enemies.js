class Slime {
  constructor(gameEngine, x, y, level, spawnTime) {
    Object.assign(this, { gameEngine, x, y, level, spawnTime });

    this.user = this.gameEngine.user;
	
    this.damage = 5;
    // animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/monster/slime/slime1_front.png"
    );
    this.animations = [];
    this.aliveAnim = new Animator(
      this.spritesheet,
      0,
      0,
      (this.frameWidth = 16),
      (this.frameHeight = 16),
      4,
      0.15,
      0,
      false,
      true
    );

    // states
    this.paused = false; // used when HUD is set up

    // stats
    this.HP = 35;
    this.maxHP = this.HP;
    this.damageAgainstBase = 1;
    this.reward = 1000;
    this.radius = (this.frameWidth / 2 + 1) * PARAMS.SCALE; // entity radius
    this.shootingRadius = (this.frameWidth / 2 + 5) * PARAMS.SCALE; // shooting radius
    this.xOffset = (this.frameWidth / 2) * PARAMS.SCALE;
    this.yOffset = (this.frameHeight / 2) * PARAMS.SCALE + 1;
    this.fireRate = 1;

    // level grid and enemy movement
    this.grid = this.level.getGrid();
    this.movement = new EnemyMovement(1, "right", this.x, this.y, this.grid);

    // elapsed time to keep track of cooldown
    this.elapsedTime = 0;
    this.gameTime = 0;
    // does not exist until spawned
    this.exist = false;
	
  }

  // shows entity bounds and shooting bounds
  showBounds(context) {
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

  update() {
    if (this.paused) {
      // pause animation at certain frame
    }

    this.elapsedTime += this.gameEngine.clockTick;
    this.gameTime += this.gameEngine.clockTick;

    // spawn enemy if elapsed game time is greater than time to spawn
    // else do not do anything
    if (this.gameTime >= this.spawnTime) {
      this.exist = true;
    } else {
      return;
    }

    var that = this;
    this.gameEngine.entities.forEach(function (entity) {
      // tower detection
      if (entity instanceof Tower) {
        // tower shoots enemy in shooting bounds
        if (canShoot(that, entity) && that.elapsedTime > that.fireRate) {
          that.elapsedTime = 0;
          that.attack(entity);
          that.printTowerHP(entity.HP);
        }
      }
      // Brandon disabled collison between slimes because sometimes this would cause slimes to go off-path.
      // This section might need to be re-worked to deal with this collision issue

      // slime detection
      /*
      if (entity instanceof Slime) {
        if (entity !== that && collide(that, entity)) {
          // slimes collide with each other
          var dist = distance(that, entity);
          var delta = that.radius + entity.radius - dist;
          var difX = (that.x - entity.x) / dist;
          var difY = (that.y - entity.y) / dist;

          that.x += (difX * delta) / 2;
          that.y += (difY * delta) / 2;
          entity.x -= (difX * delta) / 2;
          entity.y -= (difY * delta) / 2;
        }
      }
	  */
    });

    // for (var i = 0; i < this.gameEngine.entities.length; i++) {
    //     var ent = this.gameEngine[i];

    //     console.log(ent);
    //     if (ent instanceof Slime) {
    //         console.log("hello");

    //         if (ent !== this && this.BC.collide(ent.BC)) {

    //             console.log("hello2");
    //             // push away from each other
    //             var dist = distance(this, ent);
    //             var delta = this.radius + ent.radius - dist;
    //             var difX = (this.x - ent.x) / dist;
    //             var difY = (this.y - ent.y) / dist;

    //             this.x += difX * delta / 2;
    //             this.y += difY * delta / 2;
    //             ent.x -= difX * delta / 2;
    //             ent.y -= difY * delta / 2;
    //         }
    //     }
    // }

    // slime determines which direction it must go on
    var coordinates = this.movement.getCoordinates();
    //	console.log(`Slime is at tile ${currentRow}, ${currentColumn}`);

    // Is the enemy on the terrain tile grid? If so then it has to be fixed on the path terrain until it reaches destination
    if (
      this.movement.enemyIsOnGrid() &&
      !this.movement.hasReachedDestination()
    ) {
      var tileScale = getTilePixelImageSize();
	  var tileCenterOffset = tileScale / 2;
      var xCenterOfTile = tileScale * coordinates.tileColumn + tileCenterOffset;
      var yCenterOfTile = tileScale * coordinates.tileRow + tileCenterOffset;

      // has it reached the center of the tile it's located in, if it has then enemy takes note of the next tile in its current direction
      if (coordinates.x === xCenterOfTile && coordinates.y === yCenterOfTile) {
        var currentTileInCurrentDirection = this.grid.getTile(
          coordinates.tileRow,
          coordinates.tileColumn
        );
        var nextTileInCurrentDirection = this.movement.getNextTerrainTileInCurrentDirection();

        // if the next adjacent tile in enemy's direction is not a path tile, then it changes direction to that where there is a path tile
        if (currentTileInCurrentDirection !== nextTileInCurrentDirection) {
          this.movement.changeDirection(
            coordinates.tileRow,
            coordinates.tileColumn
          );
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

    this.movement.updatePosition(this.x, this.y);
  }

  printTowerHP(HP) {
    document.getElementById("printTowerHP").innerHTML = HP;
  }

  draw(context) {
    // spawn enemy if elapsed game time is greater than time to spawn
    // else do not do anything
    if (this.gameTime >= this.spawnTime) {
      this.exist = true;
    } else {
      return;
    }

    this.showBounds(context);
    this.drawHealth(
      context,
      this.x,
      this.y - this.yOffset - 30,
      this.HP,
      100,
      10
    );
    this.aliveAnim.drawFrame(
      this.gameEngine.clockTick,
      context,
      this.x - this.xOffset,
      this.y - this.yOffset,
      PARAMS.SCALE
    );
  }

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);

    if (this.HP === 0) {
      this.isDead();
    }
  }

  attack(tower) {
    this.gameEngine.addEntity(
      new Bullet(
        this.gameEngine,
        this.x,
        this.y + 15,
        BULLETS["tomato"],
        tower,
        this
      )
    );
  }

  attackBase() {
    this.removeFromWorld = true; // disappear when reaching the base
  }

  isDead() {
    this.removeFromWorld = true;
    this.user.increaseBalance(this.reward);
    // add coins when dropped
  }
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
