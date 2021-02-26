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
			this.levelWaves = levelOneWaves;  // from 'levelEnemyWaves.json'
			this.waveTimes[0] = 5;
			this.waveTimes[1] = 10;
			this.waveTimes[2] = 20;
			this.waveTimes[3] = 30;
			this.waveTimes[4] = 50;
		}
		
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
					this.levelWaves.x, 
					this.levelWaves.y,
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