class User {
  constructor(gameEngine) {
    Object.assign(this, { gameEngine });
    this.gameEngine.user = this;
    this.removeFromWorld = false;

    this.scores = 0;
    // initialization for the user
    this.balance = 100;

    this.gameEngine.user = this;
  }

  // it is to be used for selling/ after killing enemies
  increaseBalance(amount) {
    this.balance += amount;
    // this.printCoins(this.balance);
  }

  // it is to be used for buying
  decreaseBalance(amount) {
    this.balance -= amount;
    console.log("After decreased:" + this.balance);
  }

  // printCoins(balance) {
  //   document.getElementById("printCoins").innerHTML = balance;
  // }

  increaseScores() {
    this.scores += 1;
  }

  draw() {}
  update() {}
}
