var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./prototpye-tower.png");

ASSET_MANAGER.downloadAll(function () {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  var enemy = new Slime();
  var tower1 = new Tower(gameEngine, enemy, 315, 315);

  var tower2 = new Tower(gameEngine, enemy, 100, 100);

  var tower3 = new Tower(gameEngine, enemy, 600, 600);

  gameEngine.init(ctx);
  gameEngine.addEntity(tower1);
  gameEngine.addEntity(tower2);
  gameEngine.addEntity(tower3);
  gameEngine.start();
});
