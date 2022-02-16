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

  const mousePos = createVector(mouseX, mouseY);
  let forceScaler = -50;

  if(mouseIsPressed){
    forceScaler = -forceScaler/4;
  }

  for(const p of particles) {


    const d = dist(mousePos.x, mousePos.y, p.pos.x, p.pos.y);
    const magnitude = forceScaler / (d+5);
    let forceDirection = p.pos.sub(mousePos);
    forceDirection.normalize();
    const newForce = forceDirection.mult(magnitude);
    p.force.add(newForce);

    p.update();
    p.draw();
  }
}


class Particle {

  constructor() {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(random(-10, 10), random(-10, 10));
    this.size = 20;
    this.color = color(random(255), random(255), random(255));

    this.drag = 0.98;
    this.force = createVector(0, 0);
  }

  update() {
    this.vel.add(this.force);
    this.vel.mult(this.drag);
    this.pos.add(this.vel);
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