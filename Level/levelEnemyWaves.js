// NOTE: had to change to js file as browser could not identify more than one objects in json
var levelOneWaves = {
	
	/*		
			// Start coordinates for path
				x: 200
				y: 390
				direction: "right"
		
	*/	
	
	waves: [

		// wave 1, total time 15
		[
			{enemyType: "Slime", initialSpawnTime: 5, interval: 2, number: 1, x: 200, y: 390, direction: "right"}
		], 

		// wave 2, total time 55
		[
			{enemyType: "Slime", initialSpawnTime: 35, interval: 2, number: 10, x: 200, y: 390, direction: "right"}
		], 
		
		// wave 3, total time 80
		[
			{enemyType: "Slime", initialSpawnTime: 70, interval: 2, number: 5, x: 200, y: 390, direction: "right"}, 
			{enemyType: "Goblin", initialSpawnTime: 71, interval: 2, number: 4, x: 200, y: 390, direction: "right"}
		],

		// wave 4, total time 110
		[
			{enemyType: "Goblin", initialSpawnTime: 95, interval: 2, number: 5, x: 200, y: 390, direction: "right"}, 
			{enemyType: "Slime", initialSpawnTime: 96, interval: 2, number: 7, x: 200, y: 390, direction: "right"}
		],

		// wave 5, total time 110
		[
			{enemyType: "Goblin", initialSpawnTime: 125, interval: 1.5, number: 10, x: 200, y: 390, direction: "right"}, 
			{enemyType: "Skeleton", initialSpawnTime: 125, interval: 3, number: 5, x: 200, y: 390, direction: "right"}
		]
	
	],

	// Time to next wave for waves 0-4.
	// To find time to next wave, next wave intialSpawnTime - current wave initialSpawnTime.
	waveTimes: [5, 30, 35, 25, 30]
	
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

			// Path 4 (Diagonally Right-Down Path)
				path4: { x: 120, y: 435, direction: "right" }
		
			// Path 5 (Left Path)
				path5: { x: 795, y: 690, direction: "up" }		
	*/	
	
	waves: [

		// paths: clockwise 1-5
		// wave 1: easy; paths 4 & 5	Time: 5-20
		[	
			// path 4
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 4, number: 5, x: 120, y: 435, direction: "right"},

			// path 5
			{enemyType: "Slime", initialSpawnTime: 5, interval: 2, number: 8, x: 795, y: 690, direction: "up"}

		],


		// wave 2: moderate; paths 1, 3, 5	Time: 35-53	
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 35, interval: 2, number: 8, x: 255, y: 20, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 35, interval: 3, number: 5, x: 255, y: 20, direction: "down"},
			
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 37, interval: 2, number: 8, x: 1100, y: 345, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 37, interval: 3, number: 2, x: 1100, y: 345, direction: "left"},
			
			// path 5
			{enemyType: "Goblin", initialSpawnTime: 39, interval: 3, number: 3, x: 795, y: 690, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 39, interval: 3, number: 3, x: 795, y: 690, direction: "up"}

		],

		// wave 3: easy; paths 2, 3		Time: 70-88
		[
			// path 2
			{enemyType: "Slime", initialSpawnTime: 70, interval: 1.5, number: 10, x: 735, y: 20, direction: "down"},
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 73, interval: 1.5, number: 10, x: 1100, y: 345, direction: "left"}
		],

		// wave 4: moderate; 2 & 4 first, 3 & 5 second	Time: 110-142
		[
			// path 2
			{enemyType: "Flying Eye", initialSpawnTime: 110, interval: 3, number: 6, x: 735, y: 20, direction: "down"},
			{enemyType: "Slime", initialSpawnTime: 113, interval: 5, number: 3, x: 735, y: 20, direction: "down"},

			// path 4
			{enemyType: "Flying Eye", initialSpawnTime: 110, interval: 3, number: 6, x: 120, y: 435, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 115, interval: 7, number: 2, x: 120, y: 435, direction: "right"},

			// path 3
			{enemyType: "Skeleton", initialSpawnTime: 128, interval: 3, number: 4, x: 1100, y: 345, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 130, interval: 4, number: 3, x: 1100, y: 345, direction: "left"},

			// path 5
			{enemyType: "Goblin", initialSpawnTime: 128, interval: 2, number: 4, x: 795, y: 690, direction: "up"},
			{enemyType: "Slime", initialSpawnTime: 129, interval: 1, number: 6, x: 795, y: 690, direction: "up"}
		],

		// wave 5: difficult; all paths		Time: 170-196
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 255, y: 20, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 176, interval: 2, number: 4, x: 255, y: 20, direction: "down"},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 255, y: 20, direction: "down"},

			// path 2
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 735, y: 20, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 176, interval: 2, number: 4, x: 735, y: 20, direction: "down"},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 735, y: 20, direction: "down"},

			// path 3 
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 1100, y: 345, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 176, interval: 2, number: 4, x: 1100, y: 345, direction: "left"},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 1100, y: 345, direction: "left"},

			// path 4
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 120, y: 435, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 176, interval: 2, number: 4, x: 120, y: 435, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 120, y: 435, direction: "right"},
			
			// path 5
			{enemyType: "Slime", initialSpawnTime: 170, interval: 1, number: 6, x: 795, y: 690, direction: "up"},
			{enemyType: "Goblin", initialSpawnTime: 176, interval: 2, number: 4, x: 795, y: 690, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 184, interval: 2, number: 6, x: 795, y: 690, direction: "up"}
		]
	],

	waveTimes: [5, 30, 35, 40, 60]
		
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
	
		// wave 1: easy; paths 3, 4, 7, 8	Time: 5-45
		[

			// path 3
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 1035, y: 345, direction: "left"},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 1035, y: 345, direction: "left"},

			// path 4
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 1035, y: 375, direction: "left"},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 1035, y: 375, direction: "left"},

			// path 7
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 165, y: 375, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 165, y: 375, direction: "right"},

			// path 8
			{enemyType: "Goblin", initialSpawnTime: 5, interval: 2, number: 10, x: 165, y: 345, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 25, interval: 2, number: 10, x: 165, y: 345, direction: "right"}


		],

		// wave 2: moderate; paths 1 & 2 , 7 & 8 then 3 & 4 , 5 & 6		Time: 65-90	
		[

			// paths 1 & 2	Time: 55-80
			{enemyType: "Skeleton", initialSpawnTime: 65, interval: 2, number: 5, x: 585, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 70, interval: 2.5, number: 4, x: 585, y: 75, direction: "down"},
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 5, number: 5, x: 585, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 585, y: 75, direction: "down"},

			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 2, number: 5, x: 615, y: 75, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 70, interval: 2.5, number: 4, x: 615, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 65, interval: 5, number: 5, x: 615, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 615, y: 75, direction: "down"},
			
			// paths 7 & 8
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 2, number: 5, x: 165, y: 375, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 70, interval: 2.5, number: 4, x: 165, y: 375, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 65, interval: 5, number: 5, x: 165, y: 375, direction: "right"},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 165, y: 375, direction: "right"},
			
			{enemyType: "Skeleton", initialSpawnTime: 65, interval: 2, number: 5, x: 165, y: 345, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 70, interval: 2.5, number: 4, x: 165, y: 345, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 65, interval: 5, number: 5, x: 165, y: 345, direction: "right"},
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 7, number: 3, x: 165, y: 345, direction: "right"},

			// after paths 1 & 2 , 7 & 8 are done
			// paths 3 & 4	Time: 70-90
			{enemyType: "Flying Eye", initialSpawnTime: 70, interval: 8, number: 2, x: 1035, y: 345, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 72, interval: 8, number: 2, x: 1035, y: 345, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 74, interval: 8, number: 2, x: 1035, y: 345, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 77, interval: 1, number: 2, x: 1035, y: 345, direction: "left"},

			{enemyType: "Skeleton", initialSpawnTime: 73, interval: 8, number: 2, x: 1035, y: 375, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 75, interval: 8, number: 2, x: 1035, y: 375, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 70, interval: 5, number: 2, x: 1035, y: 375, direction: "left"},
			
			// paths 5 & 6
			{enemyType: "Flying Eye", initialSpawnTime: 70, interval: 8, number: 2, x: 615, y: 645, direction: "up"},
			{enemyType: "Slime", initialSpawnTime: 72, interval: 8, number: 2, x: 615, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 74, interval: 8, number: 2, x: 615, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 77, interval: 1, number: 2, x: 615, y: 645, direction: "up"},

			{enemyType: "Mushroom", initialSpawnTime: 70, interval: 5, number: 2, x: 585, y: 645, direction: "up"},
			{enemyType: "Slime", initialSpawnTime: 72, interval: 8, number: 2, x: 585, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 73, interval: 5, number: 2, x: 585, y: 645, direction: "up"}
		
		],

		// wave 3: easy; paths 1, 3, 5, 7 sequentially	Time: 110-130
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 110, interval: 2, number: 6, x: 585, y: 75, direction: "down"},

			// path 3
			{enemyType: "Slime", initialSpawnTime: 112, interval: 2, number: 6, x: 1035, y: 345, direction: "left"},

			// path 5
			{enemyType: "Slime", initialSpawnTime: 114, interval: 2, number: 6, x: 615, y: 645, direction: "up"},

			// path 7
			{enemyType: "Slime", initialSpawnTime: 116, interval: 2, number: 6, x: 165, y: 375, direction: "right"},
		],

		// wave 4: moderate; random 5 on paths 3-8	Time: 150-170
		[
			// path 2
			{enemyType: "Flying Eye", initialSpawnTime: 150, interval: 2, number: 5, x: 615, y: 75, direction: "down"},
			{enemyType: "Slime", initialSpawnTime: 158, interval: 2, number: 5, x: 615, y: 75, direction: "down"},

			// path 7
			{enemyType: "Skeleton", initialSpawnTime: 152, interval: 2, number: 5, x: 165, y: 375, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 154, interval: 2, number: 5, x: 165, y: 375, direction: "right"},

			// path 1
			{enemyType: "Mushroom", initialSpawnTime: 154, interval: 2, number: 2, x: 585, y: 75, direction: "down"},

			// path 4
			{enemyType: "Goblin", initialSpawnTime: 156, interval: 2, number: 5, x: 1035, y: 375, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 160, interval: 2, number: 5, x: 1035, y: 375, direction: "left"},

			// path 3
			{enemyType: "Flying Eye", initialSpawnTime: 158, interval: 2, number: 5, x: 1035, y: 345, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 154, interval: 2, number: 2, x: 1035, y: 345, direction: "left"},

			// path 5
			{enemyType: "Skeleton", initialSpawnTime: 160, interval: 2, number: 3, x: 615, y: 645, direction: "up"}
		],

		// wave 5: difficult; sequential clockwise, then mushrooms all rush in	Time: 190-217
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 190, interval: 1, number: 5, x: 585, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 195, interval: 1, number: 5, x: 585, y: 75, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 200, interval: 1, number: 5, x: 585, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 585, y: 75, direction: "down"},

			// path 2
			{enemyType: "Slime", initialSpawnTime: 191, interval: 1, number: 5, x: 615, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 196, interval: 1, number: 5, x: 615, y: 75, direction: "down"},
			{enemyType: "Skeleton", initialSpawnTime: 201, interval: 1, number: 5, x: 615, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 615, y: 75, direction: "down"},


			// path 3
			{enemyType: "Slime", initialSpawnTime: 192, interval: 1, number: 5, x: 1035, y: 345, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 197, interval: 1, number: 5, x: 1035, y: 345, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 202, interval: 1, number: 5, x: 1035, y: 345, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 1035, y: 345, direction: "left"},


			// path 4
			{enemyType: "Slime", initialSpawnTime: 193, interval: 1, number: 5, x: 1035, y: 375, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 198, interval: 1, number: 5, x: 1035, y: 375, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 203, interval: 1, number: 5, x: 1035, y: 375, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 1035, y: 375, direction: "left"},


			// path 5
			{enemyType: "Slime", initialSpawnTime: 194, interval: 1, number: 5, x: 615, y: 645, direction: "up"},
			{enemyType: "Goblin", initialSpawnTime: 199, interval: 1, number: 5, x: 615, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 204, interval: 1, number: 5, x: 615, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 615, y: 645, direction: "up"},


			// path 6
			{enemyType: "Slime", initialSpawnTime: 195, interval: 1, number: 5, x: 585, y: 645, direction: "up"},
			{enemyType: "Goblin", initialSpawnTime: 200, interval: 1, number: 5, x: 585, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 205, interval: 1, number: 5, x: 585, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 585, y: 645, direction: "up"},


			// path 7 
			{enemyType: "Slime", initialSpawnTime: 196, interval: 1, number: 5, x: 165, y: 375, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 201, interval: 1, number: 5, x: 165, y: 375, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 206, interval: 1, number: 5, x: 165, y: 375, direction: "right"},
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 165, y: 375, direction: "right"},


			// path 8
			{enemyType: "Slime", initialSpawnTime: 197, interval: 1, number: 5, x: 165, y: 345, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 202, interval: 1, number: 5, x: 165, y: 345, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 207, interval: 1, number: 5, x: 165, y: 345, direction: "right"},	
			{enemyType: "Mushroom", initialSpawnTime: 212, interval: 1, number: 5, x: 165, y: 345, direction: "right"}

		]

	],

	waveTimes: [5, 60, 45, 40, 40]
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
			{enemyType: "Slime", initialSpawnTime: 5, interval: 3, number: 3, x: 195, y: 75, direction: "down"},
			{enemyType: "Slime", initialSpawnTime: 5, interval: 3, number: 3, x: 1005, y: 75, direction: "down"},

			// path 3 and 4
			{enemyType: "Slime", initialSpawnTime: 8, interval: 3, number: 3, x: 1035, y: 195, direction: "left"},
			{enemyType: "Slime", initialSpawnTime: 8, interval: 3, number: 3, x: 1035, y: 525, direction: "left"},

			// path 5 and 6
			{enemyType: "Slime", initialSpawnTime: 11, interval: 3, number: 3, x: 1005, y: 645, direction: "up"},
			{enemyType: "Slime", initialSpawnTime: 11, interval: 3, number: 3, x: 195, y: 645, direction: "up"},

			// path 7 and 8
			{enemyType: "Slime", initialSpawnTime: 14, interval: 3, number: 3, x: 165, y: 525, direction: "right"},
			{enemyType: "Slime", initialSpawnTime: 14, interval: 3, number: 3, x: 165, y: 195, direction: "right"}	
		],
		
		// wave 2 (Enemies coming from odd-numbered paths)   Time: 35 - 65
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 35, interval: 1, number: 5, x: 195, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 37, interval: 1, number: 3, x: 195, y: 75, direction: "down"},			
			
			// path 3
			{enemyType: "Slime", initialSpawnTime: 35, interval: 1, number: 5, x: 1035, y: 195, direction: "left"},
			{enemyType: "Mushroom", initialSpawnTime: 37, interval: 1, number: 3, x: 1035, y: 195, direction: "left"},				
		
			// path 5
			{enemyType: "Slime", initialSpawnTime: 45, interval: 1, number: 5, x: 1005, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 47, interval: 1, number: 3, x: 1005, y: 645, direction: "up"},			

			// path 7
			{enemyType: "Slime", initialSpawnTime: 45, interval: 1, number: 5, x: 165, y: 525, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 47, interval: 1, number: 3, x: 165, y: 525, direction: "right"}				
		],
		
		// wave 3 (Enemies coming from even-numbered paths)   Time: 65 - 105
		[
			// path 2
			{enemyType: "Slime", initialSpawnTime: 65, interval: 1, number: 5, x: 1005, y: 75, direction: "down"},
			{enemyType: "Goblin", initialSpawnTime: 67, interval: 2, number: 3, x: 1005, y: 75, direction: "down"},	
			
			// path 4
			{enemyType: "Slime", initialSpawnTime: 65, interval: 1, number: 5, x: 1035, y: 525, direction: "left"},			
			{enemyType: "Mushroom", initialSpawnTime: 67, interval: 2, number: 3, x: 1035, y: 525, direction: "left"},
			
			// path 6
			{enemyType: "Slime", initialSpawnTime: 75, interval: 1, number: 5, x: 195, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 77, interval: 2, number: 3, x: 195, y: 645, direction: "up"},				
			
			// path 8
			{enemyType: "Slime", initialSpawnTime: 75, interval: 1, number: 5, x: 165, y: 195, direction: "right"},			
			{enemyType: "Skeleton", initialSpawnTime: 77, interval: 2, number: 3, x: 165, y: 195, direction: "right"}	
		],
		
		// wave 4 (Enemies coming in a clockwise pattern)   Time: 105 - 145
		[
			// path 1
			{enemyType: "Slime", initialSpawnTime: 105, interval: 1, number: 1, x: 195, y: 75, direction: "down"},
			{enemyType: "Mushroom", initialSpawnTime: 110, interval: 2, number: 2, x: 195, y: 75, direction: "down"},	
			{enemyType: "Goblin", initialSpawnTime: 115, interval: 4, number: 1, x: 195, y: 75, direction: "down"},			
			{enemyType: "Mushroom", initialSpawnTime: 120, interval: 3, number: 2, x: 195, y: 75, direction: "down"},	

			// path 2
			{enemyType: "Slime", initialSpawnTime: 108, interval: 1, number: 1, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Skeleton", initialSpawnTime: 113, interval: 5, number: 3, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Flying Eye", initialSpawnTime: 118, interval: 2, number: 2, x: 1005, y: 75, direction: "down"},	
			{enemyType: "Mushroom", initialSpawnTime: 123, interval: 2, number: 1, x: 1005, y: 75, direction: "down"},	

			// path 3
			{enemyType: "Slime", initialSpawnTime: 111, interval: 1, number: 1, x: 1035, y: 195, direction: "left"},
			{enemyType: "Flying Eye", initialSpawnTime: 116, interval: 2, number: 2, x: 1035, y: 195, direction: "left"},			
			{enemyType: "Mushroom", initialSpawnTime: 121, interval: 1, number: 1, x: 1035, y: 195, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 126, interval: 4, number: 2, x: 1035, y: 195, direction: "left"},
			
			// path 4
			{enemyType: "Slime", initialSpawnTime: 114, interval: 1, number: 1, x: 1035, y: 525, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 119, interval: 5, number: 2, x: 1035, y: 525, direction: "left"},
			{enemyType: "Goblin", initialSpawnTime: 124, interval: 2, number: 1, x: 1035, y: 525, direction: "left"},
			{enemyType: "Skeleton", initialSpawnTime: 129, interval: 4, number: 2, x: 1035, y: 525, direction: "left"},

			// path 5
			{enemyType: "Slime", initialSpawnTime: 117, interval: 1, number: 1, x: 1005, y: 645, direction: "up"},
			{enemyType: "Skeleton", initialSpawnTime: 122, interval: 2, number: 1, x: 1005, y: 645, direction: "up"},		
			{enemyType: "Flying Eye", initialSpawnTime: 127, interval: 3, number: 3, x: 1005, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 132, interval: 4, number: 1, x: 1005, y: 645, direction: "up"},
			
			// path 6
			{enemyType: "Slime", initialSpawnTime: 120, interval: 1, number: 1, x: 195, y: 645, direction: "up"},
			{enemyType: "Mushroom", initialSpawnTime: 125, interval: 2, number: 3, x: 195, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 130, interval: 3, number: 1, x: 195, y: 645, direction: "up"},
			{enemyType: "Flying Eye", initialSpawnTime: 135, interval: 4, number: 2, x: 195, y: 645, direction: "up"},

			// path 7
			{enemyType: "Slime", initialSpawnTime: 123, interval: 1, number: 1, x: 165, y: 525, direction: "right"},
			{enemyType: "Goblin", initialSpawnTime: 128, interval: 5, number: 1, x: 165, y: 525, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 133, interval: 4, number: 2, x: 165, y: 525, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 138, interval: 2, number: 1, x: 165, y: 525, direction: "right"},			
		
			// path 8
			{enemyType: "Slime", initialSpawnTime: 126, interval: 1, number: 1, x: 165, y: 195, direction: "right"},
			{enemyType: "Skeleton", initialSpawnTime: 131, interval: 2, number: 1, x: 165, y: 195, direction: "right"},			
			{enemyType: "Skeleton", initialSpawnTime: 136, interval: 4, number: 1, x: 165, y: 195, direction: "right"},
			{enemyType: "Flying Eye", initialSpawnTime: 141, interval: 2, number: 3, x: 165, y: 195, direction: "right"}
			
		],
		
		// wave 5 (Random waves coming in all directions)   Time: 145 - 205
		[
			// Path 5
			{enemyType: "Skelton", initialSpawnTime: 145, interval: 2, number: 3, x: 1005, y: 645, direction: "up"},	
			{enemyType: "Flying Eye", initialSpawnTime: 156, interval: 3, number: 4, x: 1005, y: 645, direction: "up"},	

			// Path 2		
			{enemyType: "Slime", initialSpawnTime: 148, interval: 3, number: 7, x: 1005, y: 75, direction: "down"},		
			{enemyType: "Goblin", initialSpawnTime: 155, interval: 5, number: 4, x: 1005, y: 75, direction: "down"},				
			
			// Path 7
			{enemyType: "Goblin", initialSpawnTime: 151, interval: 5, number: 1, x: 165, y: 525, direction: "right"},			
			{enemyType: "Mushroom", initialSpawnTime: 163, interval: 3, number: 4, x: 165, y: 525, direction: "right"},
			
			// Path 4
			{enemyType: "Skeleton", initialSpawnTime: 154, interval: 4, number: 2, x: 1035, y: 525, direction: "left"},		
			{enemyType: "Slime", initialSpawnTime: 160, interval: 2, number: 8, x: 1035, y: 525, direction: "left"},				
			
			// Path 1
			{enemyType: "Goblin", initialSpawnTime: 157, interval: 3, number: 3, x: 195, y: 75, direction: "down"},		
			{enemyType: "Mushroom", initialSpawnTime: 168, interval: 2, number: 3, x: 195, y: 75, direction: "down"},					
			
			// Path 3
			{enemyType: "Mushroom", initialSpawnTime: 160, interval: 2, number: 4, x: 1035, y: 195, direction: "left"},		
			{enemyType: "Skeleton", initialSpawnTime: 173, interval: 4, number: 4, x: 1035, y: 195, direction: "left"},					
			
			// Path 8
			{enemyType: "Skeleton", initialSpawnTime: 163, interval: 3, number: 4, x: 165, y: 195, direction: "right"},		
			{enemyType: "Goblin", initialSpawnTime: 177, interval: 2, number: 2, x: 165, y: 195, direction: "right"},				
			
			// Path 6
			{enemyType: "Flying Eye", initialSpawnTime: 166, interval: 3, number: 4, x: 195, y: 645, direction: "up"},	
			{enemyType: "Goblin", initialSpawnTime: 179, interval: 3, number: 3, x: 195, y: 645, direction: "up"},			
			
			// Path 4
			{enemyType: "Mushroom", initialSpawnTime: 169, interval: 4, number: 4, x: 1035, y: 525, direction: "left"},		
			{enemyType: "Goblin", initialSpawnTime: 176, interval: 2, number: 3, x: 1035, y: 525, direction: "left"},	

			// Path 2		
			{enemyType: "Skeleton", initialSpawnTime: 172, interval: 3, number: 2, x: 1005, y: 75, direction: "down"},		
			{enemyType: "Flying Eye", initialSpawnTime: 183, interval: 1, number: 5, x: 1005, y: 75, direction: "down"},			
			
			// Path 8
			{enemyType: "Slime", initialSpawnTime: 175, interval: 2, number: 8, x: 165, y: 195, direction: "right"},		
			{enemyType: "Mushroom", initialSpawnTime: 186, interval: 3, number: 4, x: 165, y: 195, direction: "right"},			
			
			// Path 5
			{enemyType: "Slime", initialSpawnTime: 178, interval: 2, number: 6, x: 1005, y: 645, direction: "up"},	
			{enemyType: "Goblin", initialSpawnTime: 190, interval: 4, number: 6, x: 1005, y: 645, direction: "up"},			
			
			// Path 6
			{enemyType: "Flying Eye", initialSpawnTime: 181, interval: 2, number: 3, x: 195, y: 645, direction: "up"},	
			{enemyType: "Mushroom", initialSpawnTime: 188, interval: 1, number: 4, x: 195, y: 645, direction: "up"},				
			
			// Path 3
			{enemyType: "Skeleton", initialSpawnTime: 184, interval: 4, number: 3, x: 1035, y: 195, direction: "left"},		
			{enemyType: "Slime", initialSpawnTime: 193, interval: 2, number: 8, x: 1035, y: 195, direction: "left"},				
			
			// Path 1
			{enemyType: "Flying Eye", initialSpawnTime: 187, interval: 2, number: 5, x: 195, y: 75, direction: "down"},		
			{enemyType: "Skeleton", initialSpawnTime: 199, interval: 4, number: 5, x: 195, y: 75, direction: "down"},				
			
			// Path 7			
			{enemyType: "Goblin", initialSpawnTime: 190, interval: 5, number: 5, x: 165, y: 525, direction: "right"},			
			{enemyType: "Mushroom", initialSpawnTime: 205, interval: 3, number: 4, x: 165, y: 525, direction: "right"}
		]
		
	],
			
			
	waveTimes: [5, 30, 30, 40, 40]
};