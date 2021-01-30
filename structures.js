class Base {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/other/base.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 48, 48, 1, 0.1, 0, false, true);

        // stats
        this.HP = 50;
        this.SCALE = 3.75; // SCALE = 3.75, to take up 3x3 of grid on map
        this.diameter = 48 * this.SCALE;
        this.radius = this.diameter / 2;



    }

    // show base's bounding box
    showBoundingCircle(context) {
        context.beginPath();
        // draw rectangle representing bounding box
        // context.rect(this.x, this.y, this.width, this.height);
        context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = "#FD0";
        context.stroke();

    }

    update() {
        var that = this;
        this.gameEngine.entities.forEach(function (entity) {
            if (entity instanceof Slime) {
              if (collide(that, entity)) {
                entity.takeHit(entity.HP)
              }
            }
        });
    }

    draw(context) {
        this.showBoundingCircle(context);
        this.animation.drawFrame(this.gameEngine.clockTick, context, this.x, this.y, this.SCALE); 
    }


    isDead() {

    }
}

class PistolTower {
    constructor() {

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/towers/pistol/tower_pistol_down.png");

    }

    draw() {

    }

    buy() {

    }

    sell() {

    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class MachineGunTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class ShotgunTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class CannonTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class FlamethrowerTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class LaserTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class MatterTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class RocketTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }

}

class SpazerTower {
    constructor() {

    }

    draw() {

    }
  
    buy() {

    }

    sell() {
        
    }

    upgrade() {

    }

    aim() {

    }

    fireProjectile() {

    }

    isDead() {

    }
}
