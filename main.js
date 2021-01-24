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

  var enemy = new Slime(gameEngine, 20, 400);
  var tower1 = new Tower(gameEngine, enemy, 430, 370);

  var tower2 = new Tower(gameEngine, enemy, 100, 100);
  var tower3 = new Tower(gameEngine, enemy, 900, 320);
  
  var map = ASSET_MANAGER.getAsset("./Level/map_prototype.png");
  var level = new Level(gameEngine, map, 0, 0, 0, 0, 600, 400, 1.5, 1);
  
  gameEngine.init(ctx);
  gameEngine.addEntity(level);
  gameEngine.addEntity(tower1);
  gameEngine.addEntity(tower2);
  gameEngine.addEntity(tower3);
  gameEngine.addEntity(enemy);
  gameEngine.start();
});
