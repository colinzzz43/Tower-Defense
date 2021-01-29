var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./Level/map_prototype.png");

//queue download
ASSET_MANAGER.queueDownload("./sprites/monster/slime/slime1_front.png");
ASSET_MANAGER.queueDownload("./sprites/monster/slime/slime_explode.png");
ASSET_MANAGER.queueDownload("./prototpye-tower.png");

ASSET_MANAGER.downloadAll(function () {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  
  var map = ASSET_MANAGER.getAsset("./Level/map_prototype.png");
  
  var level = new Level(gameEngine, map, 0, 0, 0, 0, 600, 400, 1.5, 1, ctx);
  var enemy1 = new Slime(gameEngine, -80, 305, level);
  var enemy2 = new Slime(gameEngine, -200, 305, level);
  var enemy3 = new Slime(gameEngine, -300, 305, level);
  var enemy4 = new Slime(gameEngine, -360, 305, level);
  var enemy5 = new Slime(gameEngine, -500, 305, level);
  var enemy6 = new Slime(gameEngine, -600, 305, level);
  var enemy7 = new Slime(gameEngine, -723, 305, level);
  var enemy8 = new Slime(gameEngine, -850, 305, level);
  var enemy9 = new Slime(gameEngine, -920, 305, level);
  var enemy10 = new Slime(gameEngine, -1000, 305, level);
  
  gameEngine.init(ctx);
  gameEngine.addEntity(level);
  gameEngine.addEntity(enemy1);
  gameEngine.addEntity(enemy2);
  gameEngine.addEntity(enemy3);
  gameEngine.addEntity(enemy4);
  gameEngine.addEntity(enemy5);
  gameEngine.addEntity(enemy6);
  gameEngine.addEntity(enemy7);
  gameEngine.addEntity(enemy8);
  gameEngine.addEntity(enemy9);
  gameEngine.addEntity(enemy10);
  gameEngine.start();
});
