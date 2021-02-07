var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/other/coin2.png");

//queue download

// map
ASSET_MANAGER.queueDownload("./Level/map_prototype.png");

// enemies
ASSET_MANAGER.queueDownload("./sprites/monster/slime/slime1_front.png"); // slime
ASSET_MANAGER.queueDownload("./sprites/monster/goblin/Attack.png"); // goblin
ASSET_MANAGER.queueDownload("./sprites/monster/goblin/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/goblin/Run.png");
ASSET_MANAGER.queueDownload("./sprites/monster/goblin/Take Hit.png");
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Attack.png"); // skeleton
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Walk.png");
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Take Hit.png");
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Attack.png"); // flying eye
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Flight.png");
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Take Hit.png");
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Attack.png"); // mushroom
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Run.png");
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Take Hit.png");
ASSET_MANAGER.queueDownload("./sprites/monster/dragons/flying_dragon-gold.png"); // dragon
ASSET_MANAGER.queueDownload("./sprites/monster/dragons/flying_dragon-red.png");
ASSET_MANAGER.queueDownload("./sprites/monster/dragons/flying_twin_headed_dragon-blue.png");
ASSET_MANAGER.queueDownload("./sprites/monster/dragons/flying_twin_headed_dragon-red.png");

// towers + base
ASSET_MANAGER.queueDownload("./sprites/other/base.png");
ASSET_MANAGER.queueDownload("./sprites/towers/cannon/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/flamethrower/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/laser/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/matter/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/mg/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/rocket/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/shotgun/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/spazer/Level1/1_sheet.png");


// tower icons
ASSET_MANAGER.queueDownload("./sprites/towers/cannon/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/flamethrower/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/laser/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/matter/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/mg/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/rocket/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/shotgun/Level1/1_left.png");
ASSET_MANAGER.queueDownload("./sprites/towers/spazer/Level1/1_left.png");





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

  // tower icon buttons
  var pistolImage = ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level1/1_left.png");
  var mgImage = ASSET_MANAGER.getAsset("./sprites/towers/mg/Level1/1_left.png");
  var shotgunImage = ASSET_MANAGER.getAsset("./sprites/towers/shotgun/Level1/1_left.png");
  var cannonImage = ASSET_MANAGER.getAsset("./sprites/towers/cannon/Level1/1_left.png");
  var flamethrowerImage = ASSET_MANAGER.getAsset("./sprites/towers/flamethrower/Level1/1_left.png");
  var laserImage = ASSET_MANAGER.getAsset("./sprites/towers/laser/Level1/1_left.png");
  var matterImage = ASSET_MANAGER.getAsset("./sprites/towers/matter/Level1/1_left.png");
  var rocketImage = ASSET_MANAGER.getAsset("./sprites/towers/rocket/Level1/1_left.png");
  var spazerImage = ASSET_MANAGER.getAsset("./sprites/towers/spazer/Level1/1_left.png");

  var pistolIcon = new TowerIcon(gameEngine, "Pistol", pistolImage, 30, 620, 16, 37, ctx, level);
  var mgIcon = new TowerIcon(gameEngine, "MG", mgImage, 130, 620, 24, 40, ctx, level);
  var shotgunIcon = new TowerIcon(gameEngine, "Shotgun", shotgunImage, 230, 620, 22, 34, ctx, level);
  var cannonIcon = new TowerIcon(gameEngine, "Cannon", cannonImage, 330, 620, 24, 40, ctx, level);
  var flamethrowerIcon = new TowerIcon(gameEngine, "Flamethrower", flamethrowerImage, 430, 620, 33, 36, ctx, level);
  var laserIcon = new TowerIcon(gameEngine, "Laser", laserImage, 530, 620, 24, 40, ctx, level);
  var matterIcon = new TowerIcon(gameEngine, "Matter", matterImage, 630, 620, 24, 40, ctx, level);
  var rocketIcon = new TowerIcon(gameEngine, "Rocket", rocketImage, 730, 620, 24, 40, ctx, level);
  var spazerIcon = new TowerIcon(gameEngine, "Spazer", spazerImage, 830, 620, 24, 40, ctx, level);


  var base = new Base(gameEngine, 810, 270);
  var Scene = new SceneManager(gameEngine);

  gameEngine.addEntity(user);
  gameEngine.addEntity(level);
  gameEngine.addEntity(base);

  gameEngine.addEntity(pistolIcon);
  gameEngine.addEntity(mgIcon);
  gameEngine.addEntity(shotgunIcon);
  gameEngine.addEntity(cannonIcon);
  gameEngine.addEntity(flamethrowerIcon);
  gameEngine.addEntity(laserIcon);
  gameEngine.addEntity(matterIcon);
  gameEngine.addEntity(rocketIcon);
  gameEngine.addEntity(spazerIcon);

  gameEngine.addEntity(Scene);
  
  // enemy spawner
  let x = 80;
  let y = 330;
  let initalSpawnTime = 1;
  let interval = 2;
  let n = 2;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Slime", n);

   x = 80;
   y = 330;
   initalSpawnTime = 5;
   interval = 2;
   n = 2;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Flying Eye", n);

   x = 80;
   y = 330;
   initalSpawnTime = 10;
   interval = 2;
   n = 2;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Mushroom", n);

   x = 80;
   y = 330;
   initalSpawnTime = 15;
   interval = 2;
   n = 2;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Skeleton", n);

   x = 80;
   y = 330;
   initalSpawnTime = 20;
   interval = 2;
   n = 2;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Goblin", n);

   x = 80;
   y = 330;
   initalSpawnTime = 25;
   interval = 2;
   n = 2;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Dragon", n);
  gameEngine.start();
});
