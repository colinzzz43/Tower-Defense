// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
  constructor() {
    this.entities = [];
    this.showOutlines = false;
    this.ctx = null;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
  }

  init(ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.startInput();
    this.timer = new Timer();
  }

  start() {
    var that = this;
    (function gameLoop() {
      that.loop();
      requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
  }

  // Mouse click input for towers and user menu
  startInput() {
    var that = this;

    var getXandY = function (e) {
      var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
      var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

      return { x: x, y: y };
    };

    this.ctx.canvas.addEventListener(
      "mousemove",
      function (e) {
        //console.log(getXandY(e));
        that.mouse = getXandY(e);
      },
      false
    );

    this.ctx.canvas.addEventListener(
      "click",
      function (e) {
        //        console.log(getXandY(e));
        that.click = getXandY(e);
      },
      false
    );

    // this.ctx.canvas.addEventListener("wheel", function (e) {
    //     //console.log(getXandY(e));
    //     that.wheel = e;
    //     //       console.log(e.wheelDelta);
    //     e.preventDefault();
    // }, false);

    // this.ctx.canvas.addEventListener("contextmenu", function (e) {
    //     //console.log(getXandY(e));
    //     that.rightclick = getXandY(e);
    //     e.preventDefault();
    // }, false);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  // added by Colin, feel free to edit
  // can be used to remove Towers, Slimes, other entities
  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
    } else {
      // debug purpose
      console.log(entity, " does not exist.");
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.imageSmoothingEnabled = false;
	var lastEntitiesToDraw = [];
    for (var i = 0; i < this.entities.length; i++) {
		
		// If an entity is of a certain type such as SceneManager,
		// then don't draw it until all other entities have been fully drawn.
		if (!(this.entities[i] instanceof SceneManager)) {
			this.entities[i].draw(this.ctx);
		} else {
			lastEntitiesToDraw.push(this.entities[i]);
		}
    }
	
	// Draw any entity types that are supposed to be drawn last in this draw method
	for (var i = 0; i < lastEntitiesToDraw.length; i++) {
		lastEntitiesToDraw[i].draw(this.ctx);
    }
  }

  update() {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
      var entity = this.entities[i];

      if (!entity.removeFromWorld) {
        entity.update();
      }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
      if (this.entities[i].removeFromWorld) {
        this.entities.splice(i, 1);
      }
    }
  }

  loop() {
	this.clockTick = this.timer.tick();
	this.update();
	this.draw();		
  }
}
