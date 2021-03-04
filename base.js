class Base {
  constructor(gameEngine, x, y) {
    // x and y are center coordinates of base
    Object.assign(this, { gameEngine, x, y });

    this.gameEngine.camera.base = this;

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
    this.SCALE = 2; // SCALE = 3.75, to take up 3x3 of grid on map, SCALE = 2 for snow level
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
      if (entity instanceof Enemy) {
        if (collide(that, entity)) {
          entity.attackBase(); // enemies disapear on collision with base
          that.HP -= entity.damageAgainstBase; // base loses 1 hp
          that.playSoundEffect();
        }
      }
    });
    // that.printBaseHP(that.HP);
    if (this.HP == 0) {
      this.isDead();
    }
  }



  playSoundEffect() {
    var BGM = new Audio("./soundeffects/Popping.mp3");
    BGM.volume = 0.4;
    BGM.play();
  }

  draw(context) {
    // show bounds for collision testing
 // this.showBoundingCircle(context);
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
