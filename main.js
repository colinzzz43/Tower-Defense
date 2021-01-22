var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

//queue download
ASSET_MANAGER.queueDownload("./sprites/monster/slime/slime1_front.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);
	gameEngine.addEntity(new Slime(gameEngine));
	gameEngine.start();
});
