// NOTE: had to change to js file as browser could not identify more than one objects in json
var levelOneWaves = {
	
	/*		
			// Start coordinates for path
				x: 200
				y: 390
				direction: "right"
		
	*/	
	
	waves: [

		// wave 1, time interval: 5 - 35 seconds
		[			
			{enemyType: "Slime", initialSpawnTime: 5, interval: 1, number: 3, x: 200, y: 390, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 10, interval: 1, number: 3, x: 200, y: 390, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 15, interval: 1, number: 3, x: 200, y: 390, direction: "right"}			
			
		], 

		// wave 2, time interval: 35 - 70 seconds
		[
			{enemyType: "Slime", initialSpawnTime: 35, interval: 1, number: 2, x: 200, y: 390, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 38, interval: 6, number: 4, x: 200, y: 390, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 41, interval: 1, number: 2, x: 200, y: 390, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 47, interval: 1, number: 2, x: 200, y: 390, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 53, interval: 1, number: 2, x: 200, y: 390, direction: "right"}
			

		], 
		
		// wave 3, time interval: 70 - 105 seconds
		[
			{enemyType: "Slime", initialSpawnTime: 70, interval: 1, number: 3, x: 200, y: 390, direction: "right"}, 
			{enemyType: "Slime", initialSpawnTime: 76, interval: 1, number: 3, x: 200, y: 390, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 82, interval: 1, number: 3, x: 200, y: 390, direction: "right"},		
			{enemyType: "Slime", initialSpawnTime: 88, interval: 1, number: 3, x: 200, y: 390, direction: "right"},				
			
			{enemyType: "Flying Eye", initialSpawnTime: 85, interval: 3, number: 5, x: 200, y: 390, direction: "right"}
		],

		// wave 4, time interval: 105 - 140 seconds
		[
			{enemyType: "Slime", initialSpawnTime: 95, interval: 5, number: 5, x: 200, y: 390, direction: "right"}, 
			{enemyType: "Goblin", initialSpawnTime: 96, interval: 3, number: 6, x: 200, y: 390, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 100, interval: 3, number: 3, x: 200, y: 390, direction: "right"}		
		],

		// wave 5, time interval: 140 - 180 seconds
		[
			{enemyType: "Goblin", initialSpawnTime: 125, interval: 1.5, number: 10, x: 200, y: 390, direction: "right"}, 
			{enemyType: "Skeleton", initialSpawnTime: 128, interval: 3, number: 6, x: 200, y: 390, direction: "right"}
		],
		
		// wave 6 (final boss), time interval: 180+ seconds
		[
			{enemyType: "Dragon", initialSpawnTime: 160, interval: 1.5, number: 1, x: 200, y: 390, direction: "right"}
		]
	
	],

	// Time to next wave for waves 0-4.
	// To find time to next wave, next wave intialSpawnTime - current wave initialSpawnTime.
	waveTimes: [5, 30, 35, 35, 35, 40]
	
};

// snow map
//TODO: change x and y so that it matches the coordinates for the start of each path
var levelTwoWaves = {
	
			// Enemy starting coordinates on paths: clockwise on map 
	/*		
			// Path 1 (Diagonally Left-Up Path)
				path1:{ x: 255, y: 20, direction: "down" }

			// Path 2 (Up Path)
				path1: { x: 735, y: 20, direction: "down" }
			
			// Path 3 (Right Path)
				path3: { x: 1100, y: 345, direction: "left" }

			// Path 4 (Left Path)
				path5: { x: 795, y: 690, direction: "up" }	

			// Path 5 (Diagonally Right-Down Path)
				path4: { x: 120, y: 435, direction: "right" }
		
	
	*/	
	
	waves: [

		// wave 1,	Time Interval: 5 - 30 seconds
		[			
			// path 1
			{enemyType: "Slime", initialSpawnTime: 5, interval: 1, number: 1, x: 255, y: 20, direction: "down"},			
			
			// path 2
			{enemyType: "Slime", initialSpawnTime: 8, interval: 1, number: 1, x: 735, y: 20, direction: "down"},			
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 11, interval: 1, number: 1, x: 1100, y: 345, direction: "left"},		
		
			// path 4
			{enemyType: "Slime", initialSpawnTime: 14, interval: 1, number: 1, x: 795, y: 690, direction: "up" },

			// path 5
			{enemyType: "Slime", initialSpawnTime: 17, interval: 1, number: 1, x: 120, y: 435, direction: "right"}

		],


		// wave 2,	Time Interval: 30 - 60 seconds
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 34, interval: 1, number: 1, x: 255, y: 20, direction: "down"},	
			{enemyType: "Goblin", initialSpawnTime: 38, interval: 3, number: 1, x: 255, y: 20, direction: "down"},				
			
			// path 2
			{enemyType: "Slime", initialSpawnTime: 38, interval: 1, number: 1, x: 735, y: 20, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 42, interval: 3, number: 1, x: 735, y: 20, direction: "down"},				
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 30, interval: 1, number: 1, x: 1100, y: 345, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 45, interval: 3, number: 1, x: 1100, y: 345, direction: "left"},				
		
			// path 4
			{enemyType: "Slime", initialSpawnTime: 32, interval: 1, number: 1, x: 795, y: 690, direction: "up" },
			{enemyType: "Goblin", initialSpawnTime: 40, interval: 3, number: 1, x: 795, y: 690, direction: "up" },	

			// path 5
			{enemyType: "Slime", initialSpawnTime: 36, interval: 1, number: 1, x: 120, y: 435, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 38, interval: 3, number: 1, x: 120, y: 435, direction: "right"}	

		],

		// wave 3,	Time Interval: 60 - 95 seconds
		[
			// path 1	
			{enemyType: "Goblin", initialSpawnTime: 70, interval: 1, number: 1, x: 255, y: 20, direction: "down"},	
			{enemyType: "Flying Eye", initialSpawnTime: 72, interval: 1, number: 2, x: 255, y: 20, direction: "down"},				
			
			// path 2
			{enemyType: "Flying Eye", initialSpawnTime: 60, interval: 1, number: 1, x: 735, y: 20, direction: "down"},	
			{enemyType: "Goblin", initialSpawnTime: 62, interval: 1, number: 2, x: 735, y: 20, direction: "down"},				
			
			// path 3
			{enemyType: "Goblin", initialSpawnTime: 80, interval: 1, number: 1, x: 1100, y: 345, direction: "left"},	
			{enemyType: "Flying Eye", initialSpawnTime: 82, interval: 1, number: 2, x: 1100, y: 345, direction: "left"},				
		
			// path 4
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 1, number: 1, x: 795, y: 690, direction: "up" },	
			{enemyType: "Goblin", initialSpawnTime: 67, interval: 1, number: 2, x: 795, y: 690, direction: "up" },	

			// path 5
			{enemyType: "Goblin", initialSpawnTime: 75, interval: 1, number: 1, x: 120, y: 435, direction: "right"},	
			{enemyType: "Flying Eye", initialSpawnTime: 77, interval: 1, number: 2, x: 120, y: 435, direction: "right"}
		],

		// wave 4,	Time Interval: 95 - 130 seconds
		[
			// path 1
			{enemyType: "Skeleton", initialSpawnTime: 104, interval: 1, number: 1, x: 255, y: 20, direction: "down"},			
			
			// path 2
			{enemyType: "Skeleton", initialSpawnTime: 104, interval: 1, number: 1, x: 735, y: 20, direction: "down"},				
			
			// path 3
			{enemyType: "Flying Eye", initialSpawnTime: 101, interval: 2, number: 2, x: 1100, y: 345, direction: "left"},	
			{enemyType: "Slime", initialSpawnTime: 107, interval: 3, number: 4, x: 1100, y: 345, direction: "left"},				
		
			// path 4
			{enemyType: "Slime", initialSpawnTime: 95, interval: 2, number: 5, x: 795, y: 690, direction: "up" },
			{enemyType: "Skeleton", initialSpawnTime: 110, interval: 2, number: 2, x: 795, y: 690, direction: "up" },			

			// path 5
			{enemyType: "Goblin", initialSpawnTime: 98, interval: 1, number: 2, x: 120, y: 435, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 113, interval: 1, number: 5, x: 120, y: 435, direction: "right"}
		],

		// wave 5,	Time Interval: 130 - 185 seconds
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 132, interval: 1, number: 3, x: 255, y: 20, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 151, interval: 2, number: 2, x: 255, y: 20, direction: "down"},
			{enemyType: "Flying Eye", initialSpawnTime: 160, interval: 2, number: 3, x: 255, y: 20, direction: "down"},

			// path 2
			{enemyType: "Slime", initialSpawnTime: 134, interval: 1, number: 3, x: 735, y: 20, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 149, interval: 2, number: 2, x: 735, y: 20, direction: "down"},
			{enemyType: "Flying Eye", initialSpawnTime: 163, interval: 2, number: 3, x: 735, y: 20, direction: "down"},

			// path 3 
			{enemyType: "Slime", initialSpawnTime: 138, interval: 1, number: 3, x: 1100, y: 345, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 145, interval: 2, number: 2, x: 1100, y: 345, direction: "left"},
			{enemyType: "Flying Eye", initialSpawnTime: 166, interval: 2, number: 3, x: 1100, y: 345, direction: "left"},

			// path 4
			{enemyType: "Slime", initialSpawnTime: 136, interval: 1, number: 3, x: 795, y: 690, direction: "up" },
			{enemyType: "Skeleton", initialSpawnTime: 147, interval: 2, number: 2, x: 795, y: 690, direction: "up" },
			{enemyType: "Flying Eye", initialSpawnTime: 169, interval: 2, number: 3, x: 795, y: 690, direction: "up" },
			
			// path 5
			{enemyType: "Slime", initialSpawnTime: 130, interval: 1, number: 3, x: 120, y: 435, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 153, interval: 2, number: 2, x: 120, y: 435, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 172, interval: 2, number: 3, x: 120, y: 435, direction: "right"}
		],
		
		// wave 6 (Dragon boss) Time Interval: 185+ seconds
		[
			{enemyType: "Dragon", initialSpawnTime: 185, interval: 1, number: 1, x: 1100, y: 345, direction: "left"},
			{enemyType: "Dragon", initialSpawnTime: 195, interval: 1, number: 1, x: 120, y: 435, direction: "right" }
		]
	],

	waveTimes: [5, 25, 30, 35, 35, 55]
		
};

// desert map
var levelThreeWaves = {
	
	
	waves: [
		
		// Enemy starting coordinates on paths: clockwise on map 
		/*
			path1: {x: 585, y: 75, direction: "down"},
			path2: {x: 615, y: 75, direction: "down"},
			path3: {x: 1035, y: 345, direction: "left"},
			path4: {x: 1035, y: 375, direction: "left"},
			path5: {x: 615, y: 645, direction: "up"},
			path6: {x: 585, y: 645, direction: "up"},
			path7: {x: 165, y: 375, direction: "right"},
			path8: {x: 165, y: 345, direction: "right"},
		*/
	
		// wave 1, Time Interval: 5-35 seconds
		[
		
			// path 3
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 5, number: 2, x: 1035, y: 345, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 15, interval: 5, number: 2, x: 1035, y: 345, direction: "left"},

			// path 4
			{enemyType: "Slime", initialSpawnTime: 5, interval: 5, number: 2, x: 1035, y: 375, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 15, interval: 5, number: 2, x: 1035, y: 375, direction: "left"},

			// path 7
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 5, number: 2, x: 165, y: 375, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 15, interval: 5, number: 2, x: 165, y: 375, direction: "right"},

			// path 8
			{enemyType: "Slime", initialSpawnTime: 5, interval: 5, number: 2, x: 165, y: 345, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 15, interval: 5, number: 2, x: 165, y: 345, direction: "right"}
			
		],

		// wave 2, Time Interval: 35-65	seconds
		[

			// path 1
			{enemyType: "Goblin", initialSpawnTime: 35, interval: 5, number: 2, x: 585, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 45, interval: 5, number: 2, x: 585, y: 75, direction: "down"},

			// path 2
			{enemyType: "Slime", initialSpawnTime: 35, interval: 5, number: 2, x: 615, y: 75, direction: "down"},
			{enemyType: "Slime", initialSpawnTime: 45, interval: 5, number: 2, x: 615, y: 75, direction: "down"},

			// path 5
			{enemyType: "Goblin", initialSpawnTime: 35, interval: 5, number: 2, x: 615, y: 645, direction: "up"},
			{enemyType: "Goblin", initialSpawnTime: 45, interval: 5, number: 2, x: 615, y: 645, direction: "up"},

			// path 6
			{enemyType: "Slime", initialSpawnTime: 35, interval: 5, number: 2, x: 585, y: 645, direction: "up"},
			{enemyType: "Slime", initialSpawnTime: 45, interval: 5, number: 2, x: 585, y: 645, direction: "up"}
		
		],

		// wave 3, Time Interval: 65-100 seconds
		[
			// path 1
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 2, number: 2, x: 585, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 85, interval: 1, number: 1, x: 585, y: 75, direction: "down"},			
			
			// path 2
			{enemyType: "Goblin", initialSpawnTime: 65, interval: 2, number: 2, x: 615, y: 75, direction: "down"},			

			// path 3
			{enemyType: "Flying Eye", initialSpawnTime: 69, interval: 2, number: 2, x: 1035, y: 345, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 85, interval: 1, number: 1, x: 1035, y: 345, direction: "left"},			
			
			// path 4
			{enemyType: "Goblin", initialSpawnTime: 69, interval: 1, number: 2, x: 1035, y: 375, direction: "left"},
			
			// path 5
			{enemyType: "Flying Eye", initialSpawnTime: 73, interval: 2, number: 2, x: 615, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 85, interval: 1, number: 1, x: 615, y: 645, direction: "up"},			
			
			// path 6
			{enemyType: "Goblin", initialSpawnTime: 73, interval: 2, number: 2, x: 585, y: 645, direction: "up"},
			
			// path 7
			{enemyType: "Flying Eye", initialSpawnTime: 77, interval: 2, number: 2, x: 165, y: 375, direction: "right"},
			{enemyType: "Mushroom", initialSpawnTime: 85, interval: 1, number: 1, x: 165, y: 375, direction: "right"},			
			
			// path 8
			{enemyType: "Goblin", initialSpawnTime: 77, interval: 2, number: 2, x: 165, y: 345, direction: "right"}			
		],

		// wave 4, Time Interval: 100-140 seconds
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 100, interval: 1, number: 4, x: 585, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 115, interval: 1, number: 1, x: 585, y: 75, direction: "down"},				
			// path 2
			{enemyType: "Slime", initialSpawnTime: 100, interval: 1, number: 4, x: 615, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 115, interval: 1, number: 1, x: 615, y: 75, direction: "down"},			

			// path 5
			{enemyType: "Slime", initialSpawnTime: 103, interval: 1, number: 4, x: 615, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 118, interval: 1, number: 1, x: 615, y: 645, direction: "up"},			
			// path 6
			{enemyType: "Slime", initialSpawnTime: 103, interval: 1, number: 4, x: 585, y: 645, direction: "up"},	
			{enemyType: "Mushroom", initialSpawnTime: 118, interval: 1, number: 1, x: 585, y: 645, direction: "up"},				
			
			// path 7
			{enemyType: "Slime", initialSpawnTime: 106, interval: 1, number: 4, x: 165, y: 375, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 121, interval: 1, number: 1, x: 165, y: 375, direction: "right"},			
			
			// path 8
			{enemyType: "Slime", initialSpawnTime: 106, interval: 1, number: 4, x: 165, y: 345, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 121, interval: 1, number: 1, x: 165, y: 345, direction: "right"},			

			// path 3
			{enemyType: "Slime", initialSpawnTime: 109, interval: 1, number: 4, x: 1035, y: 345, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 124, interval: 1, number: 1, x: 1035, y: 345, direction: "left"},
			
			// path 4
			{enemyType: "Slime", initialSpawnTime: 109, interval: 1, number: 4, x: 1035, y: 375, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 124, interval: 1, number: 1, x: 1035, y: 375, direction: "left"},
		],

		// wave 5, Time Interval: 140-195 seconds
		[
			// path 4
			{enemyType: "Slime", initialSpawnTime: 140, interval: 1, number: 1, x: 1035, y: 375, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 141, interval: 1, number: 1, x: 1035, y: 375, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 142, interval: 1, number: 1, x: 1035, y: 375, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 143, interval: 1, number: 1, x: 1035, y: 375, direction: "left"},

			// path 8
			{enemyType: "Slime", initialSpawnTime: 146, interval: 1, number: 1, x: 165, y: 345, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 147, interval: 1, number: 1, x: 165, y: 345, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 148, interval: 1, number: 1, x: 165, y: 345, direction: "right"},	
			{enemyType: "Mushroom", initialSpawnTime: 149, interval: 1, number: 1, x: 165, y: 345, direction: "right"},
			
			// path 2
			{enemyType: "Slime", initialSpawnTime: 152, interval: 1, number: 1, x: 615, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 153, interval: 1, number: 1, x: 615, y: 75, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 154, interval: 1, number: 1, x: 615, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 155, interval: 1, number: 1, x: 615, y: 75, direction: "down"},			

			// path 5
			{enemyType: "Slime", initialSpawnTime: 158, interval: 1, number: 1, x: 615, y: 645, direction: "up"},
			{enemyType: "Goblin", initialSpawnTime: 159, interval: 1, number: 1, x: 615, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 160, interval: 1, number: 1, x: 615, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 161, interval: 1, number: 1, x: 615, y: 645, direction: "up"},


			// path 6
			{enemyType: "Slime", initialSpawnTime: 164, interval: 1, number: 1, x: 585, y: 645, direction: "up"},
			{enemyType: "Goblin", initialSpawnTime: 165, interval: 1, number: 1, x: 585, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 166, interval: 1, number: 1, x: 585, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 167, interval: 1, number: 1, x: 585, y: 645, direction: "up"},

			// path 1
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 1, x: 585, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 171, interval: 1, number: 1, x: 585, y: 75, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 172, interval: 1, number: 1, x: 585, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 173, interval: 1, number: 1, x: 585, y: 75, direction: "down"},

			// path 7 
			{enemyType: "Slime", initialSpawnTime: 176, interval: 1, number: 1, x: 165, y: 375, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 177, interval: 1, number: 1, x: 165, y: 375, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 178, interval: 1, number: 1, x: 165, y: 375, direction: "right"},
			{enemyType: "Mushroom", initialSpawnTime: 179, interval: 1, number: 1, x: 165, y: 375, direction: "right"},
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 182, interval: 1, number: 1, x: 1035, y: 345, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 183, interval: 1, number: 1, x: 1035, y: 345, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 184, interval: 1, number: 1, x: 1035, y: 345, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 185, interval: 1, number: 1, x: 1035, y: 345, direction: "left"}		
		],
		
		// week 6 (Dragon boss)
		[
			{enemyType: "Dragon", initialSpawnTime: 195, interval: 1, number: 1, x: 1035, y: 375, direction: "left"},	
			{enemyType: "Dragon", initialSpawnTime: 210, interval: 1, number: 1, x: 165, y: 345, direction: "right"}			
		]

	],

	waveTimes: [5, 60, 45, 40, 40, 55]
};

// grass map: skeleton, flying eye, mushroom, dragon
var levelFourWaves = {
	
	waves: [
	
	
		// Enemy starting coordinates on the 8 paths of level four (listed relatively closewise on map)
		/*
			path1: {x: 195, y: 75, direction: "down"},
			path2: {x: 1005, y: 75, direction: "down"},
			path3: {x: 1035, y: 195, direction: "left"},
			path4: {x: 1035, y: 525, direction: "left"},
			path5: {x: 1005, y: 645, direction: "up"},
			path6: {x: 195, y: 645, direction: "up"},
			path7: {x: 75, y: 525, direction: "right"},
			path8: {x: 75, y: 195, direction: "right"},
		*/
		
		// wave 1 (Only slime enemies coming from all paths)   Time: 5 - 35
		[
			// path 1 and 2
			{enemyType: "Slime", initialSpawnTime: 5, interval: 4, number: 3, x: 195, y: 75, direction: "down"},
			{enemyType: "Slime", initialSpawnTime: 5, interval: 4, number: 3, x: 1005, y: 75, direction: "down"},

			// path 3 and 4
			{enemyType: "Slime", initialSpawnTime: 8, interval: 4, number: 3, x: 1035, y: 195, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 8, interval: 4, number: 3, x: 1035, y: 525, direction: "left"},

			// path 5 and 6
			{enemyType: "Slime", initialSpawnTime: 11, interval: 4, number: 3, x: 1005, y: 645, direction: "up"},
			{enemyType: "Slime", initialSpawnTime: 11, interval: 4, number: 3, x: 195, y: 645, direction: "up"},

			// path 7 and 8
			{enemyType: "Slime", initialSpawnTime: 14, interval: 4, number: 3, x: 165, y: 525, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 14, interval: 4, number: 3, x: 165, y: 195, direction: "right"}	
		],
		
		// wave 2 (Enemies coming from odd-numbered paths)   Time: 35 - 75
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 35, interval: 1, number: 4, x: 195, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 42, interval: 4, number: 3, x: 195, y: 75, direction: "down"},			
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 35, interval: 1, number: 4, x: 1035, y: 195, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 42, interval: 4, number: 3, x: 1035, y: 195, direction: "left"},				
		
			// path 5
			{enemyType: "Slime", initialSpawnTime: 40, interval: 1, number: 4, x: 1005, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 47, interval: 4, number: 3, x: 1005, y: 645, direction: "up"},			

			// path 7
			{enemyType: "Slime", initialSpawnTime: 40, interval: 1, number: 4, x: 165, y: 525, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 47, interval: 4, number: 3, x: 165, y: 525, direction: "right"}				
		],
		
		// wave 3 (Enemies coming from even-numbered paths)   Time: 75 - 115
		[
			// path 2
			{enemyType: "Slime", initialSpawnTime: 75, interval: 1, number: 4, x: 1005, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 82, interval: 4, number: 3, x: 1005, y: 75, direction: "down"},	
			
			// path 4
			{enemyType: "Slime", initialSpawnTime: 75, interval: 1, number: 4, x: 1035, y: 525, direction: "left"},			
			{enemyType: "Mushroom", initialSpawnTime: 82, interval: 4, number: 3, x: 1035, y: 525, direction: "left"},
			
			// path 6
			{enemyType: "Slime", initialSpawnTime: 80, interval: 1, number: 4, x: 195, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 87, interval: 4, number: 3, x: 195, y: 645, direction: "up"},				
			
			// path 8
			{enemyType: "Slime", initialSpawnTime: 80, interval: 1, number: 4, x: 165, y: 195, direction: "right"},			
			{enemyType: "Skeleton", initialSpawnTime: 87, interval: 4, number: 3, x: 165, y: 195, direction: "right"}	
		],
		
		// wave 4 (Enemies coming in a clockwise pattern)   Time: 115 - 160
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 115, interval: 1, number: 1, x: 195, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 118, interval: 2, number: 2, x: 195, y: 75, direction: "down"},	
			{enemyType: "Goblin", initialSpawnTime: 121, interval: 1, number: 1, x: 195, y: 75, direction: "down"},			
			{enemyType: "Mushroom", initialSpawnTime: 124, interval: 3, number: 2, x: 195, y: 75, direction: "down"},	

			// path 2
			{enemyType: "Slime", initialSpawnTime: 118, interval: 1, number: 1, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Skeleton", initialSpawnTime: 121, interval: 5, number: 2, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Flying Eye", initialSpawnTime: 124, interval: 2, number: 2, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Mushroom", initialSpawnTime: 127, interval: 1, number: 1, x: 1005, y: 75, direction: "down"},	

			// path 3
			{enemyType: "Slime", initialSpawnTime: 121, interval: 1, number: 1, x: 1035, y: 195, direction: "left"},
			{enemyType: "Flying Eye", initialSpawnTime: 124, interval: 2, number: 2, x: 1035, y: 195, direction: "left"},			
			{enemyType: "Mushroom", initialSpawnTime: 127, interval: 1, number: 1, x: 1035, y: 195, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 130, interval: 4, number: 2, x: 1035, y: 195, direction: "left"},
			
			// path 4
			{enemyType: "Slime", initialSpawnTime: 124, interval: 1, number: 1, x: 1035, y: 525, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 127, interval: 5, number: 2, x: 1035, y: 525, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 130, interval: 1, number: 1, x: 1035, y: 525, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 133, interval: 4, number: 2, x: 1035, y: 525, direction: "left"},

			// path 5
			{enemyType: "Slime", initialSpawnTime: 127, interval: 1, number: 1, x: 1005, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 130, interval: 1, number: 1, x: 1005, y: 645, direction: "up"},		
			{enemyType: "Flying Eye", initialSpawnTime: 133, interval: 3, number: 2, x: 1005, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 136, interval: 1, number: 1, x: 1005, y: 645, direction: "up"},
			
			// path 6
			{enemyType: "Slime", initialSpawnTime: 130, interval: 1, number: 1, x: 195, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 133, interval: 2, number: 2, x: 195, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 136, interval: 1, number: 1, x: 195, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 139, interval: 4, number: 2, x: 195, y: 645, direction: "up"},

			// path 7
			{enemyType: "Slime", initialSpawnTime: 133, interval: 1, number: 1, x: 165, y: 525, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 136, interval: 1, number: 1, x: 165, y: 525, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 139, interval: 4, number: 2, x: 165, y: 525, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 142, interval: 1, number: 1, x: 165, y: 525, direction: "right"},			
		
			// path 8
			{enemyType: "Slime", initialSpawnTime: 136, interval: 1, number: 1, x: 165, y: 195, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 139, interval: 1, number: 1, x: 165, y: 195, direction: "right"},			
			{enemyType: "Skeleton", initialSpawnTime: 142, interval: 1, number: 1, x: 165, y: 195, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 145, interval: 2, number: 2, x: 165, y: 195, direction: "right"}
			
		],
		
		// wave 5 (Random waves coming in all directions)   Time: 160 - 235
		[
			// Path 5
			{enemyType: "Skelton", initialSpawnTime: 160, interval: 2, number: 3, x: 1005, y: 645, direction: "up"},	
			{enemyType: "Flying Eye", initialSpawnTime: 169, interval: 3, number: 4, x: 1005, y: 645, direction: "up"},	

			// Path 2		
			{enemyType: "Slime", initialSpawnTime: 163, interval: 3, number: 7, x: 1005, y: 75, direction: "down"},		
			{enemyType: "Goblin", initialSpawnTime: 170, interval: 5, number: 4, x: 1005, y: 75, direction: "down"},				
			
			// Path 7
			{enemyType: "Goblin", initialSpawnTime: 166, interval: 5, number: 1, x: 165, y: 525, direction: "right"},			
			{enemyType: "Mushroom", initialSpawnTime: 178, interval: 3, number: 4, x: 165, y: 525, direction: "right"},
			
			// Path 4
			{enemyType: "Skeleton", initialSpawnTime: 169, interval: 4, number: 2, x: 1035, y: 525, direction: "left"},		
			{enemyType: "Slime", initialSpawnTime: 175, interval: 2, number: 8, x: 1035, y: 525, direction: "left"},				
			
			// Path 1
			{enemyType: "Goblin", initialSpawnTime: 172, interval: 3, number: 3, x: 195, y: 75, direction: "down"},		
			{enemyType: "Mushroom", initialSpawnTime: 183, interval: 2, number: 3, x: 195, y: 75, direction: "down"},					
			
			// Path 3
			{enemyType: "Mushroom", initialSpawnTime: 175, interval: 2, number: 4, x: 1035, y: 195, direction: "left"},		
			{enemyType: "Skeleton", initialSpawnTime: 188, interval: 4, number: 4, x: 1035, y: 195, direction: "left"},					
			
			// Path 8
			{enemyType: "Skeleton", initialSpawnTime: 178, interval: 3, number: 4, x: 165, y: 195, direction: "right"},		
			{enemyType: "Goblin", initialSpawnTime: 190, interval: 2, number: 2, x: 165, y: 195, direction: "right"},				
			
			// Path 6
			{enemyType: "Flying Eye", initialSpawnTime: 181, interval: 3, number: 4, x: 195, y: 645, direction: "up"},	
			{enemyType: "Goblin", initialSpawnTime: 194, interval: 3, number: 3, x: 195, y: 645, direction: "up"},			
			
			// Path 4
			{enemyType: "Mushroom", initialSpawnTime: 184, interval: 4, number: 4, x: 1035, y: 525, direction: "left"},		
			{enemyType: "Goblin", initialSpawnTime: 191, interval: 2, number: 3, x: 1035, y: 525, direction: "left"},	

			// Path 2		
			{enemyType: "Skeleton", initialSpawnTime: 187, interval: 3, number: 2, x: 1005, y: 75, direction: "down"},		
			{enemyType: "Flying Eye", initialSpawnTime: 198, interval: 1, number: 5, x: 1005, y: 75, direction: "down"},			
			
			// Path 8
			{enemyType: "Slime", initialSpawnTime: 190, interval: 2, number: 8, x: 165, y: 195, direction: "right"},		
			{enemyType: "Mushroom", initialSpawnTime: 199, interval: 3, number: 4, x: 165, y: 195, direction: "right"},			
			
			// Path 5
			{enemyType: "Slime", initialSpawnTime: 193, interval: 2, number: 6, x: 1005, y: 645, direction: "up"},	
			{enemyType: "Goblin", initialSpawnTime: 205, interval: 4, number: 6, x: 1005, y: 645, direction: "up"},			
			
			// Path 6
			{enemyType: "Flying Eye", initialSpawnTime: 196, interval: 2, number: 3, x: 195, y: 645, direction: "up"},	
			{enemyType: "Mushroom", initialSpawnTime: 203, interval: 1, number: 4, x: 195, y: 645, direction: "up"},				
			
			// Path 3
			{enemyType: "Skeleton", initialSpawnTime: 199, interval: 4, number: 3, x: 1035, y: 195, direction: "left"},		
			{enemyType: "Slime", initialSpawnTime: 208, interval: 2, number: 8, x: 1035, y: 195, direction: "left"},				
			
			// Path 1
			{enemyType: "Flying Eye", initialSpawnTime: 202, interval: 2, number: 5, x: 195, y: 75, direction: "down"},		
			{enemyType: "Skeleton", initialSpawnTime: 214, interval: 4, number: 5, x: 195, y: 75, direction: "down"},				
			
			// Path 7			
			{enemyType: "Goblin", initialSpawnTime: 205, interval: 5, number: 5, x: 165, y: 525, direction: "right"},			
			{enemyType: "Mushroom", initialSpawnTime: 220, interval: 3, number: 4, x: 165, y: 525, direction: "right"}
		],
		
		[
			{enemyType: "Dragon", initialSpawnTime: 235, interval: 1, number: 1, x: 195, y: 75, direction: "down"},
			{enemyType: "Dragon", initialSpawnTime: 235, interval: 1, number: 1, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Dragon", initialSpawnTime: 255, interval: 1, number: 1, x: 1005, y: 645, direction: "up"},	
			{enemyType: "Dragon", initialSpawnTime: 255, interval: 1, number: 1, x: 195, y: 645, direction: "up"}		
		]
		
	],
						
	waveTimes: [5, 30, 40, 40, 45, 75]
};