class Slime {
  //add movement parameter for collision testing
  constructor(gameEngine, x, y, moving) {
    Object.assign(this, { gameEngine, x, y});

    this.animations = [];

    // spritesheet
    // might need to use slime1_side and flip so that slimes face right when animating
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/monster/slime/slime1_front.png"
    );

    this.death = ASSET_MANAGER.getAsset(
        "./sprites/monster/slime/slime_explode.png"
    );

    // animations
    this.aliveAnim = new Animator(this.spritesheet, 0, 0, 16, 16, 4, 0.15, 0, false, true);
    this.deadAnim = new Animator(this.death, 0, 0, 37, 41, 8, 0.25, 0, false, false);

    // states
    this.dead = false;
    this.takeHit = false;
    this.paused = false; // used when HUD is set up

    // other stats
    // this.velocity = {}; // used for moving the enemy across the map
    this.HP = 10;
    this.radius = 30;
    this.moving = moving;

    this.updateBC(); 
  }

  // shows the bounding circle of the slime
  showBounds(context) {
    context.beginPath();
    context.arc(
      this.x + 24,
      this.y + 24,
      this.radius,
      0,
      2 * Math.PI
    );
    context.fill();
    context.fillStyle = "#FD0";

    context.stroke();
  }

  // BC = bounding circle
  updateBC() {
    this.lastBC = this.BC;
    this.BC = new BoundingCircle(this.x + 24, this.y + 24, this.radius); // bounds the slime itself in a circle
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

    this.updateBC();

    var that = this; 

    this.gameEngine.entities.forEach(function(entity) {
        // tower detection
        if (entity instanceof Tower) {
            // tower shoots enemy in shooting bounds
            if (that.BC.collide(entity.shootBound)) {
                entity.shoot();
            }
        }

        // slime detection
        if (entity instanceof Slime) {
            if (entity !== that && that.BC.collide(entity.BC)) {
                // slimes collide with each other
                var dist = distance(that, entity);
                var delta = that.radius + entity.radius - dist;
                var difX = (that.x - entity.x) / dist;
                var difY = (that.y - entity.y) / dist;

                that.x += difX * delta / 2;
                that.y += difY * delta / 2;
                entity.x -= difX * delta / 2;
                entity.y -= difY * delta / 2;                
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
  };

  draw(context) {
      this.showBounds(context);
    if (this.dead) {
        this.deadAnim.drawFrame(this.gameEngine.clockTick, context, this.x-PARAMS.SCALE*10.5, this.y-PARAMS.SCALE*25, PARAMS.SCALE);
    } else {
        this.aliveAnim.drawFrame(this.gameEngine.clockTick, context, this.x, this.y, PARAMS.SCALE);
    }
  };

  takeHit(damage) {
    this.HP = Math.max(0, this.HP - damage);
    
    if (this.HP === 0) {
        this.dead = true;
    }
  }

  attack() {
    console.log("slime attack");
  };

  isDead() {}
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
