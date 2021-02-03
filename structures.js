class Base {
  constructor(gameEngine, x, y) {
    // x and y are center coordinates of base
    Object.assign(this, { gameEngine, x, y });

    this.gameEngine.base = this;

    // spritesheet
    this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/base.png");
    this.animation = new Animator(
      this.spritesheet,
      0,
      0,
      48,
      48,
      1,
      0.1,
      0,
      false,
      true
    );

    // stats
    this.HP = 5;
    this.SCALE = 3.75; // SCALE = 3.75, to take up 3x3 of grid on map
    this.diameter = 48 * this.SCALE;
    this.radius = this.diameter / 2;
  }

  // show base's bounding circle
  showBoundingCircle(context) {
    context.beginPath();
    // draw circle representing bounding box
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = "#FD0";
    context.stroke();
  }

  // print current health to html doc
  // printBaseHP(HP) {
  //   if (HP > 0) {
  //     document.getElementById("printBaseHP").innerHTML = HP;
  //   } else {
  //     document.getElementById("printBaseHP").innerHTML = "DEFEAT";
  //   }
  // }

  update() {
    var that = this;
    this.gameEngine.entities.forEach(function (entity) {
      if (entity instanceof Slime) {
        if (collide(that, entity)) {
          entity.attackBase(); // enemies disapear on collision with base
          that.HP -= entity.damageAgainstBase; // base loses 1 hp
        }
      }
    });
    // that.printBaseHP(that.HP);
    if (this.HP == 0) {
      this.isDead();
    }
  }

  draw(context) {
    // show bounds for collision testing
    this.showBoundingCircle(context);

    // x an y are center coordinates, subtract radius for drawing offset
    this.animation.drawFrame(
      this.gameEngine.clockTick,
      context,
      this.x - this.radius,
      this.y - this.radius,
      this.SCALE
    );
  }

  isDead() {
    this.removeFromWorld = true;
  }
}

class PistolTower {
  constructor() {
    this.spritesheet = ASSET_MANAGER.getAsset(
      "./sprites/towers/pistol/tower_pistol_down.png"
    );
  }

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class MachineGunTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class ShotgunTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class CannonTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class FlamethrowerTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class LaserTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class MatterTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class RocketTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}

class SpazerTower {
  constructor() {}

  draw() {}

  buy() {}

  sell() {}

  upgrade() {}

  aim() {}

  fireProjectile() {}

  isDead() {}
}
