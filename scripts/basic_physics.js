console.log('physics loaded');
sqr = (x)=>x*x;

function Point(x,y){
  this.x = x;
  this.y = y;
}

function Vector(x,y){
  this.x = x;
  this.y = y;

  this.addVector = function (other_vector){
    this.x += other_vector.x;
    this.y += other_vector.y;
    return this;
  }

  this.lengthSquared = function(){
    return sqr(this.x)+sqr(this.y);
  }

  this.length = function(){
    return sqrt(sqr(this.x)+sqr(this.y));
  }

}

Acceleration = function(x,y){
  this.__proto__ = new Vector(x,y )
};

Force = function(x,y){
  this.__proto__ = new Vector(x,y )
};
