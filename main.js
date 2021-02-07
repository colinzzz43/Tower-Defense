var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/other/coin2.png");

//queue download

// map
ASSET_MANAGER.queueDownload("./Level/map_prototype.png");

// enemies
ASSET_MANAGER.queueDownload("./sprites/monster/slime/slime1_front.png");

// towers + base
ASSET_MANAGER.queueDownload("./sprites/other/base.png");
ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level1/pistol-tower-sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level1/tower_pistol_up.png");

// bullets
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
  var pistolTowerIcon = ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level1/tower_pistol_up.png");
  var towerIcon = new TowerIcon(gameEngine, pistolTowerIcon, 30, 620, 16, 37, ctx, level);
  var base = new Base(gameEngine, 810, 270);
  var Scene = new SceneManager(gameEngine);

  gameEngine.addEntity(user);
  gameEngine.addEntity(level);
  gameEngine.addEntity(base);
  gameEngine.addEntity(towerIcon);
  gameEngine.addEntity(Scene);
  
  // enemy spawner
  let x = 80;
  let y = 330;
  let initalSpawnTime = 1;
  let interval = 2;
  let n = 25;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Slime", n);
  gameEngine.start();
});
