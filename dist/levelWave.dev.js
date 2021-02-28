"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LevelWave =
/*#__PURE__*/
function () {
  function LevelWave(level) {
    _classCallCheck(this, LevelWave);

    Object.assign(this, {
      level: level
    });
    this.levelWaves = null;
    this.waveTimes = [];
    this.initializeWaves();
  }

  _createClass(LevelWave, [{
    key: "initializeWaves",

    /*
    	Initialize the enemy waves for the level.
    	Use tuples from a JSON file called 'levelEnemyWaves.json'		
    */
    value: function initializeWaves() {
      if (this.level.mapLevel === 1) {
        this.levelWaves = levelOneWaves; // from 'levelEnemyWaves.json'

        this.waveTimes = levelOneWaves.waveTimes;
      }

      this.spawnEnemies();
    }
  }, {
    key: "spawnEnemies",

    /*
    	Begin spawning the enemies for this level
    */
    value: function spawnEnemies() {
      for (var i = 0; i < this.levelWaves.waves.length; i++) {
        for (var j = 0; j < this.levelWaves.waves[i].length; j++) {
          addEnemySpawn(this.level.gameEngine, this.levelWaves.waves[i][j].x, this.levelWaves.waves[i][j].y, this.level, this.levelWaves.waves[i][j].initialSpawnTime, this.levelWaves.waves[i][j].interval, this.levelWaves.waves[i][j].enemyType, this.levelWaves.waves[i][j].number);
        }
      }
    }
  }]);

  return LevelWave;
}();