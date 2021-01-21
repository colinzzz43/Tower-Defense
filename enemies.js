class Slime {
    constructor(gameEngine, x, y) {
        Object.assign(this, {gameEngine, x, y});
        
        // spritesheet
        // might need to use slime1_side and flip so that slimes face right when animating
        this.spritesheet = ASSETMANAGER.getAsset("./sprites/monster/slime/slime1_front.png");
        this.death = ASSETMANAGER.getAsset("./sprites/monster/slime/slime_explode.png"); 
            
        // animations
        this.animation = new Animator(this.spritesheet, 0, 0, 16, 16, 1, 1, 0, false, true);
        this.deadAnim = new Animator(this.death, 0, 0, 37, 41, 8, 1, 0, false, false);

        // states
        this.dead = false;
        // this.paused = false; // implemented when HUD is set up


        // this.velocity = {}; // used for moving the enemy across the map


    };

    updateBB() {
        this.lastSlimeBB = this.slimeBB; // bounding box for slime collision with other slimes
        this.lastTowerDetectBB = this.towerDetectBB; // bounding box for tower detection

        // this.slimeBB = new BoundingBox(); // create class for bounding box
        // this.towerDetectBB = new BoundingBox();
    };

    update() {
        if(this.dead) {
            // remove entity
        }

        if(this.paused) {
            // pause animation at certain frame
        }

        if (!this.paused && !this.dead) {
            // move slimes
            this.x = this.x + 1; // move right;
        }
    };

    draw() {
        if (this.dead) {
            // stop drawing
        } else {
            this.animations.drawFrame(this.gameEngine);
        }
    };

    attack() {
        
    };

    isDead() {

    };
};

class Goblin {
    constructor() {

    }

    updateBB() {
        
    }

    update() {

    }

    draw() {

    }

    attack() {
        
    }

    isDead() {

    }
}

class Skeleton {
    constructor() {

    }

    updateBB() {
        
    }

    update() {

    }

    draw() {

    }

    attack() {
        
    }

    isDead() {

    }
}

class Eyeball {
    constructor() {

    }

    updateBB() {
        
    }

    update() {

    }

    draw() {

    }

    attack() {
        
    }

    isDead() {

    }
}

class Mushroom {
    constructor() {

    }

    updateBB() {
        
    }

    update() {

    }

    draw() {

    }

    attack() {
        
    }

    isDead() {

    }
}

class Dragon {
    constructor() {

    }

    updateBB() {
        
    }

    update() {

    }

    draw() {

    }

    attack() {
        
    }

    isDead() {

    }
}