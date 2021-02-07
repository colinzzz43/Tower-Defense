class Skeleton extends Enemy {
    constructor(gameEngine, x, y, level, spawnTime) {
      super(gameEngine, x, y, level, spawnTime);
  
      // sprites
      this.attackImg = ASSET_MANAGER.getAsset("./sprites/monster/skeleton/Attack.png");
      this.deathImg = ASSET_MANAGER.getAsset("./sprites/monster/skeleton/Death.png");
      this.walkImg = ASSET_MANAGER.getAsset("./sprites/monster/skeleton/Walk.png");
      this.takehitImg = ASSET_MANAGER.getAsset("./sprites/monster/skeleton/Take Hit.png");
  
      // animations
      this.attackAnim = new Animator(this.attackImg, 0, 0, 150, 150, 8, 0.2, 0, false, true);
      this.deathAnim = new Animator(this.deathImg, 0, 0, 150, 150, 4, 0.2, 0, false, true);
      this.walkAnim = new Animator(this.walkImg, 0, 0, 150, 150, 4, 0.2, 0, false, true);
      this.takehitAnim = new Animator(this.takehitImg, 0, 0, 150, 150, 4, 0.2, 0, false, true);
      this.loadAnimation();
   
      // state
      this.state = 0; // 0: walk, 1: attack, 2: takehit, 3: dead

      // stats
      this.scale = 2;
      this.HP = 40;
      this.maxHP = this.HP; // used in calculating health bar
      this.damage = 12;
      this.reward = 10;
      this.radius = 16 * this.scale; // entity radius
      this.visualRadius = (this.frameWidth / 3) * this.scale; // shooting radius
      this.xOffset = (this.frameWidth / 2 + 3) * this.scale;
      this.yOffset = (this.frameHeight - 50) * this.scale;
      this.attackRate = 1;
  
      // level grid and enemy movement
      this.movement = new EnemyMovement(1, "right", this.x, this.y, this.grid);
  
    }

    loadAnimation() {
      this.animations = [];
      this.animations.push(this.walkAnim);
      this.animations.push(this.attackAnim);
      this.animations.push(this.takehitAnim);
      this.animations.push(this.deathAnim);
    };
    
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
          if (this.state != 3 && canSee(this, ent) && !this.target) {
            if (collide(this, ent) && this.cooldownTime > this.attackRate) {
              this.state = 1;
              this.cooldownTime = 0;
              this.attack(ent);
            }
  
            if (ent.removeFromWorld)
              this.state = 0;
          }
        }
      }
  
      // only move when running
      if (this.state == 0) {
        // skeleton direction
        this.determineDirection(this.movement);
    
        // skeleton movement
        let position = this.getMovement(this.movement, this.x, this.y);
        this.x = position.x;
        this.y = position. y;
        this.movement.updatePosition(this.x, this.y);
      }
  
      if (this.state == 3) {
        this.deathAnimationTime += this.gameEngine.clockTick;
        if (this.deathAnimationTime > 0.8)
          this.removeFromWorld = true;
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
  
      let position = {x: this.x, y: this.y};
  
      // draw bounds
      // this.showBounds(context, position, this.radius, false); // entity radius
      // this.showBounds(context, position, this.visualRadius, true); // visual bound
  
      // health bar
      this.drawHealth(context, this.x, this.y - this.yOffset/2, this.HP, this.maxHP, this.movement, position);
      
      this.animations[this.state].drawFrame(
        this.gameEngine.clockTick,
        context,
        this.x - this.xOffset,
        this.y - this.yOffset,
        this.scale
      );

    };

    takeHit(damage) {
      this.HP = Math.max(0, this.HP - damage);
  
      if (this.HP === 0) {
        this.isDead();
      }
    };
    
    isDead() {
      this.state = 3;
    };
}