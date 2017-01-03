function sketch(p) {
  var populationSize = 250
  var lifespan = 5000
  var population, target, lifeP, count = 0
  var mutationRate = 3
  var rx = 130
  var ry = 200
  var rw = 800
  var rh = 30

  function Random2D(){
    var angle = Math.random()*p.TWO_PI
    var x = Math.sin(angle)
    var y = Math.cos(angle)
    return p.createVector(x, y)
  }

  function getRandomElement (array){
    return array[Math.floor(Math.random()*array.length)]
  }

  function reset(population){
    var mCount = 0
    if(count == lifespan){
      population.evaluate()
      population.selection()
      count = 0
    }
    for(var i = 0; i<population.rockets.length; i++){
      if( !population.rockets[i].crashed&&!population.rockets[i].completed ) mCount++
    }
    if(mCount == 0) {
      population.evaluate()
      population.selection()
      count = 0
    }
  }

  function Rocket(dna){
    this.pos = p.createVector(p.width/2, p.height)
    this.vel = p.createVector(0, -1)
    this.acc = p.createVector()
    this.dna = dna? dna : new DNA()
    this.fitness = 0
    this.count = 0
    this.crashed = false
    this.completed = false

    this.applyForce = function(force){
      this.acc.add(force)
    }

    this.update = function(){

      if(!this.crashed&&!this.completed){
        this.applyForce(this.dna.genes[count])
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)

        if(this.pos.x<0 || this.pos.x > p.width){
          this.crashed = true
        }

        if(this.pos.y<0 || this.pos.y > p.height){
          this.crashed = true
        }

        if(this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh){
          this.crashed = true
        }

      }

      var d = p.dist(this.pos.x, this.pos.y, target.x, target.y)

      if(d<15){
        this.completed = true
        this.pos = target.copy()
      }

    }

    this.calcFit = function(){
      var fitY = p.map(this.pos.y-target.y, 0, p.height, p.height, 0)
      var fitX = p.map(this.pos.x-target.x, 0, p.height, p.height, 0)
      var fitCount = p.map(count, 0, p.height, p.height, 0)
      this.fitness = fitY + fitX + fitCount
      if(this.completed) this.fitness *= 100
      if(this.crashed) this.fitness *= 0.00000000000000000000000000000001
    }

    this.show = function(){
      p.push()
      p.translate(this.pos.x, this.pos.y)
      p.rotate(this.vel.heading())
      p.rectMode(p.CENTER)
      p.rect(0, 0, 45, 7)
      p.pop()
    }
  }

  function Population(){
    this.rockets = []
    this.popsize = populationSize
    this.avgFit = 0

    for(var i = 0; i<this.popsize; i++){
      this.rockets[i] = new Rocket()
    }

    this.evaluate = function(){
      var maxfit = 0
      for(var i = 0; i<this.popsize; i++){
        this.rockets[i].calcFit()
        if(this.rockets[i].fitness > maxfit){
          maxfit = this.rockets[i].fitness
        }
      }

      for(var i = 0; i<this.popsize; i++){
        this.rockets[i].fitness /= maxfit
      }

      this.matingpool = []
      var sum = 0
      for(var i = 0; i<this.popsize; i++){
        sum += this.rockets[i].fitness
        var n = this.rockets[i].fitness*100
        // console.log("Foguete "+i+": "+n)
        for(var j = 0; j<n; j++){
          this.matingpool.push(this.rockets[i])
        }
      }
      this.avgFit = sum/this.popsize
      console.log(this.avgFit)


    }

    this.selection = function(){
      var newRockets = []
      for(var i = 0; i<this.rockets.length; i++){
        var parentA = getRandomElement(this.matingpool).dna
        var parentB = getRandomElement(this.matingpool).dna
        var child = parentA.crossover(parentB)
        newRockets[i] = new Rocket(child)
      }
      this.rockets = newRockets
    }

    this.run = function(){
      for(var i = 0; i<this.popsize; i++){
        this.rockets[i].update()
        this.rockets[i].show()
      }
    }
  }

  function DNA(genes){
    if(genes){
      this.genes = genes
    }else{
      this.genes = []
      for(var i = 0; i<lifespan; i++){
        this.genes[i] = Random2D()
        this.genes[i].setMag(0.1)
      }
    }

    this.crossover = function(partner){
      var newgenes = []
      var mid = Math.floor( Math.random()*this.genes.length )
      var geneCount = 0
      for(var i = 0; i<this.genes.length; i++){
        if(i>mid){
          newgenes[i] = this.genes[i]
        }else{
          newgenes[i] = partner.genes[i]
        }
        var mutateDice = Math.floor(Math.random()*100)

        if(mutateDice < mutationRate){
          geneCount++
          newgenes[i] = Random2D()
        }
      }
      return new DNA(newgenes)
    }
  }

  p.setup = function (){
    p.createCanvas(1066, 500)
    population = new Population()
    target = p.createVector(p.width/2, 50)
    // p.rect(rx, ry, rw, rh)
  }

  p.draw = function (){
    p.background(51)
    population.run()
    p.ellipse(target.x, target.y, 16, 16)
    p.rect(rx, ry, rw, rh)
    count++
    reset(population)
  }

}

export default sketch
