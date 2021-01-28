class Slime {
  constructor(gameEngine, x, y) {
    Object.assign(this, { gameEngine, x, y });

    this.animations = [];

    this.reward = 5;
    // spritesheet
    // might need to use slime1_side and flip so that slimes face right when animating
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/monster/slime/slime1_front.png"
    );

    this.death = ASSET_MANAGER.getAsset(
      "./sprites/monster/slime/slime_explode.png"
    );

    // animations
    this.aliveAnim = new Animator(
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
    this.deadAnim = new Animator(
      this.death,
      0,
      0,
      37,
      41,
      8,
      0.25,
      0,
      false,
      false
    );

    // states
    this.dead = false;
    this.takeHit = false;
    this.paused = false; // used when HUD is set up

    // other stats
    // this.velocity = {}; // used for moving the enemy across the map
    this.HP = 10;

    this.updateBC(); // might not be needed
  }

  // BC = bounding circle
  updateBC() {
    this.lastBC = this.BC;
    this.BC = new BoundingCircle(this.x, this.y, 8); // bounds the slime itself in a circle
  }

  update() {
    // if(this.dead) {
    //     // remove entity
    // }
    // if(this.paused) {
    //     // pause animation at certain frame
    // }
    // if (!this.paused && !this.dead) {
    //     // move slimes
    // this.x = this.x + 1; // move right;
    // }
    var that = this;

    // tower detection
    this.gameEngine.entities.forEach(function (entity) {
      if (entity.BC && that.BC.collide(entity.BC)) {
        if (entity instanceof Tower) that.attack();
      }
    });

    // slime movement
    this.x += 1;
  }

  draw(ctx) {
    if (this.dead) {
      this.deadAnim.drawFrame(
        this.gameEngine.clockTick,
        ctx,
        this.x - PARAMS.SCALE * 10.5,
        this.y - PARAMS.SCALE * 25,
        PARAMS.SCALE
      );
    } else {
      this.aliveAnim.drawFrame(
        this.gameEngine.clockTick,
        ctx,
        this.x,
        this.y,
        PARAMS.SCALE
      );
    }
  }

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);

    if (this.HP === 0) {
      this.dead = true;
    }
  }

  attack() {
    console.log("slime attack");
  }

  isDead(User) {
    User.increaseBalance(this.reward);
    this.removeFromWorld = true;
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
