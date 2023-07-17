function sketch(p) {
  let sun, planet;

  function Random2D() {
    const angle = Math.random() * p.TWO_PI;
    const x = Math.sin(angle);
    const y = Math.cos(angle);
    return p.createVector(x, y);
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function Planet() {
    this.pos = p.createVector(p.width / 3, p.height / 3);
    this.vel = p.createVector(2, -0.5);
    this.acc = p.createVector().mult(0);
    this.gravity_factor = 0.1;
    this.diameter = 10;

    this.gravity = function (sun) {
      const vecDist = p.createVector(
        this.pos.x - sun.pos.x,
        this.pos.y - sun.pos.y
      );
      const dist = vecDist.mag();
      const unitVecDist = vecDist.normalize();
      const accModul = unitVecDist.mult(-sun.gravity_factor / (dist * dist));
      console.log(accModul.mag());
      this.acc = accModul;
    };

    this.draw = function () {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.ellipseMode(p.CENTER);
      p.ellipse(0, 0, this.diameter, this.diameter);
      p.pop();
    };

    this.update = function (sun) {
      this.gravity(sun);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    };
  }

  function Sun() {
    this.pos = p.createVector(p.width / 2, p.height / 2);
    this.vel = p.createVector().mult(0);
    this.acc = p.createVector().mult(0);
    this.gravity_factor = 1000;
    this.diameter = 100;

    this.draw = function () {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.ellipseMode(p.CENTER);
      p.ellipse(0, 0, this.diameter, this.diameter);
      p.pop();
    };

    this.update = function () {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    };
  }

  p.setup = function () {
    p.createCanvas(1066, 500);
    sun = new Sun();
    planet = new Planet();
  };

  p.draw = function () {
    p.background(51);
    sun.draw();
    sun.update();
    planet.draw();
    planet.update(sun);
  };
}

export default sketch;
