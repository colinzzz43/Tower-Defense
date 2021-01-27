// might not be needed?
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

    };

    collide(other) {
        var dist = distance(this, other);
        return dist < this.r + other.r;
    };
};
