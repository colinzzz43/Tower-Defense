class BoundingBox {
    constructor(x, y, width, height) {
        Object.assign(this, {x, y, width, height});

        this.left = x;
        this.top = y;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;

    };

};

// for tower and enemy's range
class BoundingCircle {
}