// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
};

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
};

// computes pythagoras' theorem
function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
};

function collide(a, b) {
    return (distance(a, b) < a.radius + b.radius);
}

// mainly used for shooting enemies (i.e. Slime, Flying Eye, Dragon) and all towers
// if the shooting entity's shootingBounds collide with target's entityBound, the entity can shoot.
function canShoot(shootingEntity, target) {
    return (distance(shootingEntity, target) < shootingEntity.shootingRadius + target.radius);
    
}

// only used for melee enemies (i.e. Goblin, Mushroom, Skeleton)
// if the melee enemy's visualBounds collide with target's entityBound, the enemy locks on a specific tower to attack later
function canSee(meleeEnemy, tower) {
        console.log(meleeEnemy);
        console.log(tower);
        return (distance(meleeEnemy, tower) < meleeEnemy.visualRadius + tower.radius);
}

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// add global parameters here

var PARAMS = {
    SCALE: 3 
};

// Bullet array that contains different specs for each bullet
var BULLETS = [];
BULLETS["tomato"] = {asset: "./sprites/other/bullet_tomato.png", frameWidth: 22, frameHeight: 22, canRotate: false, type: "tomato"};
BULLETS["bullet_b"] = {asset: "./sprites/other/bulletb.png", frameWidth: 10, frameHeight: 8, canRotate: true, type: "bullet_b"}
