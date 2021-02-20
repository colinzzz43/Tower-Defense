"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User(gameEngine) {
    _classCallCheck(this, User);

    Object.assign(this, {
      gameEngine: gameEngine
    });
    this.gameEngine.user = this;
    this.removeFromWorld = false;
    this.scores = 0; // initialization for the user

    this.balance = 100;
    this.hp = 100;
  } // it is to be used for selling/ after killing enemies


  _createClass(User, [{
    key: "increaseBalance",
    value: function increaseBalance(amount) {
      this.balance += amount; // this.printCoins(this.balance);
    } // it is to be used for buying

  }, {
    key: "decreaseBalance",
    value: function decreaseBalance(amount) {
      this.balance -= amount; // console.log("After decreased:" + this.balance);
    } // printCoins(balance) {
    //   document.getElementById("printCoins").innerHTML = balance;
    // }

  }, {
    key: "increaseScores",
    value: function increaseScores(amount) {
      this.scores += amount;
    }
  }, {
    key: "draw",
    value: function draw() {}
  }, {
    key: "update",
    value: function update() {}
  }]);

  return User;
}();