var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/other/coin2.png");
ASSET_MANAGER.queueDownload("./sprites/other/heart.png");

//queue download
// transition scenes
ASSET_MANAGER.queueDownload("./sprites/title.png");
ASSET_MANAGER.queueDownload("./sprites/background.jpg");
ASSET_MANAGER.queueDownload("./sprites/levelselect/arrow.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Sell.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Upgrade.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Start.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/LevelScreen.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Level1.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Level2.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Level3.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Level4.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Gameover.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Home.png");
ASSET_MANAGER.queueDownload("./sprites/levelselect/Restart.png");

// map
ASSET_MANAGER.queueDownload("./Level/images/map_prototype.png");
ASSET_MANAGER.queueDownload("./Level/images/DesertMap.png");
ASSET_MANAGER.queueDownload("./Level/images/GrassMap.png");
ASSET_MANAGER.queueDownload("./Level/images/SnowMap.png");

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
ASSET_MANAGER.queueDownload("./sprites/towers/cannon/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/cannon/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/flamethrower/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/flamethrower/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/flamethrower/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/laser/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/laser/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/laser/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/matter/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/matter/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/matter/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/mg/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/mg/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/mg/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/pistol/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/rocket/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/rocket/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/rocket/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/shotgun/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/shotgun/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/shotgun/Level3/3_sheet.png");

ASSET_MANAGER.queueDownload("./sprites/towers/spazer/Level1/1_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/spazer/Level2/2_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/towers/spazer/Level3/3_sheet.png");

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
  var Scene = new SceneManager(gameEngine, ctx);
  gameEngine.addEntity(Scene);

  
  gameEngine.start();
});
