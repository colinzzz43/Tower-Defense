class DescriptionBox {
  /*
		Constructor for the DescriptionBox class
		
		Parameters:
		@gameEngine				the game engine that will use this object
		@topLeftCornerX			the x-coordinate in canvas where top left corner of the description box will be
		@topLeftCornerY			the y-coordinate in canvas where top left corner of the description box will be will be	
		@ctx					the canvas that this description box will be will be applied to
		@level					the level that will use this description box will be					
	*/
  constructor(gameEngine, topLeftCornerX, topLeftCornerY, ctx, level) {
    Object.assign(this, {
      gameEngine,
      topLeftCornerX,
      topLeftCornerY,
      ctx,
      level,
    });

	this.spritesheet = ASSET_MANAGER.getAsset(
		"./sprites/levelselect/arrow.png"
	  );
	  this.sellIcon = ASSET_MANAGER.getAsset("./sprites/levelselect/Sell.png");
	  this.upgradeIcon = ASSET_MANAGER.getAsset("./sprites/levelselect/Upgrade.png");

    // Interact with the User entity that is written
    // as a field in the SceneManager entity
    this.user = this.gameEngine.camera.user;
    this.gameEngine.dB = this;

    this.menuBoxWidth = 1190;
    this.menuBoxHeight = 100;
    this.userIcons = [];

    this.messageCode = 0;

    this.initializeIcons();
    this.mouseInteraction();
    this.widthScale = widthScaling();
  }

  /*
		Draw the official Description Box 
	*/
  draw(ctx) {
    this.drawDescriptionBox();
  }

  /*
		Update the state of the user menu
	*/
  update() {
    // do nothing for now
  }

  /*
		Draw the shapes to make the user menu
	*/
  drawDescriptionBox() {
    this.ctx.beginPath();

    // Draw the rectangle for menu box
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 10;
    this.ctx.rect(
      this.topLeftCornerX,
      this.topLeftCornerY,
      this.menuBoxWidth,
      this.menuBoxHeight
    );
    this.ctx.stroke();
    this.ctx.strokeStyle = "lightgray";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      this.topLeftCornerX - 2,
      this.topLeftCornerY - 2,
      this.menuBoxWidth + 4,
      this.menuBoxHeight + 4
    );

    // Fill the background color of menu box with gradient
    var grd = this.ctx.createRadialGradient(0, 350, 0, 0, 350, 500);
    grd.addColorStop(0, "LightSteelBlue");
    grd.addColorStop(1, "White");
    this.ctx.fillStyle = grd;
    this.ctx.fill();

    // Draw the Tower Store Sign on Menu
    this.ctx.strokeStyle = "navy";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(
      this.topLeftCornerX + 5,
      this.topLeftCornerY + 10,
      this.menuBoxWidth - 10,
      25
    );
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.font = "20px monospace";

	// this.messageCode = 2;

	if (this.messageCode != 0 && this.messageCode != 11 && this.messageCode != 10) {
		this.ctx.drawImage(this.spritesheet, this.topLeftCornerX + 385, this.topLeftCornerY + 45, 50, 50);
		this.ctx.drawImage(this.spritesheet, this.topLeftCornerX + 785, this.topLeftCornerY + 45, 50, 50);
	}

    switch (this.messageCode) {
      case 0:
        this.ctx.strokeText(
          "Description Box",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );
        this.ctx.strokeText(
          "To place a tower on the map, first click a tower icon in the Tower Store menu on",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 55
        );
        this.ctx.strokeText(
          "the right then click a grid tile on the map. Click the selected icon again to de-select it",
          this.topLeftCornerX + 50,
          this.topLeftCornerY + 75
        );
        this.ctx.strokeText(
          "turn off grid.",
          this.topLeftCornerX + 510,
          this.topLeftCornerY + 95
        );
        break;
      //
      case 1:
        this.ctx.strokeText(
          "Cannon Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );
        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 30",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 40",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 60^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 65",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 120^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 100",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 1000,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 1000,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 1000,
          this.topLeftCornerY + 95
        );

        break;
      case 2:
        this.ctx.strokeText(
          "Flame Thrower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 50",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 40",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Small",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 70^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 65",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Small",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 110^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 100",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Small",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );
        break;

      case 3:
        this.ctx.strokeText(
          "Laser Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 10",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 60",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 20^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 90",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 50^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 120",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 4:
        this.ctx.strokeText(
          "Matter Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );
        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 10",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 75",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 40^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 120",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 100^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 160",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Very fast",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 5:
        this.ctx.strokeText(
          "Machine Gun Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 30",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 25",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Moderate",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Fast",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 50^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 40",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Moderate",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Fast",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 90^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 60",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Moderate",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Fast",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 6:
        this.ctx.strokeText(
          "Pistol Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 100",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 10",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Moderate",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 120^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 20",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Moderate",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 160^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 30",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Moderate",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 7:
        this.ctx.strokeText(
          "Rocket Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 10",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 75",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 40^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 120",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 100^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 160",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Long",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 8:
        this.ctx.strokeText(
          "Shotgun Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );
        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 50",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 25",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Short",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 70^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 40",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Short",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 110^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 60",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Short",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Strong",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Moderate",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 9:
        this.ctx.strokeText(
          "Spazer Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

        // Level 1
        this.ctx.font = "15px monospace";

        this.ctx.strokeText(
          "Level 1 ",
          this.topLeftCornerX + 150,
          this.topLeftCornerY + 50
        );

        this.ctx.strokeText(
          "HP : 100",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 75",
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 95
        );
        // Level 2

        this.ctx.strokeText(
          "Level 2",
          this.topLeftCornerX + 550,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 400,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 105^",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 120",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 95
        );

        // Level 3

        this.ctx.strokeText(
          "Level 3",
          this.topLeftCornerX + 950,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 50
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 65
        );
        this.ctx.strokeText(
          "",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 80
        );
        this.ctx.strokeText(
          "|",
          this.topLeftCornerX + 800,
          this.topLeftCornerY + 95
        );

        this.ctx.strokeText(
          "HP : 165^",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: 160",
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : Medium",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: Weak",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : Slow",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;
      case 10:
        this.ctx.strokeText(
          "Upgrade Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        
	  );
	//   this.ctx.drawImage(this.upgradeIcon, this.topLeftCornerX + 35, this.topLeftCornerY + 30, 200, 75);


		this.ctx.strokeText(
			"Upgrade your tower to a better one,",
			this.topLeftCornerX + 380,
			this.topLeftCornerY + 55
		  );
		  this.ctx.strokeText(
			"You will need it for the upcoming waves!",
			this.topLeftCornerX + 350,
			this.topLeftCornerY + 75
		  );

        break;
      case 11:
        this.ctx.strokeText(
          "Sell Tower",
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 29
        );

		// this.ctx.drawImage(this.sellIcon, this.topLeftCornerX + 35, this.topLeftCornerY + 30, 150, 75);

		this.ctx.strokeText(
			"Sell it when you don't need it,",
			this.topLeftCornerX + 380,
			this.topLeftCornerY + 55
		  );
		  this.ctx.strokeText(
			"You will get 80% of your money back!",
			this.topLeftCornerX + 350,
			this.topLeftCornerY + 75
		  );
        break;
    }

    this.ctx.closePath();
  }

  /*
		Create icons for user feature type and fill the user menu with them
	*/
  initializeIcons() {
    // Centerize the rows of icons in the menu
    var centerX = this.topLeftCornerX + this.menuBoxWidth / 15;
    var y = this.topLeftCornerY + this.menuBoxHeight / 12;

    // Vertical pixel space between the top left corners of the rows of icons in the menu
    var verticalSpace = 90;

    // Create the 'Undo' Icon
    var undoIcon = new UndoIcon(
      this.gameEngine,
      centerX,
      y,
      this.ctx,
      this.level
    );
    this.userIcons.push(undoIcon);
    y += verticalSpace;

    // Create the 'Speed' Icon
    var speedIcon = new SpeedIcon(
      this.gameEngine,
      centerX,
      y,
      this.ctx,
      this.level
    );
    this.userIcons.push(speedIcon);
    y += verticalSpace;

    // Create the 'Mute' Icon
    var muteIcon = new MuteIcon(
      this.gameEngine,
      centerX,
      y,
      this.ctx,
      this.level
    );
    this.userIcons.push(muteIcon);
    y += verticalSpace;

    // Create the 'Pause' Icon
    var pauseIcon = new PauseIcon(
      this.gameEngine,
      centerX,
      y,
      this.ctx,
      this.level
    );
    this.userIcons.push(pauseIcon);
    y += verticalSpace;

    // Create the 'Restart' Icon
    var restartIcon = new RestartIcon(
      this.gameEngine,
      centerX,
      y,
      this.ctx,
      this.level
    );
    this.userIcons.push(restartIcon);

    // Add user icon entities to game engine
    this.gameEngine.addEntity(undoIcon);
    this.gameEngine.addEntity(speedIcon);
    this.gameEngine.addEntity(muteIcon);
    this.gameEngine.addEntity(pauseIcon);
    this.gameEngine.addEntity(restartIcon);
  }

  /*
		apply the mouse interaction for the user menu and its icons
	*/
  mouseInteraction() {
    var that = this;

    // Get x,y coordinates of canvas where mouse pointer is
    var getXandY = function (e) {
      var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
      var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

      return { x: x, y: y };
    };

    // add mouse click event listener which selects and de-selects the tower icon when clicked on directly
    that.ctx.canvas.addEventListener(
      "click",
      function (e) {
        var canvasCoordinates = getXandY(e);
        var x = canvasCoordinates.x;
        var y = canvasCoordinates.y;

        for (var i = 0; i < that.userIcons.length; i++) {
          var icon = that.userIcons[i];
          var topLeftX = icon.xCanvas * that.widthScale;
          var topLeftY = icon.yCanvas * that.widthScale;
          var iconWidth = icon.iconBoxWidth * that.widthScale;
          var iconHeight = icon.iconBoxHeight * that.widthScale;
          if (
            x >= topLeftX &&
            x <= topLeftX + iconWidth &&
            y >= topLeftY &&
            y <= topLeftY + iconHeight
          ) {
            if (
              icon instanceof SpeedIcon ||
              icon instanceof MuteIcon ||
              icon instanceof PauseIcon
            ) {
              icon.changeLabel();
            }
            icon.userIconFunction();
          }
        }
      },
      false
    );

    // add mouse move event listener which detects whether mouse cursor is over an icon or not
    that.ctx.canvas.addEventListener(
      "mousemove",
      function (e) {
        var canvasCoordinates = getXandY(e);
        var x = canvasCoordinates.x;
        var y = canvasCoordinates.y;
        for (var i = 0; i < that.userIcons.length; i++) {
          var icon = that.userIcons[i];
          var topLeftX = icon.xCanvas * that.widthScale;
          var topLeftY = icon.yCanvas * that.widthScale;
          var iconWidth = icon.iconBoxWidth * that.widthScale;
          var iconHeight = icon.iconBoxHeight * that.widthScale;
          if (
            x >= topLeftX &&
            x <= topLeftX + iconWidth &&
            y >= topLeftY &&
            y <= topLeftY + iconHeight
          ) {
            icon.mouseover = true;
          } else {
            icon.mouseover = false;
          }
        }
      },
      false
    );
  }
}
