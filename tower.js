class Tower {
  constructor(Game) {
    // 3rd: shows the projectile

    this.position = {
      // 1st: requires tower location
    };

    this.range = 3;
  }

  getRange() {
    // 2nd: calculates the area around the tower
    return Math.PI * (this.range * this.range);
  }
}
