//star,planet,asteroid,comet,moon
function AstronomicObject(params){
  this.updateRadius = function(){
    this.radius = pow(this.mass,0.3)*1;
  }
  this.setMass = function(mass_value){
    this.mass = mass_value;
    this.updateRadius();
  }
          this.position = params.position;
          this.setMass(params.mass);

          this.active = false;
          this.name = params.name || 'new' + params.id;
          this.id = params.id;
          this.velocity = params.hasOwnProperty('velocity')?params.velocity:new p5.Vector(0,0);
          this.acceleration = new p5.Vector(0,0);
          // rings
          // colour
          // spin
          this.orbit_center = params.orbit_center || null;

          this.prev_acc = this.acceleration.copy();

  this.generateVelocity = function(x,y){
    this.velocity.add(new p5.Vector(x-this.position.x,y-this.position.y));
    this.velocity.mult(0.2);
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

  this.applyNextState = function(settings){
    var time_measurement = 1;
    this.velocity.add(this.acceleration.mult(time_measurement));
    this.position.add(this.velocity.mult(time_measurement));
    this.prev_acc = this.acceleration;
    delete(this.acceleration);
    this.acceleration = new p5.Vector(0,0);

    this.trace.update(settings);
  }

  this.render = function(renderFunction,options){
    renderFunction(this,options);

    this.trace.render(options);
  }

  function Trace(obj){
    this.coords = [];
    this.update = function(options){
      if (options && options.show_trace){
          if(this.coords.length >= 180){
            this.coords.splice(0,1);
          }
          this.coords.push({x:obj.position.x,y:obj.position.y})
      }else{
        if(this.coords.length){
          this.coords = [];
        }
      }
    }
    this.render = function(options){
      if (options.show_trace){
          stroke(150);
          for (var i = 0; i < this.coords.length-1;i++){
            line(this.coords[i].x/options.scale,this.coords[i].y/options.scale,this.coords[i+1].x/options.scale,this.coords[i+1].y/options.scale);
          }
      }
    }
  }
  this.trace = new Trace(this);
}
