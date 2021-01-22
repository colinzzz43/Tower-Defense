class BoundingBox {
  constructor(x, y, width, height) {
    Object.assign(this, { x, y, width, height });

    this.left = x;
    this.top = y;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
  }
}

// for tower and enemy's range
class BoundingCircle {
  constructor(x, y, r) {
    Object.assign(this, { x, y, r });

    this.x = x;
    this.y = y;
    this.r = r;

    // two circles intesect if the distance between their center points is less than the sum of their radii.
  }
}
