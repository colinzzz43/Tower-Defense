"use strict";

var levelOneWaves = {
  x: 200,
  y: 330,
  waves: [// wave 1, total time 15
  [{
    enemyType: "Slime",
    initialSpawnTime: 5,
    interval: 2,
    number: 5
  }], // wave 2, total time 55
  [{
    enemyType: "Slime",
    initialSpawnTime: 35,
    interval: 2,
    number: 10
  }], // wave 3, total time 80
  [{
    enemyType: "Slime",
    initialSpawnTime: 70,
    interval: 2,
    number: 5
  }, {
    enemyType: "Goblin",
    initialSpawnTime: 71,
    interval: 2,
    number: 4
  }], // wave 4, total time 110
  [{
    enemyType: "Goblin",
    initialSpawnTime: 95,
    interval: 2,
    number: 5
  }, {
    enemyType: "Slime",
    initialSpawnTime: 96,
    interval: 2,
    number: 7
  }], // wave 5, total time 110
  [{
    enemyType: "Goblin",
    initialSpawnTime: 125,
    interval: 1.5,
    number: 10
  }, {
    enemyType: "Skeleton",
    initialSpawnTime: 125,
    interval: 3,
    number: 5
  }]],
  // Time to next wave for waves 0-4.
  // To find time to next wave, next wave intialSpawnTime - current wave initialSpawnTime.
  waveTimes: [5, 30, 35, 25, 30]
}; // snow map
//TODO: change x and y so that it matches the coordinates for the start of each path

var levelTwoWaves = {
  waves: [// paths: clockwise 1-5
  // wave 1: easy; paths 4 & 5
  [// path 4
  {
    enemyType: "Goblin",
    initialSpawnTime: 5,
    interval: 4,
    number: 5,
    x: 0,
    y: 0
  }, // path 5
  {
    enemyType: "Slime",
    initialSpawnTime: 5,
    interval: 2,
    number: 8,
    x: 0,
    y: 0
  }], // wave 2: moderate; paths 1, 3, 5		
  [// path 1
  {
    enemyType: "Slime",
    initialSpawnTime: 35,
    interval: 2,
    number: 8,
    x: 0,
    y: 0
  }, {
    enemyType: "Goblin",
    initialSpawnTime: 35,
    interval: 3,
    number: 5,
    x: 0,
    y: 0
  }, // path 3
  {
    enemyType: "Slime",
    initialSpawnTime: 37,
    interval: 2,
    number: 8,
    x: 0,
    y: 0
  }, {
    enemyType: "Skeleton",
    initialSpawnTime: 37,
    interval: 3,
    number: 2,
    x: 0,
    y: 0
  }, // path 5
  {
    enemyType: "Goblin",
    initialSpawnTime: 39,
    interval: 3,
    number: 3,
    x: 0,
    y: 0
  }, {
    enemyType: "Skeleton",
    initialSpawnTime: 39,
    interval: 3,
    number: 3,
    x: 0,
    y: 0
  }], // wave 3: easy; paths 2, 3
  [// path 2
  {
    enemyType: "Slime",
    initialSpawnTime: 70,
    interval: 1.5,
    number: 10,
    x: 0,
    y: 0
  }, // path 3
  {
    enemyType: "Slime",
    initialSpawnTime: 73,
    interval: 1.5,
    number: 10,
    x: 0,
    y: 0
  }], // wave 4: moderate; 2 & 4 first, 3 & 5 second
  [// path 2
  {
    enemyType: "Flying Eye",
    initialSpawnTime: 110,
    interval: 3,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Slime",
    initialSpawnTime: 113,
    interval: 5,
    number: 3,
    x: 0,
    y: 0
  }, // path 4
  {
    enemyType: "Flying Eye",
    initialSpawnTime: 110,
    interval: 3,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Slime",
    initialSpawnTime: 115,
    interval: 7,
    number: 2,
    x: 0,
    y: 0
  }, // path 3
  {
    enemyType: "Skeleton",
    initialSpawnTime: 128,
    interval: 3,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Slime",
    initialSpawnTime: 130,
    interval: 4,
    number: 3,
    x: 0,
    y: 0
  }, // path 5
  {
    enemyType: "Goblin",
    initialSpawnTime: 128,
    interval: 2,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Slime",
    initialSpawnTime: 129,
    interval: 1,
    number: 6,
    x: 0,
    y: 0
  }], // wave 5: difficult; all paths
  [// path 1
  {
    enemyType: "Slime",
    initialSpawnTime: 170,
    interval: 1,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Skeleton",
    initialSpawnTime: 176,
    interval: 2,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Flying Eye",
    initialSpawnTime: 184,
    interval: 2,
    number: 6,
    x: 0,
    y: 0
  }, // path 2
  {
    enemyType: "Slime",
    initialSpawnTime: 170,
    interval: 1,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Skeleton",
    initialSpawnTime: 176,
    interval: 2,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Flying Eye",
    initialSpawnTime: 184,
    interval: 2,
    number: 6,
    x: 0,
    y: 0
  }, // path 3 
  {
    enemyType: "Slime",
    initialSpawnTime: 170,
    interval: 1,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Goblin",
    initialSpawnTime: 176,
    interval: 2,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Flying Eye",
    initialSpawnTime: 184,
    interval: 2,
    number: 6,
    x: 0,
    y: 0
  }, // path 4
  {
    enemyType: "Slime",
    initialSpawnTime: 170,
    interval: 1,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Skeleton",
    initialSpawnTime: 176,
    interval: 2,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Flying Eye",
    initialSpawnTime: 184,
    interval: 2,
    number: 6,
    x: 0,
    y: 0
  }, // path 5
  {
    enemyType: "Slime",
    initialSpawnTime: 170,
    interval: 1,
    number: 6,
    x: 0,
    y: 0
  }, {
    enemyType: "Goblin",
    initialSpawnTime: 176,
    interval: 2,
    number: 4,
    x: 0,
    y: 0
  }, {
    enemyType: "Flying Eye",
    initialSpawnTime: 184,
    interval: 2,
    number: 6,
    x: 0,
    y: 0
  }]]
};
var levelThreeWaves = {};