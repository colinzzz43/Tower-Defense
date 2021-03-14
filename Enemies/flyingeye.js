class FlyingEye extends Enemy {
  constructor(gameEngine, x, y, direction, level, spawnTime) {
    super(gameEngine, x, y, direction, level, spawnTime);

    // sprites
    this.attackImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Attack.png");
    this.deathImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Death.png");
    this.flyImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Flight.png");

    this.attackLeftImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Attack_Left.png");
    this.deathLeftImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Death_Left.png");
    this.flyLeftImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Flight_Left.png");

    // animations
    this.attackAnim = new Animator(this.attackImg, 0, 0, 150, 150, 8, 0.1, 0,
      false, true);
    this.deathAnim = new Animator(this.deathImg, 0, 0, 150, 150, 4, 0.2, 0,
      false, false);
    this.flyAnim = new Animator(this.flyImg, 0, 0, 150, 150, 8, 0.07, 0, false,
      true);

    this.attackLeftAnim = new Animator(this.attackLeftImg, 0, 0, 150, 150, 8, 0.1, 1,
      false, true);
    this.deathLeftAnim = new Animator(this.deathLeftImg, 0, 0, 150, 150, 4, 0.2, 1,
      false, false);
    this.flyLeftAnim = new Animator(this.flyLeftImg, 0, 0, 150, 150, 8, 0.07, 1, false,
      true);

    this.loadAnimation();

    // state
    this.facing = 0; // 0: right, 1: left
    this.state = 0; // 0: fly, 1: attack, 2: dead

    // stats
    this.score = 30;
    this.scale = this.gameEngine.camera.currentLevel > 1 ? 1.6 : 2;
    this.HP = 125;
    this.maxHP = this.HP; // used in calculating health bar
    this.damage = 20;
    this.reward = 30;
    this.radius = 20 * this.scale; // entity radius
    this.shootingRadius = (this.frameWidth / 3) * this.scale; // shooting radius
    this.xOffset = (this.frameWidth / 2 + 5) * this.scale;
    this.yOffset = (this.frameHeight - 60) * this.scale;
    this.fireRate = 0.8;

    // level grid and enemy movement
    this.movement = new EnemyMovement(1.25, this.direction, this.x, this.y, this.grid);
  };

  loadAnimation() {
    this.animations = [];

    for (var i = 0; i < 3; i++) { // 3 states
        this.animations.push([]);
        for (var j = 0; j < 2; j++) { // 2 ways to face
            this.animations[i].push([]);
        }
    }

    this.animations[0][0] = this.flyAnim;
    this.animations[1][0] = this.attackAnim;    
    this.animations[2][0] = this.deathAnim;
    
    this.animations[0][1] = this.flyLeftAnim;
    this.animations[1][1] = this.attackLeftAnim;
    this.animations[2][1] = this.deathLeftAnim;  
  };

  update() {
    this.enemyPaused = this.level.levelPaused;
    this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
    this.movement.speed = 1.5 * this.enemySpeedMultipler;

    if (this.enemyPaused) {
      // pause animation at certain frame
    } else {
      this.cooldownTime += (this.gameEngine.clockTick * this.enemySpeedMultipler);
      this.gameTime += (this.gameEngine.clockTick * this.enemySpeedMultipler);

      // check direction for left/right animations
      if (this.movement.direction == "left") {
        this.facing = 1;
      } else if (this.movement.direction == "right") {
        this.facing = 0;
      }

      // spawn enemy if elapsed game time is greater than time to spawn
      // else do not do anything
      if (this.gameTime >= this.spawnTime) {
        this.exist = true;
      } else {
        return;
      }

      // ensures enemy is removed properly once dead and currency is rewarded exactly once.
      if (this.state == 2) {
        this.deathAnimationTime += this.gameEngine.clockTick;
        if (this.deathAnimationTime > 0.5) {
          this.removeFromWorld = true;
          this.isDead();
        }
      }	

      // enemy controlled by spazer
      if (this.controlled) {
        this.movement.speed = 0.2;
        this.controlTime -= (this.gameEngine.clockTick * this.enemySpeedMultipler);
  
        if (this.controlTime <= 0) {
          this.controlled = false;
          this.state = 0;

        }
      }

      for (var i = 0; i < this.gameEngine.entities.length; i++) {
        var ent = this.gameEngine.entities[i];

        if (this.controlled) {
          if (ent instanceof Enemy && ent.exist && canShoot(this, ent) 
            && this.cooldownTime > this.fireRate && ent !== this  && this.state != 2) {
            this.cooldownTime = 0;
            this.state = 1;
            this.target = ent;
            this.attack(this.target);
          }
        } else {
          if (ent instanceof Tower && canShoot(this, ent) && this.cooldownTime > this.fireRate && this.state != 2) {
            this.cooldownTime = 0;
            this.state = 1;
            this.target = ent;
            this.attack(this.target);
          }
        }
      }

      if (this.target)
        if ((this.target.removeFromWorld || !canShoot(this, this.target)) && this.state != 2)
          this.state = 0;

      // only move when flying
      if (this.state == 0) {
        // direction
        this.determineDirection(this.movement);

        // movement
        let position = this.getMovement(this.movement, this.x, this.y);
        this.x = position.x;
        this.y = position.y;
        this.movement.updatePosition(this.x, this.y);
      }

      
	  }

    
  };

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
    // this.showBounds(context, position, this.radius, false); // entity radius
    // this.showBounds(context, position, this.shootingRadius, true); // visual bound

    // health bar
    this.drawHealth(
      context,
      this.x,
      this.y - this.yOffset / 2,
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
	
    this.animations[this.state][this.facing].drawFrame(
      this.gameEngine.clockTick * speedMultiplier,
      context,
      this.x - this.xOffset,
      this.y - this.yOffset,
      this.scale
    );
  };

  takeHit(damage) {
	this.HP = Math.max(0, this.HP - damage);

	if (this.HP === 0) {
		 this.state = 2;
	}
  };

  attack(tower) {
    tower.takeHit(this.damage);
    this.gameEngine.addEntity(new LaserBullet(this.gameEngine, this.x + 5 * this.scale, this.y - this.yOffset/4, tower, this));
  };

  isDead() {
    this.user.increaseBalance(this.reward);
	  this.level.levelEnemyWaves.decrementEnemiesLeft();	
    this.user.increaseScores(this.score);
  };
}
