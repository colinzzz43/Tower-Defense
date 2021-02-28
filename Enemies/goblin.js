class Goblin extends Enemy {
  constructor(gameEngine, x, y, level, spawnTime) {
    super(gameEngine, x, y, level, spawnTime);

    // sprites
    this.attackImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/goblin/Attack.png"
    );
    this.deathImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/goblin/Death.png"
    );
    this.runImg = ASSET_MANAGER.getAsset("./sprites/monster/goblin/Run.png");
    this.takehitImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/goblin/Take Hit.png"
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
      0.3,
      0,
      false,
      false
    );
    this.runAnim = new Animator(
      this.runImg,
      0,
      0,
      150,
      150,
      8,
      0.2,
      0,
      false,
      true
    );

    this.loadAnimation();

    // state
    this.state = 0; // 0: run, 1: attack, 2: takehit, 3: dead

    // stats
    this.score = 20;
    this.scale = 2;
    this.HP = 30;
    this.maxHP = this.HP; // used in calculating health bar
    this.damage = 10; //8;
    this.reward = 15;
    this.radius = 16 * this.scale; // entity radius
    this.visualRadius = (this.frameWidth / 3) * this.scale; // shooting radius
    this.xOffset = (this.frameWidth / 2) * this.scale;
    this.yOffset = (this.frameHeight - 50) * this.scale;
    this.attackRate = 0.7;

    // level grid and enemy movement
    this.movement = new EnemyMovement(1, "right", this.x, this.y, this.grid);
  }

  loadAnimation() {
    this.animations = [];
    this.animations.push(this.runAnim);
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
            if (this.state != 3 && collide(this, ent) && this.cooldownTime > this.attackRate  && this.state != 3) {
              this.state = 1;
              this.cooldownTime = 0;
              this.target = ent;
              this.attack(this.target);
            }
          }
        } else {
          if (ent instanceof Tower) {
            if (this.state != 3 && canSee(this, ent) && collide(this, ent) && this.cooldownTime > this.attackRate  && this.state != 3) {
              this.state = 1;
              this.cooldownTime = 0;
              this.target = ent;
              this.attack(this.target);
            }
          }
        }
      }

      if (this.target)
        if (this.target.removeFromWorld || !collide(this, this.target)  && this.state != 3)
          this.state = 0;

          
      // only move when running
      if (this.state == 0) {
        // goblin direction
        this.determineDirection(this.movement);

        // goblin movement
        let position = this.getMovement(this.movement, this.x, this.y);
        this.x = position.x;
        this.y = position.y;
        this.movement.updatePosition(this.x, this.y);
      }

      // ensures enemy is removed properly once dead and currency is rewarded exactly once.
      if (this.state == 3) {
        this.deathAnimationTime += this.gameEngine.clockTick;
        if (this.deathAnimationTime > 1) {
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
    // this.state = 2;
    this.HP = Math.max(0, this.HP - damage);
    if (this.HP === 0) {
      this.state = 3;
    }
  };

  attack(tower) {
    tower.takeHit(this.damage);
  }

  isDead() {
    this.user.increaseBalance(this.reward);
    console.log("Goblin+$", this.reward);
    this.user.increaseScores(this.score);
  }
}
