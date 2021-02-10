class Level {
  /*
		Constructor for the Level class.
		
		Parameters: 
			@gameEngine			the game engine that uses this level object
			@mapImage 			the source file of the map level image 
			@xCanvas 			the x-coordinate in canvas where top left corner of map will be drawn
			@yCanvas 			the y-coordinate in canvas where top left corner of map will be drawn
			@topLeftCornerX 	the x-coordinate of image to begin drawing from
			@topLeftCornerY 	the y-coordinate of image to begin drawing from
			@mapWidth 			the width in pixels from topLeftCornerX of the image to draw
			@mapHeight 			the height in pixels from topLeftCornerY of the image to draw
			@drawScale 			the scaling of how the image on canvas is drawn
			@mapLevel 			the numerical level of the image map
			@ctx 				the canvas that this level map image will be applied to
	*/
  constructor(
    gameEngine,
    mapImage,
    xCanvas,
    yCanvas,
    topLeftCornerX,
    topLeftCornerY,
    mapWidth,
    mapHeight,
    drawScale,
    mapLevel,
    ctx
  ) {
    Object.assign(this, {
      gameEngine,
      mapImage,
      xCanvas,
      yCanvas,
      topLeftCornerX,
      topLeftCornerY,
      mapWidth,
      mapHeight,
      drawScale,
      mapLevel,
      ctx,
    });

    // Apply game engine
    this.gameEngine.level = this;

    // Initialize terrain map grid for this level
    this.terrainGridTiles = new LevelTerrainMap(this);

    // Switch to turn on (true) and off (false) the visual grid map
    this.showGridMap = false;

    // Apply mouse click interaction of tiles to this level
    this.mouseInteraction();
    this.mouseHighlightedTile = {
      row: -1,
      column: -1,
      color: "lightyellow",
      mouse: "offMap",
    };

    // Numbers labeling a specific terrain for a tile.
    this.path = 0;
    this.towerTerrainOpen = 1;
    this.towerTerrainOccupied = -1;
    this.obstacle = 2;

    // Type of tower to be placed. Modified by mouseInteraction method in TowerIcon class
    this.placeTowerType = "";

    this.user = this.gameEngine.user; // the user interacting with the tower
  }

  /*
		Update does nothing to level
	*/
  update() {
    // do nothing for now
  }

  /*
	    Used by the game engine to officially draw the level map on canvas.
	*/
  draw(ctx) {
    // draw map image itself
    this.drawMap(ctx, this.drawScale);

    // draw grid tiles on map if 'this.showGridMap' is set to true
    this.terrainGridTiles.showTileGrid(this.showGridMap, ctx, this.drawScale);

    // draw highlight on tile that the mouse cursor is currently over
    this.terrainGridTiles.drawTileHighlight(
      this.mouseHighlightedTile.row,
      this.mouseHighlightedTile.column,
      this.mouseHighlightedTile.color,
      this.mouseHighlightedTile.mouse
    );
  }

  /*
		Draw the graphical image of the level map.
		
		Parameters: 
		@ctx		the ID of the canvas that the map will be drawn on
		@scale		the scaling of the width and height of the image drawn on canvas
	*/
  drawMap(ctx, scale) {
    ctx.drawImage(
      this.mapImage,
      this.topLeftCornerX,
      this.topLeftCornerY,
      this.mapWidth,
      this.mapHeight,
      this.xCanvas,
      this.yCanvas,
      this.mapWidth * scale,
      this.mapHeight * scale
    );
  }

  /* 
		Get the terrain type that is assigned to a specified grid tile.
		
		Parameters:
		@row		the row number for the desired tile 
		@column		the column number for the desired tile
	*/
  getTerrainType(row, column) {
    var tile = this.terrainGridTiles.getTile(row, column);
    if (tile === this.towerTerrainOpen) {
      return "towerTerrainOpen";
    } else if (tile === this.towerTerrainOccupied) {
      return "towerTerrainOccupied";
    } else if (tile === this.path) {
      return "path";
    } else if (tile === this.obstacle) {
      return "obstacle";
    } else {
      return "not_a_tile_on_grid";
    }
  }

  /*
		Set a specific tile, if it is tower terrain, to either occupied (-1) or unoccupied (1)
		
		Parameters:   
		@row		the row of the tile whose occupancy state is to be set.
		@column		the column of the tile whose occupancy state is to be set.
	*/
  changeStateOfTowerTerrain(row, column) {
    var tile = this.terrainGridTiles.getTile(row, column);
    if (tile !== this.towerTerrainOpen) {
      if (tile === this.towerTerrainOccupied) {
        this.terrainGridTiles.setTile(row, column, this.towerTerrainOpen);
      }
    } else {
      this.terrainGridTiles.setTile(row, column, this.towerTerrainOccupied);
    }
    // console.log(this.terrainGridTiles.getMapArray());
  }

  /*
		Apply a mouse click interaction to the level map image
	*/
  mouseInteraction() {
    var that = this;

    // Get x,y coordinates of canvas where mouse pointer is
    var getXandY = function (e) {
      var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
      var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

      return { x: x, y: y };
    };

    // Add mouse click event listener that enables mouse user to place towers via clicking tiles on this level map, and highlight the clicked tiles a specific color: green if tower is successuful placed, red if otherwise
    that.ctx.canvas.addEventListener(
      "click",
      function (e) {
        var canvasCoordinates = getXandY(e);
        var tileSideLength = that.getTilePixelImageSize();
        var x = canvasCoordinates.x;
        var y = canvasCoordinates.y;
        var row = Math.floor(y / tileSideLength);
        var column = Math.floor(x / tileSideLength);
        var canvasWidth = that.drawScale * that.mapWidth;
        var canvasHeight = that.drawScale * that.mapHeight;
        if (
          x >= that.xCanvas &&
          x < that.xCanvas + canvasWidth &&
          y >= that.yCanvas &&
          y < that.yCanvas + canvasHeight &&
          that.showGridMap
        ) {
          if (
            that.terrainGridTiles.getTile(row, column) ===
              that.towerTerrainOpen &&
            that.showGridMap
          ) {
            that.placeTower(row, column);
            that.mouseHighlightedTile = {
              row: row,
              column: column,
              color: "lawngreen",
              mouse: "onMap",
            };
          } else {
            that.mouseHighlightedTile = {
              row: row,
              column: column,
              color: "red",
              mouse: "onMap",
            };
          }
        }
      },
      false
    );

    // Add mouse move event listener that enables mouse user to highlight a terrain tile via moving over it on this level map
    that.ctx.canvas.addEventListener(
      "mousemove",
      function (e) {
        var canvasCoordinates = getXandY(e);
        var tileSideLength = that.getTilePixelImageSize();
        var x = canvasCoordinates.x;
        var y = canvasCoordinates.y;
        var row = Math.floor(y / tileSideLength);
        var column = Math.floor(x / tileSideLength);
        var canvasWidth = that.drawScale * that.mapWidth;
        var canvasHeight = that.drawScale * that.mapHeight;
        if (
          x >= that.xCanvas &&
          x < that.xCanvas + canvasWidth &&
          y >= that.yCanvas &&
          y < that.yCanvas + canvasHeight &&
          that.showGridMap
        ) {
          that.mouseHighlightedTile = {
            row: row,
            column: column,
            color: "white",
            mouse: "onMap",
          };
        } else {
          that.mouseHighlightedTile = {
            row: row,
            column: column,
            color: "white",
            mouse: "offMap",
          };
        }
      },
      false
    );

    // Add mouse out event listener that enables level to un-highlight any tile the mouse cursor last moved over when the cursor moved outside the level boundaries
    that.ctx.canvas.addEventListener(
      "mouseout",
      function (e) {
        var canvasCoordinates = getXandY(e);
        that.mouseHighlightedTile = {
          row: 0,
          column: 0,
          color: "white",
          mouse: "offMap",
        };
      },
      false
    );
  }

  /*
		Add a new tower entity to the level map grid and the game engine itself
		
		Parameters: 
		@row		the row of the tile grid where new tower will be placed
		@column		the column of the tile grid where new tower will be placed
	*/
  placeTower(row, column) {
    var xTower = column * 40 * this.drawScale;
    var yTower = row * 40 * this.drawScale;
    var xOffset = 20 * this.drawScale;
    var yOffset = 20 * this.drawScale;
    switch (this.placeTowerType) {
      case "Pistol":
        if (this.enoughPurchasePower(Pistol.cost)) {
          var newTower = new Pistol(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "MG":
        if (this.enoughPurchasePower(MG.cost)) {
          var newTower = new MG(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Shotgun":
        if (this.enoughPurchasePower(Shotgun.cost)) {
          var newTower = new Shotgun(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Cannon":
        if (this.enoughPurchasePower(Cannon.cost)) {
          var newTower = new Cannon(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Flamethrower":
        if (this.enoughPurchasePower(Flamethrower.cost)) {
          var newTower = new Flamethrower(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Laser":
        if (this.enoughPurchasePower(Laser.cost)) {
          var newTower = new Laser(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Matter":
        if (this.enoughPurchasePower(Matter.cost)) {
          var newTower = new Matter(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Rocket":
        if (this.enoughPurchasePower(Rocket.cost)) {
          var newTower = new Rocket(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
      case "Spazer":
        if (this.enoughPurchasePower(Spazer.cost)) {
          var newTower = new Spazer(
            this.gameEngine,
            xTower + xOffset,
            yTower + yOffset,
            this
          );
        }
        break;
    }
    if (newTower) {
      this.gameEngine.addEntity(newTower);
      this.changeStateOfTowerTerrain(row, column);
    }
  }

  /*
    Check balance before placing the towers
  */
  enoughPurchasePower(cost) {
    console.log("Balance is: ", this.user.balance, " and it costs: ", cost);
    if (this.user.balance >= cost) return true;
    else return false;
  }

  /*
		Return the tile grid that this level uses
	*/
  getGrid() {
    return this.terrainGridTiles;
  }

  /*
		Return the pixel length of a square tile as drawn to scale on the canvas
	*/
  getTilePixelImageSize() {
    return (
      this.terrainGridTiles.getSquareTileSidePixelLength() * this.drawScale
    );
  }
}

class LevelTerrainMap {
  /*
		Constructor for the LevelTerrainMap
		
		Parameters:
		@level		the level itself that this new terrain tile map will be put on
	*/
  constructor(level) {
    Object.assign(this, { level });
    this.mapArray = null;
    this.numOfTileRows = null;
    this.numOfTileColumns = null;
    this.squareTileSidePixelLength = null;
    this.squareTileBorderPixelWeight = null;
    this.destinationTile = null;
    this.initializeGridMap();
    // console.log(this.mapArray);

    this.path = 0;
    this.towerTerrainOpen = 1;
    this.towerTerrainOccupied = -1;
    this.obstacle = 2;
  }

  /*
		Create a pre-defined 2D array representing the terrain makeup of a level map.
	*/
  initializeGridMap() {
    if (this.level.mapLevel === 1) {
      this.levelOneMap();
    }
  }

  /*
		Creates a 2D-array pre-defined for the first level
	*/
  levelOneMap() {
    this.numOfTileRows = 10;
    this.numOfTileColumns = 15;
    this.squareTileSidePixelLength = 40;
    this.squareTileBorderPixelWeight = 1;
    this.destinationTile = { row: 4, column: 14 };

    // edited map array: filled Base's 3x3 grid location with path values (0's)
    // to disallow tower placement but allow enemies to reach base.
    this.mapArray = [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 2, 2, 2],
      [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 2, 2],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1],
    ];
  }

  /*
		Return the 2D terrain map array
	*/
  getMapArray() {
    return this.mapArray;
  }

  /*
		Get the number of rows of the 2D terrain array
	*/
  getNumOfRows() {
    return this.numOfTileRows;
  }

  /*
		Get the number of columns of the 2D terrain array
	*/
  getNumOfColumns() {
    return this.numOfTileColumns;
  }

  /*
		Return the value of a specific tile of the 2D terrain map array
		
		Parameters: 
		@row		the row number of the tile
		@column		the column number of the tile
	*/
  getTile(row, column) {
    if (
      row >= 0 &&
      row < this.getNumOfRows() &&
      column >= 0 &&
      column < this.getNumOfColumns()
    ) {
      return this.mapArray[row][column];
    } else {
      return "off_grid";
    }
  }

  /*
		Set the value of a specific tile of the 2D terrain map array
		
		Parameters: 
		@row			the row number of the tile, 
		@column			the column number of the tile, 
		@newValue		the new value of the specified tile
	*/
  setTile(row, column, newValue) {
    if (
      row >= 0 &&
      row < this.getNumOfRows() &&
      column >= 0 &&
      column < this.getNumOfColumns()
    ) {
      this.mapArray[row][column] = newValue;
    }
  }

  /*
		Return the tile that is marked the destination tile on this tile grid
	*/
  getDestination() {
    return this.destinationTile;
  }

  /*
		Return the pixel length of the side of the grid tile
	*/
  getSquareTileSidePixelLength() {
    return this.squareTileSidePixelLength;
  }

  /*
		Turn on or turn off the tile grid map that highlights the terrain tiles of the map
		
		Parameter:	
		@visible	the boolean that determines if the grid map is on (if true) or off (if false)
	*/
  showTileGrid(visible) {
    if (visible === true) {
      var square = this.squareTileSidePixelLength * this.level.drawScale;
      this.level.ctx.beginPath();
      this.level.ctx.setLineDash([]);
      this.level.ctx.lineWidth =
        this.squareTileBorderPixelWeight * this.level.drawScale;
      this.level.ctx.strokeStyle = "gold";
      for (var i = 0; i < this.numOfTileRows; i++) {
        for (var j = 0; j < this.numOfTileColumns; j++) {
          this.level.ctx.strokeRect(j * square, i * square, square, square);
        }
      }
      this.level.ctx.lineWidth = 1;
      this.level.ctx.strokeStyle = "black";
      this.level.ctx.closePath();
    }
  }

  /*
		Draw a transparent square of a specified color that highlights one terrain tile grid
		
		Parameters:
		@row		the row of the tile that is to be highlighted
		@column		the column of the tile that is to be highlighted
		@color		the color of the highlight
		@mouse		indication if the mouse is on ("onMap") or off ("offMap") the grid area
	*/
  drawTileHighlight(row, column, color, mouse) {
    // set stroke settings before drawing highlight
    var squarePixelSide = this.level.getTilePixelImageSize();
    this.level.ctx.beginPath();
    this.level.ctx.fillStyle = color;
    this.level.ctx.lineWidth = this.squareTileBorderPixelWeight * 3;
    this.level.ctx.strokeStyle = color;
    this.level.ctx.setLineDash([]);

    // if mouse is "onMap" then draw highlight; otherwise don't draw a highlight
    if (mouse === "onMap") {
      this.level.ctx.rect(
        column * squarePixelSide,
        row * squarePixelSide,
        squarePixelSide,
        squarePixelSide
      );
      if (color === "red") {
        // if the highlight color is red, draw an 'X' inside the red box
        this.level.ctx.moveTo(column * squarePixelSide, row * squarePixelSide);
        this.level.ctx.lineTo(
          (column + 1) * squarePixelSide,
          (row + 1) * squarePixelSide
        );
        this.level.ctx.moveTo(
          column * squarePixelSide,
          (row + 1) * squarePixelSide
        );
        this.level.ctx.lineTo(
          (column + 1) * squarePixelSide,
          row * squarePixelSide
        );
      }
    } else {
      this.level.ctx.rect(0, 0, 0, 0);
    }
    this.level.ctx.stroke();
    this.level.ctx.globalAlpha = 0.5;
    this.level.ctx.fill();

    // set stroke settings back to what they were prior to calling this method
    this.level.ctx.globalAlpha = 1;
    this.level.ctx.fillStyle = "black";
    this.level.ctx.strokeStyle = "black";
    this.level.ctx.lineWidth = 1;
    this.level.ctx.closePath();
  }
}
