function sketch(p) {
  const populationSize = 30;
  const lifespan = 5000;

  const searchParams = new URLSearchParams(window.location.search);

  const width = Number(searchParams.get("width") || 1066);
  const height = Number(searchParams.get("height") || 500);

  console.log("TEST_#", {
    width,
    height,
  });

  let population,
    target,
    lifeP,
    count = 0;
  const mutationRate = 1;

  const rx = width / 4;
  const ry = (2 * height) / 3;
  const rw = width / 2;
  const rh = 30;

  function Random2D() {
    const angle = Math.random() * p.TWO_PI;
    const x = Math.sin(angle);
    const y = Math.cos(angle);
    return p.createVector(x, y);
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function reset(population) {
    let mCount = 0;
    if (count == lifespan) {
      population.evaluate();
      population.selection();
      count = 0;
    }
    for (let i = 0; i < population.rockets.length; i++) {
      if (!population.rockets[i].crashed && !population.rockets[i].completed) {
        mCount++;
      }
    }
    if (mCount == 0) {
      population.evaluate();
      population.selection();
      count = 0;
    }
  }

  function Rocket(dna) {
    this.pos = p.createVector(width / 2, height);
    this.vel = p.createVector(0, -1);
    this.acc = p.createVector();
    this.dna = dna || new DNA();
    this.fitness = 0;
    this.count = 0;
    this.crashed = false;
    this.completed = false;
    this.minDist = p.dist(this.pos.x, this.pos.y, target.x, target.y);

    this.applyForce = function (force) {
      this.acc.add(force);
    };

    this.update = function () {
      const d = p.dist(this.pos.x, this.pos.y, target.x, target.y);

      if (!this.crashed && !this.completed) {
        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        if (this.pos.x < 0 || this.pos.x > width) {
          this.crashed = true;
        }

        if (this.pos.y < 0 || this.pos.y > height) {
          this.crashed = true;
        }

        if (
          this.pos.x > rx &&
          this.pos.x < rx + rw &&
          this.pos.y > ry &&
          this.pos.y < ry + rh
        ) {
          this.crashed = true;
        }

        if (d < this.minDist) this.minDist = d;
      }

      if (d < 15) {
        this.completed = true;
        this.pos = target.copy();
      }
    };

    this.calcFit = function () {
      const fitY = p.map(Math.abs(this.pos.y - target.y), 0, height, height, 0);
      const fitX = p.map(Math.abs(this.pos.x - target.x), 0, height, height, 0);

      // is after obstacle
      const multiplier = this.pos.y < ry - 10 ? 100 : 1;

      this.fitness = Math.sqrt(fitY * fitY + fitX * fitX);

      this.fitness *= multiplier;
      if (this.completed) this.fitness *= 100;
      if (this.crashed) this.fitness *= 0.01;
    };

    this.show = function () {
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.vel.heading());
      p.rectMode(p.CENTER);
      p.rect(0, 0, 45, 7);
      p.pop();
    };
  }

  function Population() {
    this.rockets = [];
    this.popsize = populationSize;
    this.avgFit = 0;

    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
    }

    this.evaluate = function () {
      let maxfit = 0;
      for (var i = 0; i < this.popsize; i++) {
        this.rockets[i].calcFit();
        if (this.rockets[i].fitness > maxfit) {
          maxfit = this.rockets[i].fitness;
        }
      }

      for (var i = 0; i < this.popsize; i++) {
        this.rockets[i].fitness /= maxfit;
      }

      this.matingpool = [];
      let sum = 0;
      for (var i = 0; i < this.popsize; i++) {
        sum += this.rockets[i].fitness;
        const n = this.rockets[i].fitness * 10000;
        // console.log("Foguete "+i+": "+n)
        for (let j = 0; j < n; j++) {
          this.matingpool.push(this.rockets[i]);
        }
      }
      this.avgFit = sum / this.popsize;
      console.log("average fitness", this.avgFit);
    };

    this.selection = function () {
      const newRockets = [];
      for (let i = 0; i < this.rockets.length; i++) {
        const parentA = getRandomElement(this.matingpool).dna;
        const parentB = getRandomElement(this.matingpool).dna;
        const child = parentA.crossover(parentB);
        newRockets[i] = new Rocket(child);
      }
      this.rockets = newRockets;
    };

    this.run = function () {
      for (let i = 0; i < this.popsize; i++) {
        this.rockets[i].update();
        this.rockets[i].show();
      }
    };
  }

  function DNA(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = Random2D();
        this.genes[i].setMag(0.1);
      }
    }

    this.crossover = function (partner) {
      const newgenes = [];
      const mid = Math.floor(Math.random() * this.genes.length);
      let geneCount = 0;
      for (let i = 0; i < this.genes.length; i++) {
        if (i > mid) {
          newgenes[i] = this.genes[i];
        } else {
          newgenes[i] = partner.genes[i];
        }
        const mutateDice = Math.floor(Math.random() * 100);

        if (mutateDice < mutationRate) {
          geneCount++;
          newgenes[i] = Random2D();
        }
      }
      return new DNA(newgenes);
    };
  }

  p.setup = function () {
    p.createCanvas(width, height);
    target = p.createVector(width / 2, 50);
    population = new Population();
    // p.rect(rx, ry, rw, rh)
  };

  p.draw = function () {
    p.background(51);
    population.run();
    p.ellipse(target.x, target.y, 16, 16);
    p.rect(rx, ry, rw, rh);
    count++;
    reset(population);
  };
}

export default sketch;
