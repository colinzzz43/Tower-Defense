class Slime extends Enemy {
  constructor(gameEngine, x, y, direction, level, spawnTime) {
    super(gameEngine, x, y, direction, level, spawnTime);

    // animation
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/monster/slime/slime1_front.png"
    );
    this.animation = new Animator(
      this.spritesheet,
      0,
      0,
      16,
      16,
      4,
      0.15,
      0,
      false,
      true
    );
    this.frameHeight = 16;
    this.frameWidth = 16;

    // stats
    this.scale = this.gameEngine.camera.currentLevel > 1 ? 2 : 3;
    this.HP = 100;
    this.damage = 15;
    this.maxHP = this.HP;
    this.reward = 10;
    this.score = 10;
    this.radius = (this.frameWidth / 2 + 1) * this.scale; // entity radius
    this.shootingRadius = (this.frameWidth / 2 + 5) * this.scale; // shooting radius
    this.xOffset = (this.frameWidth / 2) * this.scale;
    this.yOffset = (this.frameHeight / 2) * this.scale + 1;
    this.fireRate = 1;
    this.dead = false;

    // level grid and enemy movement
    this.movement = new EnemyMovement(0.5, this.direction, this.x, this.y, this.grid);
  }

  update() {
    this.enemyPaused = this.level.levelPaused;
    this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
    this.movement.speed = 1 * this.enemySpeedMultipler;

    if (this.enemyPaused) {
      // pause animation at certain frame
    } else {		
      this.cooldownTime += (this.gameEngine.clockTick * this.enemySpeedMultipler);
      this.gameTime += (this.gameEngine.clockTick * this.enemySpeedMultipler);

      // spawn enemy if elapsed game time is greater than time to spawn
      // else do not do anything
      if (this.gameTime >= this.spawnTime) {
        this.exist = true;
      } else {
        return;
      }

      // enemy controlled by spazer
      if (this.controlled) {
        this.movement.speed = 0.2;
        this.controlTime -= (this.gameEngine.clockTick * this.enemySpeedMultipler);

        if (this.controlTime <= 0) {
          this.controlled = false;
        }
      }

      var that = this;
      this.gameEngine.entities.forEach(function (entity) {
        // shoot other enemies if controlled
        if (that.controlled) {
          if (entity instanceof Enemy && entity.exist && entity !== that) {
            // enemy shoots target in shooting bounds
              if (canShoot(that, entity) && that.cooldownTime > that.fireRate) {
                that.cooldownTime = 0;
                that.attack(entity);
                // that.printTowerHP(entity.HP);
              }
            }
        } else {
          if (entity instanceof Tower) {
            // enemy shoots target in shooting bounds
              if (canShoot(that, entity) && that.cooldownTime > that.fireRate) {
                that.cooldownTime = 0;
                that.attack(entity);
                // that.printTowerHP(entity.HP);
              }
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

      // slime direction
      this.determineDirection(this.movement);

      // slime movement
      let position = this.getMovement(this.movement, this.x, this.y);
      this.x = position.x;
      this.y = position.y;
      this.movement.updatePosition(this.x, this.y);		
	  }

  };

  // printTowerHP(HP) {
  //   document.getElementById("printTowerHP").innerHTML = HP;
  // }

  draw(context) {
    // spawn enemy if elapsed game time is greater than time to spawn
    // else do not do anything
    if (this.gameTime >= this.spawnTime) {
      this.exist = true;
    } else {
      return;
    }

    let position = { x: this.x, y: this.y };

    // draw bounds
//    this.showBounds(context, position, this.radius, false); // entity radius
//    this.showBounds(context, position, this.shootingRadius, true); // shooting bound

    // health bar
    this.drawHealth(
      context,
      this.x,
      this.y - this.yOffset - 30,
      this.HP,
      this.maxHP,
      this.movement,
      position
    );

	// the animation speed multiplier
	var speedMultiplier = this.enemySpeedMultipler;
	
	// if the enemy is paused, then set animation speed to 0 to make enemy's current animation freeze
	if (this.enemyPaused) {
		speedMultiplier = 0;
	};
	
    this.animation.drawFrame(
      (this.gameEngine.clockTick * speedMultiplier),
      context,
      this.x - this.xOffset,
      this.y - this.yOffset,
      this.scale
    );
  }

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);

    if (this.HP === 0 && !this.dead) {
      this.dead = true;
      this.isDead();
    }
  }

  attack(tower) {
    tower.takeHit(this.damage);
    this.gameEngine.addEntity(
      new TomatoBullet(this.gameEngine, this.x, this.y, tower, this)
    );
  }

  isDead() {
    this.removeFromWorld = true;
	this.level.levelEnemyWaves.decrementEnemiesLeft();	
    this.user.increaseBalance(this.reward);
//    console.log("Slime+$", this.reward);
    this.user.increaseScores(this.score);

    // add coins when dropped
    this.gameEngine.addEntity(new Coin(this.gameEngine, this.x, this.y));
  }
}
