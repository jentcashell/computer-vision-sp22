let particles = [];
let pImg;

function preload() {
  pImg = loadImage('particle.png');
}

function setup() {
  createCanvas(640, 640);
  
  const NUM_PARTICLES = 100;
  for(let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle);
  }
  noStroke();
}

function draw() {
  background(200);

  for(const p of particles) {
    p.update();
    p.draw();
  }
}


class Particle {

  constructor() {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.acc = createVector(random(-0.01, 0.01), random(0.1, 0.2));
    this.size = 20;
    this.gravity = 0.99;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.vel.add(this.acc);
    this.vel.y*=this.gravity;
    this.pos.add(this.vel);
    this.checkWalls();
  }

  draw() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  checkWalls() {
    // check walls, make particles bounce off walls
    if(this.pos.y > (height - this.size/2)) {
      this.vel.y *= -1;
      this.pos.y = height - this.size/2;
    }
    
    if(this.pos.y < 0) {
      this.vel.y *= -1;
      this.pos.y = 0;
    }
    
    if(this.pos.x > width) {
      this.vel.x *= -1;
      this.pos.x = width;
    }
    
    if(this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }
  }
  
}