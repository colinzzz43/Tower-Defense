class User {
  constructor(gameEngine) {
    Object.assign(this, {gameEngine});
    this.gameEngine.user = this;
    
    // initialization for the user
    this.balance = 100;
    this.hp = 100;
  }

  // it is to be used for selling

  increaseBalance(amount) {
    this.balance += amount;
    console.log("After increased:" + this.balance);
  }

  // it is to be used for buying
  decreaseBalance(amount) {
    this.balance -= amount;
    console.log("After decreased:" + this.balance);
  }
}
