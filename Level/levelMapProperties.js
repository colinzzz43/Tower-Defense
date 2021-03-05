var levelOneGrid = {
	"tileRows": 10,
	"tileColumns": 15,
	"tilePixelLength": 40,
	"tileBorderPixelWeight": 1,
	
	"mapArray": [
		[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 2, 2, 2],
		[1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 2, 2, 2],
		[1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 1],
	],
	
	"startTiles": 
	[
		{ "row": 5, "column": 0, "direction":["right"] }
															 ],
															 
	"destinationTiles": 
		{ "row": 4, "column": 14},


	"tileTurns": 
	[
		{ "row": 5, "column": 2, "directions":["up"] },
		{ "row": 2, "column": 2, "directions":["right"] },
		{ "row": 2, "column": 5, "directions":["down"] },
		{ "row": 6, "column": 5, "directions":["right"] },
		{ "row": 6, "column": 9, "directions":["up"] },
		{ "row": 4, "column": 9, "directions":["right"] },
													         ]
															 
};


// snow map
var levelTwoGrid = {
	"tileRows": 20,
	"tileColumns": 30,
	"tilePixelLength": 32,
	"tileBorderPixelWeight": 1,
	
	"mapArray": [
		[1, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
		[1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[2, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1, 1],
		[1, 1, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
		[1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
		[1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
		[1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2, 2, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1],
		[1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1]
	],
	
	"startTiles": 
	[
		// Top Edge of Map
		{ "row": 0, "column": 3, "direction":["down"] },
		{ "row": 0, "column": 20, "direction":["down"] },
		
		// Right Edge of Map
		{ "row": 9, "column": 29, "direction":["left"] },
		
		// Left Edge of Map
		{ "row": 12, "column": 0, "direction":["right"] },	

		// Bottom Edge of Map
		{ "row": 19, "column": 21, "direction":["up"] },		
	
															 ],
															 
	"destinationTiles": 
		{ "row": 9.5, "column": 15.5},


	"tileTurns": 
	[
		// Starting from Beginning of Diagonally Left-Up Path
		{ "row": 2, "column": 3, "directions":["left"] },
		{ "row": 2, "column": 2, "directions":["down"] },
		{ "row": 4, "column": 2, "directions":["right"] },
		{ "row": 4, "column": 5, "directions":["down"] },
		{ "row": 6, "column": 5, "directions":["left"] },
		{ "row": 6, "column": 4, "directions":["down"] },
		{ "row": 8, "column": 4, "directions":["right"] },
		{ "row": 8, "column": 7, "directions":["up"] },		
		{ "row": 5, "column": 7, "directions":["right"] },
		{ "row": 5, "column": 9, "directions":["down"] },
		{ "row": 8, "column": 9, "directions":["right"] },		
		
		// Starting from Beginning of Up Path
		{ "row": 3, "column": 19, "directions":["left"] },
		{ "row": 3, "column": 16, "directions":["down"] },
	
		// Starting from Beginning of Right Path
		{ "row": 9, "column": 26, "directions":["up"] },
		{ "row": 8, "column": 26, "directions":["left"] },	
		{ "row": 8, "column": 23, "directions":["up"] },
		{ "row": 6, "column": 23, "directions":["left"] },	
		{ "row": 6, "column": 21, "directions":["down"] },
		{ "row": 7, "column": 21, "directions":["left"] },	
		{ "row": 7, "column": 19, "directions":["down"] },
		{ "row": 9, "column": 19, "directions":["left"] },			
		
		// Starting from Beginning of Diagonally Right-Down Path
		{ "row": 18, "column": 21, "directions":["right"] },
		{ "row": 18, "column": 23, "directions":["up"] },	
		{ "row": 16, "column": 23, "directions":["left"] },
		{ "row": 16, "column": 21, "directions":["up"] },	
		{ "row": 15, "column": 21, "directions":["left"] },
		{ "row": 15, "column": 17, "directions":["up"] },	
		{ "row": 14, "column": 17, "directions":["left"] },
		{ "row": 14, "column": 16, "directions":["up"] },				
		
		// Starting from Beginning of Left Path
		{ "row": 12, "column": 2, "directions":["down"] },
		{ "row": 14, "column": 2, "directions":["right"] },	
		{ "row": 14, "column": 4, "directions":["up"] },
		{ "row": 12, "column": 4, "directions":["right"] },	
		{ "row": 12, "column": 6, "directions":["down"] },
		{ "row": 14, "column": 6, "directions":["right"] },	
		{ "row": 14, "column": 9, "directions":["up"] },
		{ "row": 11, "column": 9, "directions":["right"] }			
													                        ]	
	
};

// desert map
var levelThreeGrid = {
	"tileRows": 20,
	"tileColumns": 30,
	"tilePixelLength": 32,
	"tileBorderPixelWeight": 1,
	
	"mapArray": [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1],
		[1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1],
		[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
		[1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 2, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
		[2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1]
	],
	
	"startTiles": 
	[
		// Top Edge of Map
		{ "row": 0, "column": 14, "direction":["down"] },
		{ "row": 0, "column": 15, "direction":["down"] },
		
		// Right Edge of Map
		{ "row": 9, "column": 29, "direction":["left"] },
		{ "row": 10, "column": 29, "direction":["left"] },		
		
		// Left Edge of Map
		{ "row": 9, "column": 0, "direction":["right"] },	
		{ "row": 10, "column": 0, "direction":["right"] },		

		// Bottom Edge of Map
		{ "row": 19, "column": 14, "direction":["up"] },
		{ "row": 19, "column": 15, "direction":["up"] },		
															],	
															
	"destinationTiles": 
		{ "row": 9.5, "column": 15.5},															
	
	"tileTurns": 
	[
		// Starting from beginning of Up path 
		// Left-Hand Path
		{ "row": 2, "column": 14, "directions":["left"] },
		{ "row": 2, "column": 12, "directions":["down"] },
		{ "row": 3, "column": 12, "directions":["down", "left"] },		
		{ "row": 4, "column": 12, "directions":["right"] },	
		{ "row": 4, "column": 14, "directions":["down"] },
		// Right-Hand Path
		{ "row": 2, "column": 15, "directions":["right"] },
		{ "row": 2, "column": 17, "directions":["down"] },
		{ "row": 3, "column": 17, "directions":["down", "right"] },		
		{ "row": 4, "column": 17, "directions":["left"] },	
		{ "row": 4, "column": 15, "directions":["down"] },	

		// Starting from beginning of Left path 
		// Up-Hand Path
		{ "row": 9, "column": 2, "directions":["up"] },
		{ "row": 7, "column": 2, "directions":["right"] },	
		{ "row": 7, "column": 3, "directions":["right", "up"] },	
		{ "row": 7, "column": 4, "directions":["down"] },
		{ "row": 9, "column": 4, "directions":["right"] },	
		{ "row": 9, "column": 7, "directions":["up"] },		
		{ "row": 7, "column": 7, "directions":["right"] },	
		{ "row": 7, "column": 9, "directions":["down"] },
		{ "row": 9, "column": 9, "directions":["right"] },
		// Down-Hand Path
		{ "row": 10, "column": 2, "directions":["down"] },
		{ "row": 12, "column": 2, "directions":["right"] },	
		{ "row": 12, "column": 3, "directions":["right", "down"] },	
		{ "row": 12, "column": 4, "directions":["up"] },
		{ "row": 10, "column": 4, "directions":["right"] },	
		{ "row": 10, "column": 7, "directions":["down"] },		
		{ "row": 12, "column": 7, "directions":["right"] },	
		{ "row": 12, "column": 9, "directions":["up"] },
		{ "row": 10, "column": 9, "directions":["right"] },	

		// Starting from beginning of Right path 
		// Up-Hand Path
		{ "row": 9, "column": 27, "directions":["up"] },
		{ "row": 7, "column": 27, "directions":["left"] },	
		{ "row": 7, "column": 26, "directions":["left", "up"] },	
		{ "row": 7, "column": 25, "directions":["down"] },
		{ "row": 9, "column": 25, "directions":["left"] },	
		{ "row": 9, "column": 22, "directions":["up"] },		
		{ "row": 7, "column": 22, "directions":["left"] },	
		{ "row": 7, "column": 20, "directions":["down"] },
		{ "row": 9, "column": 20, "directions":["left"] },
		// Down-Hand Path
		{ "row": 10, "column": 27, "directions":["down"] },
		{ "row": 12, "column": 27, "directions":["left"] },	
		{ "row": 12, "column": 26, "directions":["left", "down"] },	
		{ "row": 12, "column": 25, "directions":["up"] },
		{ "row": 10, "column": 25, "directions":["left"] },	
		{ "row": 10, "column": 22, "directions":["down"] },		
		{ "row": 12, "column": 22, "directions":["left"] },	
		{ "row": 12, "column": 20, "directions":["up"] },
		{ "row": 10, "column": 20, "directions":["left"] },	

		// Starting from beginning of Down path 
		// Left-Hand Path
		{ "row": 17, "column": 14, "directions":["left"] },
		{ "row": 17, "column": 12, "directions":["up"] },
		{ "row": 16, "column": 12, "directions":["up", "left"] },		
		{ "row": 15, "column": 12, "directions":["right"] },	
		{ "row": 15, "column": 14, "directions":["up"] },
		// Right-Hand Path
		{ "row": 17, "column": 15, "directions":["right"] },
		{ "row": 17, "column": 17, "directions":["up"] },
		{ "row": 16, "column": 17, "directions":["up", "right"] },		
		{ "row": 15, "column": 17, "directions":["left"] },	
		{ "row": 15, "column": 15, "directions":["up"] },

		// Corner Paths
		// Top-Left	
		{ "row": 3, "column": 3, "directions":["right", "down"] },
		// Top-Right
		{ "row": 3, "column": 26, "directions":["left", "down"] },		
		// Bottom-Left
		{ "row": 16, "column": 3, "directions":["right", "up"] },		
		// Bottom-Right
		{ "row": 16, "column": 26, "directions":["left", "up"] }		
															]
}

// grass map
var levelFourGrid = {
	"tileRows": 20,
	"tileColumns": 30,
	"tilePixelLength": 32,
	"tileBorderPixelWeight": 1,
	
	"mapArray": [
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
		[1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 2, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
		[1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
		[1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
		[0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]
	],
	
	"startTiles": 
	[
		// Top Edge of Map
		{ "row": 0, "column": 1, "direction":["down"] },
		{ "row": 0, "column": 28, "direction":["down"] },
		
		// Right Edge of Map
		{ "row": 4, "column": 29, "direction":["left"] },
		{ "row": 15, "column": 29, "direction":["left"] },		
		
		// Left Edge of Map
		{ "row": 4, "column": 0, "direction":["right"] },	
		{ "row": 15, "column": 0, "direction":["right"] },		

		// Bottom Edge of Map
		{ "row": 19, "column": 1, "direction":["up"] },
		{ "row": 19, "column": 28, "direction":["up"] },			
															],
	"destinationTiles": 
		{ "row": 9.5, "column": 15.5},	

	"tileTurns": 
	[	
		// Starting from beginning of Up Path 1
		{ "row": 1, "column": 1, "directions":["right"] },	
		{ "row": 1, "column": 13, "directions":["down"] },	
		{ "row": 3, "column": 13, "directions":["left"] },	
		{ "row": 3, "column": 6, "directions":["down"] },	
		{ "row": 5, "column": 6, "directions":["right"] },
		{ "row": 5, "column": 14, "directions":["down"] },		
	
		// Starting from beginning of Up Path 2
		{ "row": 1, "column": 28, "directions":["left"] },	
		{ "row": 1, "column": 16, "directions":["down"] },	
		{ "row": 3, "column": 16, "directions":["right"] },	
		{ "row": 3, "column": 23, "directions":["down"] },	
		{ "row": 5, "column": 23, "directions":["left"] },
		{ "row": 5, "column": 15, "directions":["down"] },		
	
		// Starting from beginning of Left Path 1
		{ "row": 4, "column": 2, "directions":["down"] },	
		{ "row": 8, "column": 2, "directions":["right"] },	
		{ "row": 8, "column": 4, "directions":["up"] },	
		{ "row": 7, "column": 4, "directions":["right"] },		
		{ "row": 7, "column": 6, "directions":["down"] },		
		{ "row": 8, "column": 6, "directions":["right"] },	
		{ "row": 8, "column": 8, "directions":["up"] },		
		{ "row": 7, "column": 8, "directions":["right"] },		
		{ "row": 7, "column": 11, "directions":["down"] },	
		{ "row": 9, "column": 11, "directions":["right"] },		
	
		// Starting from beginning of Left Path 2
		{ "row": 15, "column": 2, "directions":["up"] },	
		{ "row": 11, "column": 2, "directions":["right"] },	
		{ "row": 11, "column": 4, "directions":["down"] },	
		{ "row": 12, "column": 4, "directions":["right"] },		
		{ "row": 12, "column": 6, "directions":["up"] },		
		{ "row": 11, "column": 6, "directions":["right"] },	
		{ "row": 11, "column": 8, "directions":["down"] },		
		{ "row": 12, "column": 8, "directions":["right"] },		
		{ "row": 12, "column": 11, "directions":["up"] },	
		{ "row": 10, "column": 11, "directions":["right"] },		
	
		// Starting from beginning of Right Path 1
		{ "row": 4, "column": 27, "directions":["down"] },	
		{ "row": 8, "column": 27, "directions":["left"] },	
		{ "row": 8, "column": 25, "directions":["up"] },	
		{ "row": 7, "column": 25, "directions":["left"] },		
		{ "row": 7, "column": 23, "directions":["down"] },		
		{ "row": 8, "column": 23, "directions":["left"] },	
		{ "row": 8, "column": 21, "directions":["up"] },		
		{ "row": 7, "column": 21, "directions":["left"] },		
		{ "row": 7, "column": 18, "directions":["down"] },	
		{ "row": 9, "column": 18, "directions":["left"] },			
	
		// Starting from beginning of Right Path 2
		{ "row": 15, "column": 27, "directions":["up"] },	
		{ "row": 11, "column": 27, "directions":["left"] },	
		{ "row": 11, "column": 25, "directions":["down"] },	
		{ "row": 12, "column": 25, "directions":["left"] },		
		{ "row": 12, "column": 23, "directions":["up"] },		
		{ "row": 11, "column": 23, "directions":["left"] },	
		{ "row": 11, "column": 21, "directions":["down"] },		
		{ "row": 12, "column": 21, "directions":["left"] },		
		{ "row": 12, "column": 18, "directions":["up"] },	
		{ "row": 10, "column": 18, "directions":["left"] },	
	
		// Starting from beginning of Down Path 1
		{ "row": 18, "column": 1, "directions":["right"] },	
		{ "row": 18, "column": 13, "directions":["up"] },	
		{ "row": 16, "column": 13, "directions":["left"] },	
		{ "row": 16, "column": 6, "directions":["up"] },	
		{ "row": 14, "column": 6, "directions":["right"] },
		{ "row": 14, "column": 14, "directions":["up"] },	
	
		// Starting from beginning of Down Path 2	
		{ "row": 18, "column": 28, "directions":["left"] },	
		{ "row": 18, "column": 16, "directions":["up"] },	
		{ "row": 16, "column": 16, "directions":["right"] },	
		{ "row": 16, "column": 23, "directions":["up"] },	
		{ "row": 14, "column": 23, "directions":["left"] },
		{ "row": 14, "column": 15, "directions":["up"] }	
																]
	
}