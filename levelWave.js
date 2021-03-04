class LevelWave {
 
	constructor(level) {
			
		Object.assign( this, {level} );
		this.levelWaves = null;
		this.waveTimes = [];
		this.initializeWaves();
		
	};
	
	/*
		Initialize the enemy waves for the level.
		Use tuples from a JSON file called 'levelEnemyWaves.json'		
	*/
	initializeWaves() {
		if (this.level.mapLevel === 1) {
			this.levelWaves = levelOneWaves;  // from 'levelEnemyWaves.js'
		} else if (this.level.mapLevel = 2) {
			this.levelWaves = levelTwoWaves;  // from 'levelEnemyWaves.js'		
		} else if (this.level.mapLevel = 3) {
			this.levelWaves = levelThreeWaves;  // from 'levelEnemyWaves.js'		
		} else {
			this.levelWaves = levelFourWaves;  // from 'levelEnemyWaves.js'			
		}
		
		this.waveTimes = levelOneWaves.waveTimes;
		this.spawnEnemies();	
	};
	
	/*
		Begin spawning the enemies for this level
	*/
	spawnEnemies() {
		for (var i = 0; i < this.levelWaves.waves.length; i++) {
			for (var j = 0; j < this.levelWaves.waves[i].length; j++) {
				addEnemySpawn(
					this.level.gameEngine, 
					this.levelWaves.waves[i][j].x, 
					this.levelWaves.waves[i][j].y,
					this.levelWaves.waves[i][j].direction,
					this.level,
					this.levelWaves.waves[i][j].initialSpawnTime,
					this.levelWaves.waves[i][j].interval,
					this.levelWaves.waves[i][j].enemyType,
					this.levelWaves.waves[i][j].number
				);
			}
		}
	};
}