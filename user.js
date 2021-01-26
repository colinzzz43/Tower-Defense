class User {
  constructor() {
    // initialization for the user
    this.balance = 100;
    this.hp = 100;
  }

  // it is to be used for sell and

  increaseBalance(amount) {
    this.balance += amount;
    console.log("After increased:" + this.balance);
  }

  // it is to be used for buy
  decreaseBalance(amount) {
    this.balance -= amount;
    console.log("After decreased:" + this.balance);
  }
}
