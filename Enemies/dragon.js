class Dragon extends Enemy {
    constructor(gameEngine, x, y, level, spawnTime) {
      super(gameEngine, x, y, level, spawnTime);
      
      this.color = randomInt(4); // 0: gold, 1: red, 2: twin headed blue, 3: twin headed red
      
      // animations
      var time = 0.25;
      switch(this.color) {
        case 0:
          this.goldImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_dragon-gold.png");
          this.animation = new Animator(this.goldImg, 0, 128, 144, 128, 3, time, 0, false, true);
          break;
  
        case 1:
          this.redImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_dragon-red.png");
          this.animation = new Animator(this.redImg, 0, 128, 144, 128, 3, time, 0, false, true);
          break;
  
        case 2:
          this.twinBlueImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_twin_headed_dragon-blue.png");
          this.animation = new Animator(this.twinBlueImg, 0, 128, 144, 128, 3, time, 0, false, true);
          break;
  
        case 3:
          this.twinRedImg = ASSET_MANAGER.getAsset("./sprites/monster/dragons/flying_twin_headed_dragon-red.png");
          this.animation = new Animator(this.twinRedImg, 0, 128, 144, 128, 3, time, 0, false, true);
          break;
      }
  
      this.frameWidth = 144;
      this.frameHeight = 128;
  
      // stats
      this.scale = 1.5;
      this.HP = 200;
      this.maxHP = this.HP; // used in calculating health bar
      this.damage = 1; //90;
      this.reward = 250;
      this.radius = (this.frameWidth / 2 - 10) * this.scale; // entity radius
      this.shootingRadius = (this.frameWidth / 2 + 50) * this.scale; // shooting radius
      this.xOffset = (this.frameWidth / 2) * this.scale;
      this.yOffset = (this.frameHeight) * this.scale;
      this.fireRate = 2;
  
      // level grid and enemy movement
      this.movement = new EnemyMovement(1, "right", this.x, this.y, this.grid);
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
          if (canShoot(this, ent) && this.cooldownTime > this.fireRate) {
            this.cooldownTime = 0;
            this.attack(ent);
            this.gameEngine.addEntity(new Bullet(this.gameEngine, this.x + this.xOffset, this.y - this.yOffset/2, BULLETS["tomato"], ent, this));
          }
  
          if (ent.removeFromWorld)
            this.state = 0;
        }
      }
    
  
      // only move when flying
      // skeleton direction
      this.determineDirection(this.movement);
  
      // skeleton movement
      let position = this.getMovement(this.movement, this.x, this.y);
      this.x = position.x;
      this.y = position. y;
      this.movement.updatePosition(this.x, this.y);
      
  
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
      // this.showBounds(context, position, this.shootingRadius, true); // visual bound
  
      // health bar
      this.drawHealth(context, this.x, this.y - this.yOffset - 10, this.HP, this.maxHP, this.movement, position);
      
      this.animation.drawFrame(
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
      this.removeFromWorld = true;
      this.gameEngine.addEntity(new Coin(this.gameEngine, this.x, this.y));
    };
}