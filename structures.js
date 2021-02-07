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
    context.fillStyle = "#FD0";
    context.fill();

    context.stroke();
  }

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

  // use this method for effects of base dying.
  isDead() {
    
  }

}

class PistolTower {
  constructor(gameEngine, x, y, level) {
    Object.assign(this, { gameEngine, x, y, level });
  
    //assets
    this.user = this.gameEngine.user;

    this.spritesheet = ASSET_MANAGER.getAsset("./prototype-tower.png");
    this.animations = [];
    this.animations.push(new Animator(this.spritesheet, 0, 0, (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16 * 2,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16 * 3,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16 * 4,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16 * 5,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16 * 6,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );
    this.animations.push(
      new Animator(
        this.spritesheet,
        16 * 7,
        0,
        (this.frameWidth = 16),
        (this.frameHeight = 37),
        1,
        1,
        0,
        false,
        true
      )
    );

    //stats
    this.HP = 20;
    this.maxHP = this.HP;
    this.facing = 0;
    this.damage = 10;
    this.cost = 10; // basic = 10 for prototype
    this.depreciated = 0.8; // depreciation rate is set to 0.8 for prototype
    this.radius = 10 * PARAMS.SCALE; // entity radius
    this.shootingRadius = 30 * PARAMS.SCALE; // basic = 90 for prototype
    this.fireRate = 1;

    // other
    this.user = this.gameEngine.user; // the user interacting with the tower
    this.xOffset = (this.frameWidth * PARAMS.SCALE) / 2;
    this.yOffset = this.frameHeight * PARAMS.SCALE - 5 * PARAMS.SCALE;
    this.elapsedTime = 0;
  }
  
    update() {
      this.elapsedTime += this.gameEngine.clockTick;
      var that = this;
      // tower detection
      this.gameEngine.entities.forEach(function (entity) {
        // tower detection
        if (entity instanceof Slime) {
          // tower shoots enemy in shooting bounds
          if (
            canShoot(that, entity) &&
            that.elapsedTime > that.fireRate &&
            entity.exist
          ) {
            that.elapsedTime = 0;
            that.shoot(entity);
            // console.log("Slime HP: ", entity.HP);
            // that.printMonsterHP(entity.HP);
          }
        }
      });
    }
  
    showBoundingCircle(context) {
      // entity bound
      context.setLineDash([]);
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fillStyle = "#FD0";
      context.fill();
      context.stroke();
  
      // shooting bound
      context.setLineDash([8, 15]);
      context.beginPath();
      context.arc(this.x, this.y, this.shootingRadius, 0, 2 * Math.PI);
      context.stroke();
    }
  
    buy() {
      // check if the user has the sufficient fund
      if (this.user.balance >= this.cost) {
        // draw the tower onto the map
  
        this.user.decreaseBalance(this.cost);
      } else {
        // debugging purpose
        console.log(" You don't have the sufficient fund.");
      }
    }
  
    // printMonsterHP(HP) {
    //   document.getElementById("printMonsterHP").innerHTML = HP;
    // }
  
    sell() {
      // Add the money back to the user balance
      this.user.increaseBalance(this.cost * this.depreciated);
      // Remove itself from the map (remove entity from the gameengine)
      this.gameEngine.removeEntity(this);
    }
  
    dead() {
      this.removeFromWorld = true;
    
      // After tower is removed from world, set the terrain tile it was on to open tower terrain
      var tilePosition = this.getTilePosition();
      this.level.changeStateOfTowerTerrain(tilePosition.row, tilePosition.column);
    }
  
    getShootingRange() {
      return this.shootingRadius;
    }
  
    getPosition() {
      return [this.x, this.y];
    }
    
    getTilePosition() {
      var tileSideLength = this.level.getTilePixelImageSize();
      var row = Math.floor(this.y / tileSideLength);
      var column = Math.floor(this.x / tileSideLength);
      return {row: row, column: column};
    }
  
    getCost() {
      return this.cost;
    }
  
    shoot(enemy) {
      // shooting animation
      // enemy.takeHit(this.damage);
      this.gameEngine.addEntity(
        new Bullet(
          this.gameEngine,
          this.x,
          this.y - 90,
          BULLETS["bullet_b"],
          enemy,
          this
        )
      );
    }
  
    takeHit(damage) {
      this.HP = Math.max(0, this.HP - damage);
  
      if (this.HP === 0) {
        this.dead();
      }
    }
  
    draw(context) {
      this.showBoundingCircle(context);
      this.drawHealth(
        context,
        this.x,
        this.y - this.yOffset - 30,
        this.HP,
        100,
        10
      );
      this.animations[this.facing].drawFrame(
        this.gameEngine.clockTick,
        context,
        this.x - this.xOffset,
        this.y - this.yOffset,
        PARAMS.SCALE
      );
      // context.drawImage(this.spritesheet, this.x, this.y);
    }
  
    drawHealth(ctx, x, y, HP, width, thickness) {
      var percentage = width * (HP / this.maxHP);
      ctx.beginPath();
      ctx.rect(x - width / 2, y, percentage, thickness);
      if (percentage > 63) {
        ctx.fillStyle = "green";
      } else if (percentage > 37) {
        ctx.fillStyle = "gold";
      } else if (percentage > 13) {
        ctx.fillStyle = "orange";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.closePath();
      ctx.fill();
    }
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
