class FlyingEye extends Enemy {
  constructor(gameEngine, x, y, level, spawnTime) {
    super(gameEngine, x, y, level, spawnTime);

    // sprites
    this.attackImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Attack.png"
    );
    this.deathImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Death.png"
    );
    this.flyImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/flyingeye/Flight.png"
    );


    // animations
    this.attackAnim = new Animator(
      this.attackImg,
      0,
      0,
      150,
      150,
      8,
      0.1,
      0,
      false,
      true
    );
    this.deathAnim = new Animator(
      this.deathImg,
      0,
      0,
      150,
      150,
      4,
      0.2,
      0,
      false,
      false
    );
    this.flyAnim = new Animator(
      this.flyImg,
      0,
      0,
      150,
      150,
      8,
      0.07,
      0,
      false,
      true
    );

    this.loadAnimation();

    // state
    this.state = 0; // 0: fly, 1: attack, 2: takehit, 3: dead

    // stats
    this.score = 40;
    this.scale = 2;
    this.HP = 70;
    this.maxHP = this.HP; // used in calculating health bar
    this.damage = 20;
    this.reward = 60;
    this.radius = 20 * this.scale; // entity radius
    this.shootingRadius = (this.frameWidth / 3) * this.scale; // shooting radius
    this.xOffset = (this.frameWidth / 2 + 5) * this.scale;
    this.yOffset = (this.frameHeight - 50) * this.scale;
    this.fireRate = 0.8;

    // level grid and enemy movement
    this.movement = new EnemyMovement(1.25, "right", this.x, this.y, this.grid);
  };

  loadAnimation() {
    this.animations = [];
    this.animations.push(this.flyAnim);
    this.animations.push(this.attackAnim);
    this.animations.push(this.takehitAnim);
    this.animations.push(this.deathAnim);
  };

  update() {
	this.enemyPaused = this.level.levelPaused;
	this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
	this.movement.speed = 1.5 * this.enemySpeedMultipler;
    if (this.enemyPaused || this.controlled) {
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

    for (var i = 0; i < this.gameEngine.entities.length; i++) {
      var ent = this.gameEngine.entities[i];
      if (ent instanceof Tower && canShoot(this, ent) && this.cooldownTime > this.fireRate) {
        this.cooldownTime = 0;
        this.state = 1;
        this.target = ent;
        this.attack(this.target);
      }
    }

    if (this.target)
      if (this.target.removeFromWorld)
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

		if (this.state == 3) {
		  this.deathAnimationTime += this.gameEngine.clockTick;
		  if (this.deathAnimationTime > 0.8) this.removeFromWorld = true;
		}		
	}

    if (this.state == 3) {
      this.deathAnimationTime += this.gameEngine.clockTick;
      if (this.deathAnimationTime > 0.7) {
        this.removeFromWorld = true;
        this.isDead();
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
	
    this.animations[this.state].drawFrame(
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
      this.state = 3;
    }
  };

  attack(tower) {
    tower.takeHit(this.damage);
    this.gameEngine.addEntity(new LaserBullet(this.gameEngine, this.x, this.y, tower, this));
  };

  isDead() {
    this.user.increaseBalance(this.reward);
    console.log("Flyingeye+$", this.reward);

    this.user.increaseScores(this.score);
  };
}
