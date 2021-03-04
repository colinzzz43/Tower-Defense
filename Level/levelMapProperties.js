
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
	
//	"startTile": { "row": 5, "column": 0},
//	"startDirection": "right",
//	"destinationTile": { "row": 4, "column": 14 },
	
//	"tileTurns": [ [5,2], [2,2], [2,5], [6,5], [6,9], [4,9] ]

	"startTiles": 
	[
		{ "row": 5, "column": 0, "direction":["right"] }
															 ],
															 
	"destinationTiles": 
//	[
//		{ "row": 4, "column": 12},
//		{ "row": 4, "column": 13},
		{ "row": 4, "column": 14},
//									],


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
	"tilePixelLength": 30,
	"tileBorderPixelWeight": 1,
	
	"mapArray": [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	]
};

// grass map
var levelFourGrid = {
	"tileRows": 20,
	"tileColumns": 30,
	"tilePixelLength": 30,
	"tileBorderPixelWeight": 1,
	
	"mapArray": [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[]
	],
	
	"startTiles": 
	[  	
		{ "row": 0, "column": 1 }, { "row": 0, "column": 28 },
		{ "row": 4, "column": 0 }, { "row": 4, "column": 29 },
		{ "row": 15, "column": 0 }, { "row": 15, "column": 29 },
		{ "row": 19, "column": 1 }, { "row": 19, "column": 28 }  
																		],
	"startDirection": "right",
	"destinationTile": { "row": 9, "column": 14 },
	
	"tileTurns": 
	[ 	{ "row": 1, "column": 1, "directions":["right"] },
		{ "row": 1, "column": 13, "directions":["down"] },
		{ "row": 1, "column": 16, "directions":["down"] },
		{ "row": 1, "column": 28, "directions":["left"] },
		{ "row": 3, "column": 13, "directions":["left"] },
		{ "row": 3, "column": 16, "directions":["right"] }
																
	
	
	
	
	
	
	
	
																]
};