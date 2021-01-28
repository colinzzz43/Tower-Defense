class User {
  constructor(gameEngine) {
    Object.assign(this, { gameEngine });
    this.gameEngine.user = this;
    this.removeFromWorld = false;

    // initialization for the user
    this.balance = 100;
    this.hp = 100;
  }

  // it is to be used for selling/ after killing enemies
  increaseBalance(amount) {
    this.balance += amount;
    console.log(
      "Originally balance was $100, after killing the enemy now is:" +
        this.balance
    );
  }

  // it is to be used for buying
  decreaseBalance(amount) {
    this.balance -= amount;
    console.log("After decreased:" + this.balance);
  }

  draw() {}
  update() {}
}
