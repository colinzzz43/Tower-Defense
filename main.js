var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./Level/map_prototype.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	
	var map = ASSET_MANAGER.getAsset("./Level/map_prototype.png");
	var level = new Level(gameEngine, map, 0, 0, 0, 0, 600, 400, 1.5, 1);
	gameEngine.addEntity(level);

	gameEngine.start();
});
