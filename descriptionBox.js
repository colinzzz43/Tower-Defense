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
    this.upgradeIcon = ASSET_MANAGER.getAsset(
      "./sprites/levelselect/Upgrade.png"
    );

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

    // sell and upgrade price totals
    this.sellTotal = 0;
    this.upgradeTotal = 0;
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
    this.sellTotal = 0;
    this.upgradeTotal = 0;

    var that = this;
    this.gameEngine.entities.forEach(function (entity) {
      if (entity instanceof Tower) {
        if (entity.selected) {
          that.sellTotal += entity.cost * 0.8;
          that.upgradeTotal += entity.upgradeCost;
        }
      }
    });
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

    if (
      this.messageCode != 0 &&
      this.messageCode != 11 &&
      this.messageCode != 10
    ) {
      this.ctx.drawImage(
        this.spritesheet,
        this.topLeftCornerX + 385,
        this.topLeftCornerY + 45,
        50,
        50
      );
      this.ctx.drawImage(
        this.spritesheet,
        this.topLeftCornerX + 785,
        this.topLeftCornerY + 45,
        50,
        50
      );
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
      // Cannon Tower
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
          "HP : " + Cannon.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Cannon.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Cannon.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Cannon.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Cannon.fireRate,
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
          "HP : " + Cannon.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Cannon.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Cannon.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Cannon.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Cannon.fireRate2,
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
          "HP : " + Cannon.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Cannon.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Cannon.shootingRadius3,
          this.topLeftCornerX + 1000,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Cannon.damage3,
          this.topLeftCornerX + 1000,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Cannon.fireRate3,
          this.topLeftCornerX + 1000,
          this.topLeftCornerY + 95
        );

        break;

      // Flamethrower
      case 2:
        this.ctx.strokeText(
          "Flamethrower",
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
          "HP : " + Flamethrower.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Flamethrower.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Flamethrower.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Flamethrower.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Flamethrower.fireRate,
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
          "HP : " + Flamethrower.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Flamethrower.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Flamethrower.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Flamethrower.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Flamethrower.fireRate2,
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
          "HP : " + Flamethrower.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Flamethrower.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Flamethrower.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Flamethrower.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Flamethrower.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );
        break;

      // Laser Tower
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
          "HP : " + Laser.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Laser.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Laser.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Laser.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Laser.fireRate,
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
          "HP : " + Laser.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Laser.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Laser.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Laser.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Laser.fireRate2,
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
          "HP : " + Laser.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Laser.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Laser.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Laser.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Laser.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;

      // Matter tower
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
          "HP : " + Matter.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Matter.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Matter.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Matter.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Matter.fireRate,
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
          "HP : " + Matter.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Matter.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Matter.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Matter.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Matter.fireRate2,
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
          "HP : " + Matter.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Matter.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Matter.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Matter.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Matter.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;

      // Machine gun tower
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
          "HP : " + MG.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + MG.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + MG.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + MG.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + MG.fireRate,
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
          "HP : " + MG.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + MG.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + MG.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + MG.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + MG.fireRate2,
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
          "HP : " + MG.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + MG.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + MG.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + MG.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + MG.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;

      // Pistol Tower
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
          "HP : " + Pistol.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Pistol.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Pistol.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Pistol.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Pistol.fireRate,
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
          "HP : " + Pistol.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Pistol.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Pistol.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Pistol.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Pistol.fireRate2,
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
          "HP : " + Pistol.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Pistol.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Pistol.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Pistol.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Pistol.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;

      // Rocket Tower
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
          "HP : " + Rocket.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Rocket.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Rocket.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Rocket.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Rocket.fireRate,
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
          "HP : " + Rocket.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Rocket.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Rocket.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Rocket.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Rocket.fireRate2,
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
          "HP : " + Rocket.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Rocket.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Rocket.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Rocket.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Rocket.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;

      // Shotgun tower
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
          "HP : " + Shotgun.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Shotgun.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Shotgun.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Shotgun.damage,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Shotgun.fireRate,
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
          "HP : " + Shotgun.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Shotgun.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Shotgun.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Shotgun.damage2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Shotgun.fireRate2,
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
          "HP : " + Shotgun.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Shotgun.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Shotgun.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Damage: " + Shotgun.damage3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Shotgun.fireRate3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 95
        );

        break;

      // Spazer tower
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
          "HP : " + Spazer.maxHP,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Spazer.cost,
          this.topLeftCornerX + 100,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Spazer.shootingRadius,
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Control: " + Spazer.controlTime + "secs",
          this.topLeftCornerX + 200,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Spazer.fireRate,
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
          "HP : " + Spazer.maxHP2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Spazer.cost2,
          this.topLeftCornerX + 500,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Spazer.shootingRadius2,
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Control: " + Spazer.controlTime2 + "secs",
          this.topLeftCornerX + 600,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Spazer.fireRate2,
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
          "HP : " + Spazer.maxHP3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Cost: " + Spazer.cost3,
          this.topLeftCornerX + 900,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Range : " + Spazer.shootingRadius3,
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 65
        );

        this.ctx.strokeText(
          "Control: " + Spazer.controlTime3 + "secs",
          this.topLeftCornerX + 995,
          this.topLeftCornerY + 80
        );

        this.ctx.strokeText(
          "Fire Rate : " + Spazer.fireRate3,
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
          "Upgrade your tower to a more powerful one!",
          this.topLeftCornerX + 370,
          this.topLeftCornerY + 55
        );
        this.ctx.strokeText(
          "Upgrade cost of selected tower: " + this.upgradeTotal + " coins",
          this.topLeftCornerX + 370,
          this.topLeftCornerY + 85
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
          "Sell for 80% of your money back!",
          this.topLeftCornerX + 370,
          this.topLeftCornerY + 55
        );
        this.ctx.strokeText(
          "Sale price of selected towers: " + this.sellTotal + " coins",
          this.topLeftCornerX + 370,
          this.topLeftCornerY + 85
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
