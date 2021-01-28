class Slime {
  //add movement parameter for collision testing
  constructor(gameEngine, x, y) {
    Object.assign(this, { gameEngine, x, y });

    this.user = this.gameEngine.user;
    this.damage = 0.09;
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
    // this.velocity = {}; // used for moving the enemy across the map
    this.HP = 35;
    this.reward = 1000;
    this.radius = (this.frameWidth / 2 + 1) * PARAMS.SCALE; // entity radius
    this.shootingRadius = (this.frameWidth / 2 + 5) * PARAMS.SCALE; // shooting radius
    this.xOffset = (this.frameWidth / 2) * PARAMS.SCALE;
    this.yOffset = (this.frameHeight / 2) * PARAMS.SCALE + 1;
  }

  // shows entity bounds and shooting bounds
  showBounds(context) {
    // entity bound
    context.setLineDash([]);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = "#FD0";
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
    if (!this.paused) {
      // move slimes
      this.x = this.x + 0.5; // move right;
    }

    var that = this;

    this.gameEngine.entities.forEach(function (entity) {
      // tower detection
      if (entity instanceof Tower) {
        // tower shoots enemy in shooting bounds
        if (canShoot(that, entity)) {
          that.attack(entity);
          console.log("Tower HP: ", entity.HP);
        }
      }

      // slime detection
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

    // slime movement
    if (this.moving) this.x += 1;
  }

  draw(context) {
    this.showBounds(context);
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
    tower.takeHit(this.damage);
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
