class User {
  constructor(gameEngine) {
    Object.assign(this, { gameEngine });
	
	// Write this User entity as a field in the 
	// SceneManager (camera) entity that's a field in GameEngine entity
    this.gameEngine.camera.user = this;
    this.removeFromWorld = false;
    this.scores = 0;

    // initialization for the user
    this.balance = 10000;
//    this.hp = 100;
  }

  // it is to be used for selling/ after killing enemies
  increaseBalance(amount) {
    this.balance += amount;
    // this.printCoins(this.balance);
  }

  // it is to be used for buying
  decreaseBalance(amount) {
    this.balance -= amount;
    // console.log("After decreased:" + this.balance);
  }

  // printCoins(balance) {
  //   document.getElementById("printCoins").innerHTML = balance;
  // }

  increaseScores(amount) {
    this.scores += amount;
  }

  draw() {}
  update() {}
}
