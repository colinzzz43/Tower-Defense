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
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Attack.png"); // skeleton
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/skeleton/Walk.png");
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Attack.png"); // flying eye
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/flyingeye/Flight.png");
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Attack.png"); // mushroom
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Death.png");
ASSET_MANAGER.queueDownload("./sprites/monster/mushroom/Run.png");
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
ASSET_MANAGER.queueDownload("./sprites/other/bulletb.png"); // pistol & shotgun
ASSET_MANAGER.queueDownload("./sprites/other/bulletc.png");
ASSET_MANAGER.queueDownload("./sprites/other/flamethrower_bullet.png");
ASSET_MANAGER.queueDownload("./sprites/other/shockwave.png"); // matter ray
ASSET_MANAGER.queueDownload("./sprites/other/mine1.png"); // spazer ray

ASSET_MANAGER.queueDownload("./sprites/other/cannonball.png");
ASSET_MANAGER.queueDownload("./sprites/other/rocket.png");
ASSET_MANAGER.queueDownload("./sprites/other/laserbullet.png");
ASSET_MANAGER.queueDownload("./sprites/other/bullet_tomato.png");

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
  ctx.imageSmoothingEnabled = false;
  
  gameEngine.init(ctx);
  var user = new User(gameEngine);
  var map = ASSET_MANAGER.getAsset("./Level/map_prototype.png");
  var level = new Level(gameEngine, map, 0, 0, 0, 0, 600, 400, 1.5, 1, ctx);

  // tower icon buttons
  var towerIconImages = [];
  var pistolImage = ASSET_MANAGER.getAsset("./sprites/towers/pistol/Level1/1_left.png");
  towerIconImages.push(pistolImage);
  var mgImage = ASSET_MANAGER.getAsset("./sprites/towers/mg/Level1/1_left.png");
  towerIconImages.push(mgImage);
  var shotgunImage = ASSET_MANAGER.getAsset("./sprites/towers/shotgun/Level1/1_left.png");
  towerIconImages.push(shotgunImage);
  var cannonImage = ASSET_MANAGER.getAsset("./sprites/towers/cannon/Level1/1_left.png");
  towerIconImages.push(cannonImage);
  var flamethrowerImage = ASSET_MANAGER.getAsset("./sprites/towers/flamethrower/Level1/1_left.png");
  towerIconImages.push(flamethrowerImage);
  var laserImage = ASSET_MANAGER.getAsset("./sprites/towers/laser/Level1/1_left.png");
  towerIconImages.push(laserImage);
  var matterImage = ASSET_MANAGER.getAsset("./sprites/towers/matter/Level1/1_left.png");
  towerIconImages.push(matterImage);
  var rocketImage = ASSET_MANAGER.getAsset("./sprites/towers/rocket/Level1/1_left.png");
  towerIconImages.push(rocketImage);
  var spazerImage = ASSET_MANAGER.getAsset("./sprites/towers/spazer/Level1/1_left.png");
  towerIconImages.push(spazerImage);
  var towerStoreMenu = new TowerStoreMenu(gameEngine, 905, 5, towerIconImages, ctx, level);

  var base = new Base(gameEngine, 810, 270);
  var Scene = new SceneManager(gameEngine);

  gameEngine.addEntity(user);
  gameEngine.addEntity(level);
  gameEngine.addEntity(base);
  gameEngine.addEntity(towerStoreMenu);

  gameEngine.addEntity(Scene);
  
  // enemy spawner
  let x = 80;
  let y = 330;
  let initalSpawnTime = 1;
  let interval = 1;
  let n = 15;
  addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Slime", n);

  //  x = 80;
  //  y = 330;
  //  initalSpawnTime = 5;
  //  interval = 2;
  //  n = 10;
  // addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Flying Eye", n);

  //  x = 80;
  //  y = 330;
  //  initalSpawnTime = 10;
  //  interval = 2;
  //  n = 2;
  // addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Mushroom", n);

  //  x = 80;
  //  y = 330;
  //  initalSpawnTime = 15;
  //  interval = 2;
  //  n = 2;
  // addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Skeleton", n);

  //  x = 80;
  //  y = 330;
  //  initalSpawnTime = 20;
  //  interval = 2;
  //  n = 2;
  // addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Goblin", n);

  //  x = 80;
  //  y = 330;
  //  initalSpawnTime = 25;
  //  interval = 2;
  //  n = 2;
  // addEnemySpawn(gameEngine, x, y, level, initalSpawnTime, interval, "Dragon", n);
  gameEngine.start();
});
