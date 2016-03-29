console.log('astronomy loaded')
const G_SI = 0.0000000000667408;//meter^3*second^-2*kilogramm^-1
const G    = 6000 ;

//star,planet,asteroid,comet,moon
// function AstronomicObject(id,position, mass){
function AstronomicObject(params){
  this.updateRadius = function(){
    this.radius = pow(this.mass,0.3)*100;
  }
  this.setMass = function(mass_value){
    this.mass = mass_value;
    this.updateRadius();
  }
          this.position = params.position;
          this.setMass(params.mass);

          this.active = false;
          this.name = '';
          this.id = params.id;
          this.velocity = params.hasOwnProperty('velocity')?params.velocity:new p5.Vector(0,0);
          this.acceleration = new p5.Vector(0,0);

          this.prev_acc = this.acceleration.copy();




  this.generateVelocity = function(x,y){
    this.velocity.add(new p5.Vector(x-this.position.x,y-this.position.y));
    return this.velocity;
  }

  this.getKineticEnergy = function(){
    return this.mass*Math.pow(this.velocity,2)/2;
  }

  this.addAcceleration = function(accelerationToAdd){
    return this.acceleration.addVector(accelerationToAdd);
  }

  this.getMass = function(){
    return this.mass;
  }


  this.isActive = function(){
    return this.active;
  }

  this.setActive = function(){
    return this.active = true;
  }

  this.setInactive = function(){
    return this.active = false;
  }

  this.changeNextStateAcceleration = function(accelerationVector){
    this.acceleration.add(accelerationVector);
    return this.acceleration;
  }

  this.applyNextState = function(){
    var time_measurement = 1;
    this.velocity.add(this.acceleration.mult(time_measurement));
    this.position.add(this.velocity.mult(time_measurement));
    this.prev_acc = this.acceleration;
    delete(this.acceleration);
    this.acceleration = new p5.Vector(0,0);
  }

  this.render = function(renderFunction,options){
    renderFunction(this,options);
  }
}