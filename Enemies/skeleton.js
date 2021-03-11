class Skeleton extends Enemy {
  constructor(gameEngine, x, y, direction, level, spawnTime) {
    super(gameEngine, x, y, direction, level, spawnTime);

    // sprites
    this.attackImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/skeleton/Attack.png"
    );
    this.deathImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/skeleton/Death.png"
    );
    this.walkImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/skeleton/Walk.png"
    );
    this.takehitImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/skeleton/Take Hit.png"
    );

    // animations
    this.attackAnim = new Animator(
      this.attackImg,
      0,
      0,
      150,
      150,
      8,
      0.09,
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
    this.walkAnim = new Animator(
      this.walkImg,
      0,
      0,
      150,
      150,
      4,
      0.2,
      0,
      false,
      true
    );

    this.loadAnimation();

    // state
    this.state = 0; // 0: walk, 1: attack, 2: takehit, 3: dead

    // stats
    this.score = 30;
    this.scale = this.gameEngine.camera.currentLevel > 1 ? 1.5 : 2;
    this.HP = 300;
    this.maxHP = this.HP; // used in calculating health bar
    this.damage = 40;
    this.reward = 30;
    this.radius = 16 * this.scale; // entity radius
    this.visualRadius = (this.frameWidth / 3) * this.scale; // shooting radius
    this.xOffset = (this.frameWidth / 2 + 3) * this.scale;
    this.yOffset = (this.frameHeight - 50) * this.scale;
    this.attackRate = 1;

    // level grid and enemy movement
    this.movement = new EnemyMovement(1.25, this.direction, this.x, this.y, this.grid);
  }

  loadAnimation() {
    this.animations = [];
    this.animations.push(this.walkAnim);
    this.animations.push(this.attackAnim);
    this.animations.push(this.takehitAnim);
    this.animations.push(this.deathAnim);
  }

  update() {
    this.enemyPaused = this.level.levelPaused;
    this.enemySpeedMultipler = this.level.levelSpeedMultiplier;
    this.movement.speed = 1.25 * this.enemySpeedMultipler;

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
          this.state = 0;

        }
      }      

      for (var i = 0; i < this.gameEngine.entities.length; i++) {
        var ent = this.gameEngine.entities[i];
        if (this.controlled) {
          if (ent instanceof Enemy && ent.exist && ent !== this) {
            if (this.state != 3 && collide(this, ent) && this.cooldownTime > this.attackRate && this.state != 3) {
              this.state = 1;
              this.cooldownTime = 0;
              this.target = ent;
              this.attack(this.target);
            }
          }
        } else {
          if (ent instanceof Tower) {
            if (this.state != 3 && canSee(this, ent) && collide(this, ent) && this.cooldownTime > this.attackRate && this.state != 3) {
              this.state = 1;
              this.cooldownTime = 0;
              this.target = ent;
              this.attack(this.target);
            }
          }
        }
      }


      if (this.target)
        if (this.target.removeFromWorld || !collide(this, this.target) && this.state != 3)
          this.state = 0;

      // only move when running
      if (this.state == 0) {
        // skeleton direction
        this.determineDirection(this.movement);

        // skeleton movement
        let position = this.getMovement(this.movement, this.x, this.y);
        this.x = position.x;
        this.y = position.y;
        this.movement.updatePosition(this.x, this.y);
      }

      // ensures enemy is removed properly once dead and currency is rewarded exactly once.
      if (this.state == 3) {
        this.deathAnimationTime += this.gameEngine.clockTick;
        if (this.deathAnimationTime > 0.8) {
          this.removeFromWorld = true;
          this.isDead();
        }
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
    // this.showBounds(context, position, this.visualRadius, true); // visual bound

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
  }

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);

    if (this.HP === 0) {
      this.state = 3;
    }
  }

  attack(tower) {
    tower.takeHit(this.damage);
  }

  isDead() {
    this.user.increaseBalance(this.reward);
    console.log("Skeleton+$", this.reward);
    this.user.increaseScores(this.score);
  }
}
