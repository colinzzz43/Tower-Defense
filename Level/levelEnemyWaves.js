// NOTE: had to change to js file as browser could not identify more than one objects in json
var levelOneWaves = {

	
	waves: [

		// wave 1, total time 15
		[
			{enemyType: "Slime", initialSpawnTime: 5, interval: 2, number: 5, x: 200, y: 390}
		], 

		// wave 2, total time 55
		[
			{enemyType: "Slime", initialSpawnTime: 35, interval: 2, number: 10, x: 200, y: 390}
		], 
		
		// wave 3, total time 80
		[
			{enemyType: "Slime", initialSpawnTime: 70, interval: 2, number: 5, x: 200, y: 390}, 
			{enemyType: "Goblin", initialSpawnTime: 71, interval: 2, number: 4, x: 200, y: 390}
		],

		// wave 4, total time 110
		[
			{enemyType: "Goblin", initialSpawnTime: 95, interval: 2, number: 5, x: 200, y: 390}, 
			{enemyType: "Slime", initialSpawnTime: 96, interval: 2, number: 7, x: 200, y: 390}
		],

		// wave 5, total time 110
		[
			{enemyType: "Goblin", initialSpawnTime: 125, interval: 1.5, number: 10, x: 200, y: 390}, 
			{enemyType: "Skeleton", initialSpawnTime: 125, interval: 3, number: 5, x: 200, y: 390}
		]
	
	],

	// Time to next wave for waves 0-4.
	// To find time to next wave, next wave intialSpawnTime - current wave initialSpawnTime.
	waveTimes: [5, 30, 35, 25, 30]
	
};

// snow map
//TODO: change x and y so that it matches the coordinates for the start of each path
var levelTwoWaves = {
	waves: [
		
		// paths: clockwise 1-5
		// wave 1: easy; paths 4 & 5	Time: 5-20
		[
			// path 4
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 4, number: 5, x: 0, y: 0},

			// path 5
			{enemyType: "Slime", initialSpawnTime: 5, interval: 2, number: 8, x: 0, y: 0}

		],

		// wave 2: moderate; paths 1, 3, 5	Time: 35-53	
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 35, interval: 2, number: 8, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 35, interval: 3, number: 5, x: 0, y: 0},
			
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 37, interval: 2, number: 8, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 37, interval: 3, number: 2, x: 0, y: 0},
			
			// path 5
			{enemyType: "Goblin", initialSpawnTime: 39, interval: 3, number: 3, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 39, interval: 3, number: 3, x: 0, y: 0}

		],

		// wave 3: easy; paths 2, 3		Time: 70-88
		[
			// path 2
			{enemyType: "Slime", initialSpawnTime: 70, interval: 1.5, number: 10, x: 0, y: 0},
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 73, interval: 1.5, number: 10, x: 0, y: 0}
		],

		// wave 4: moderate; 2 & 4 first, 3 & 5 second	Time: 110-142
		[
			// path 2
			{enemyType: "Flying Eye", initialSpawnTime: 110, interval: 3, number: 6, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 113, interval: 5, number: 3, x: 0, y: 0},

			// path 4
			{enemyType: "Flying Eye", initialSpawnTime: 110, interval: 3, number: 6, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 115, interval: 7, number: 2, x: 0, y: 0},

			// path 3
			{enemyType: "Skeleton", initialSpawnTime: 128, interval: 3, number: 4, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 130, interval: 4, number: 3, x: 0, y: 0},

			// path 5
			{enemyType: "Goblin", initialSpawnTime: 128, interval: 2, number: 4, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 129, interval: 1, number: 6, x: 0, y: 0},
		],

		// wave 5: difficult; all paths		Time: 170-196
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 176, interval: 2, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 0, y: 0},

			// path 2
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 176, interval: 2, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 0, y: 0},

			// path 3 
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 176, interval: 2, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 0, y: 0},

			// path 4
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 176, interval: 2, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 0, y: 0},
			
			// path 5
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 176, interval: 2, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 0, y: 0}
		]
	],

	waveTimes: [
		
	]
};

// desert map
var levelThreeWaves = {

	waves: [
		
		// paths: clockwise 1-8
		// wave 1: easy; paths 3, 4, 7, 8	Time: 5-45
		[
			// path 3
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 0, y: 0},

			// path 4
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 0, y: 0},

			// path 7
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 0, y: 0},

			// path 8
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 0, y: 0},

		],

		// wave 2: moderate; paths 1 & 2 , 7 & 8 then 3 & 4 , 5 & 6		Time: 65-90	
		[

			// paths 1 & 2	Time: 55-80
			{enemyType: "Skeleton", initialSpawnTime: 65, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 70, interval: 2.5, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 5, number: 5, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 0, y: 0},

			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 70, interval: 2.5, number: 4, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 65, interval: 5, number: 5, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 0, y: 0},
			
			// paths 7 & 8
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 70, interval: 2.5, number: 4, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 65, interval: 5, number: 5, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 0, y: 0},
			
			{enemyType: "Skeleton", initialSpawnTime: 65, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 70, interval: 2.5, number: 4, x: 0, y: 0},
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 5, number: 5, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 0, y: 0},

			// after paths 1 & 2 , 7 & 8 are done
			// paths 3 & 4	Time: 70-90
			{enemyType: "Flying Eye", initialSpawnTime: 70, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 72, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 74, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 77, interval: 1, number: 2, x: 0, y: 0},

			{enemyType: "Skeleton", initialSpawnTime: 73, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 75, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 70, interval: 5, number: 2, x: 0, y: 0},
			
			// paths 5 & 7
			{enemyType: "Flying Eye", initialSpawnTime: 70, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 72, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 74, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 77, interval: 1, number: 2, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 70, interval: 5, number: 2, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 72, interval: 8, number: 2, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 73, interval: 5, number: 2, x: 0, y: 0},
			
		],

		// wave 3: easy; paths 1, 3, 5, 7 sequentially	Time: 110-130
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 110, interval: 2, number: 6, x: 0, y: 0},

			// path 3
			{enemyType: "Slime", initialSpawnTime: 112, interval: 2, number: 6, x: 0, y: 0},

			// path 5
			{enemyType: "Slime", initialSpawnTime: 114, interval: 2, number: 6, x: 0, y: 0},

			// path 7
			{enemyType: "Slime", initialSpawnTime: 116, interval: 2, number: 6, x: 0, y: 0},
		],

		// wave 4: moderate; random 5 on paths 3-8	Time: 150-170
		[
			// path 2
			{enemyType: "Flying Eye", initialSpawnTime: 150, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 158, interval: 2, number: 5, x: 0, y: 0},

			// path 7
			{enemyType: "Skeleton", initialSpawnTime: 152, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 154, interval: 2, number: 5, x: 0, y: 0},

			// path 1
			{enemyType: "Mushroom", initialSpawnTime: 154, interval: 2, number: 2, x: 0, y: 0},

			// path 4
			{enemyType: "Goblin", initialSpawnTime: 156, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Slime", initialSpawnTime: 160, interval: 2, number: 5, x: 0, y: 0},

			// path 3
			{enemyType: "Flying Eye", initialSpawnTime: 158, interval: 2, number: 5, x: 0, y: 0},
			{enemyType: "Mushroom", initialSpawnTime: 154, interval: 2, number: 2, x: 0, y: 0},

			// path 5
			{enemyType: "Skeleton", initialSpawnTime: 160, interval: 2, number: 3, x: 0, y: 0},
		],

		// wave 5: difficult; sequential clockwise, then mushrooms all rush in	Time: 190-217
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 190, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 195, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 200, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},

			// path 2
			{enemyType: "Slime", initialSpawnTime: 191, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 196, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 201, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},


			// path 3
			{enemyType: "Slime", initialSpawnTime: 192, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 197, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 202, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},


			// path 4
			{enemyType: "Slime", initialSpawnTime: 193, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 198, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 203, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},


			// path 5
			{enemyType: "Slime", initialSpawnTime: 194, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 199, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 204, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},


			// path 6
			{enemyType: "Slime", initialSpawnTime: 195, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 200, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 205, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},


			// path 7 
			{enemyType: "Slime", initialSpawnTime: 196, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 201, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 206, interval: 1, number: 5, x: 0, y: 0},

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},


			// path 8
			{enemyType: "Slime", initialSpawnTime: 197, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Goblin", initialSpawnTime: 202, interval: 1, number: 5, x: 0, y: 0},
			{enemyType: "Skeleton", initialSpawnTime: 207, interval: 1, number: 5, x: 0, y: 0},	

			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 0, y: 0},

		]
	],

	waveTimes: []
}

// grass map: skeleton, flying eye, mushroom, dragon
var levelFourWaves = {
	waves: [],
	waveTimes: []
}