class Mushroom extends Enemy {
  constructor(gameEngine, x, y, level, spawnTime) {
    super(gameEngine, x, y, level, spawnTime);

    // sprites
    this.attackImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/mushroom/Attack.png"
    );
    this.deathImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/mushroom/Death.png"
    );
    this.runImg = ASSET_MANAGER.getAsset("./sprites/monster/mushroom/Run.png");
    this.takehitImg = ASSET_MANAGER.getAsset(
      "./sprites/monster/mushroom/Take Hit.png"
    );

    // animations
    this.attackAnim = new Animator(
      this.attackImg,
      0,
      0,
      150,
      150,
      8,
      0.15,
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
      true
    );
    this.runAnim = new Animator(
      this.runImg,
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
    this.takehitAnim = new Animator(
      this.takehitImg,
      0,
      0,
      150,
      150,
      4,
      0.1,
      0,
      false,
      true
    );
    this.loadAnimation();

    // state
    this.state = 0; // 0: run, 1: attack, 2: takehit, 3: dead

    // stats
    this.score = 50;
    this.scale = 2;
    this.HP = 100;
    this.maxHP = this.HP; // used in calculating health bar
    this.damage = 5; //30;
    this.reward = 50;
    this.radius = 16 * this.scale; // entity radius
    this.visualRadius = (this.frameWidth / 3) * this.scale; // shooting radius
    this.xOffset = (this.frameWidth / 2) * this.scale;
    this.yOffset = (this.frameHeight - 50) * this.scale;
    this.attackRate = 1.2;

    // level grid and enemy movement
    this.movement = new EnemyMovement(1.3, "right", this.x, this.y, this.grid);
  }

  loadAnimation() {
    this.animations = [];
    this.animations.push(this.runAnim);
    this.animations.push(this.attackAnim);
    this.animations.push(this.takehitAnim);
    this.animations.push(this.deathAnim);
  }

  update() {
    if (this.paused) {
      // pause animation at certain frame
    }
    this.cooldownTime += this.gameEngine.clockTick;
    this.gameTime += this.gameEngine.clockTick;

    // spawn enemy if elapsed game time is greater than time to spawn
    // else do not do anything
    if (this.gameTime >= this.spawnTime) {
      this.exist = true;
    } else {
      return;
    }

    for (var i = 0; i < this.gameEngine.entities.length; i++) {
      var ent = this.gameEngine.entities[i];
      if (ent instanceof Tower) {
        if (this.state != 3 && collide(this, ent) && this.cooldownTime > this.attackRate) {
          this.state = 1;
          this.cooldownTime = 0;
          this.target = ent;
          this.attack(this.target);
        }
      }
    }

    if (this.target)
      if (this.target.removeFromWorld)
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

    if (this.state == 3) {
      this.deathAnimationTime += this.gameEngine.clockTick;
      if (this.deathAnimationTime > 1.2) this.removeFromWorld = true;
    }
  }

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

    this.animations[this.state].drawFrame(
      this.gameEngine.clockTick,
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
      this.isDead();
    }
  }

  attack(tower) {
    tower.takeHit(this.damage);
  };

  isDead() {
    this.state = 3;
    this.user.increaseBalance(this.reward);
    console.log("Mushroom+$", this.reward);

    this.user.increaseScores(this.score);
  }
}
