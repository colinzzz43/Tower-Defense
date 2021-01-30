var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./Level/map_prototype.png");

//queue download
ASSET_MANAGER.queueDownload("./sprites/monster/slime/slime1_front.png");
ASSET_MANAGER.queueDownload("./sprites/other/base.png");
ASSET_MANAGER.queueDownload("./prototype-tower.png");
ASSET_MANAGER.queueDownload("./Level/map_prototype.png");
ASSET_MANAGER.queueDownload("./sprites/other/bullet_tomato.png");
ASSET_MANAGER.queueDownload("./sprites/other/bulletb.png");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

ASSET_MANAGER.downloadAll(function () {
  var canvas = document.getElementById("gameWorld");
  var ctx = canvas.getContext("2d");

  gameEngine.init(ctx);
  var user = new User(gameEngine);
  var map = ASSET_MANAGER.getAsset("./Level/map_prototype.png");
  var level = new Level(gameEngine, map, 0, 0, 0, 0, 600, 400, 1.5, 1, ctx);
  gameEngine.addEntity(level);
//  gameEngine.addEntity(new Tower(gameEngine, 90, 270));
//  gameEngine.addEntity(new Tower(gameEngine, 510, 330));
//  gameEngine.addEntity(new Tower(gameEngine, 690, 330));

  var base = new Base(gameEngine, 720, 270);
  var enemy1 = new Slime(gameEngine, -80, 330, level);
  var enemy2 = new Slime(gameEngine, -200, 330, level);
  var enemy3 = new Slime(gameEngine, -300, 330, level);
  var enemy4 = new Slime(gameEngine, -360, 330, level);
  var enemy5 = new Slime(gameEngine, -500, 330, level);
  var enemy6 = new Slime(gameEngine, -600, 330, level);
  var enemy7 = new Slime(gameEngine, -723, 330, level);
  var enemy8 = new Slime(gameEngine, -850, 330, level);
  var enemy9 = new Slime(gameEngine, -920, 330, level);
  var enemy10 = new Slime(gameEngine, -1000, 330, level);
  
  gameEngine.addEntity(user);
  gameEngine.addEntity(level);
  gameEngine.addEntity(base);
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

  //gameEngine.addEntity(new Slime(gameEngine, 10, 350));
  gameEngine.start();
});
