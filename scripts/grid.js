function Grid(demo_json){
  this.grid = [];
  this.map = {};

  this.create_object = function(params,default_params){
    var id = params.id;
    if(!params.hasOwnProperty('position'))params.position = default_params.position;
    if(!params.hasOwnProperty('mass'))params.mass = default_params.mass;
    if(typeof params.velocity == 'string')params.velocity = exec(params.velocity);
    if(typeof params.position == 'string')params.position = exec(params.position);
    this.grid.push(new AstronomicObject(params));
    this.map[id] = this.grid.length - 1;
    return id;
  }

  this.findById = function(id){
    return this.grid[this.map[id]];
  }

  if(typeof demo_json != 'undefined'){
    for(var id in demo_json.objects){
      var current_obj = demo_json.objects[id];
      console.log(id);
      var identifier = this.create_object(current_obj,default_settings);
      console.log('object is kind of created');
      this.findById(identifier).setActive();
    }
  }

  this.computeNextState = function(){
    var array = this.grid;
    if (array.length >= 1){
    for (var i = 0; i < array.length -1 ; i++) {
        for (var j = i+1; j < array.length; j++) {
            if (!array[i].isActive() || !array[j].isActive()){continue;}
            var temp_vector = p5.Vector.sub(array[i].position, array[j].position);
            var distance = temp_vector.magSq();
            if (temp_vector.mag() <= (array[i].radius+array[j].radius)/2){
              // impact happened
              // TODO: process collisions, explosions or merge

              if(array[i].getMass()>array[j].getMass()){
                 array[i].velocity.add(array[j].velocity.mult(array[j].getMass()).div(array[i].getMass()));
                 array[i].setMass(array[i].getMass()+array[j].getMass());
                 array.splice(j,1);
               }else{
                 array[j].velocity.add(array[i].velocity.mult(array[i].getMass()).div(array[j].getMass()));
                 array[j].setMass(array[i].getMass()+array[j].getMass());
                 array.splice(i,1);
               }

            }else{
              //impact didn't happened - process as usual
              array[i].acceleration.add(temp_vector.mult(-1).normalize().mult(G*array[j].getMass()/distance));
              array[j].acceleration.add(temp_vector.mult(-1).normalize().mult(G*array[i].getMass()/distance));
            }
        }
    }
  }
    for (var i = 0; i < array.length; i++) {
      array[i].applyNextState();
    }

  }

  this.render = function(settings){
    // TODO
    var da = 50000/settings.scale;
    var d = da;
    // if(da%40>20){
    //   d = d+20;
    // }
    // if(da%40<20){
    //   d = d-20;
    // }
    function showLayout(settings){
        translate(-settings.offset.x, -settings.offset.y);
        stroke(color(250-da/10,220-da/10,220-da/10));
        for (var i=settings.offset.x%d;i<windowWidth;i+=d){
          line(i,0,i,windowHeight);
        }
        for (var j=settings.offset.y%d;j<windowHeight;j+=d){
          line(0,j,windowWidth,j);
        }
        stroke(color(250,220-da/2,220-da/2));
        for (var i=settings.offset.x%d;i<windowWidth;i+=d*5){
          line(i,0,i,windowHeight);
        }
        for (var j=settings.offset.y%d;j<windowHeight;j+=d*5){
          line(0,j,windowWidth,j);
        }
        translate(settings.offset.x, settings.offset.y);
    }
    if (settings.show_layout){
      showLayout(settings);
    }
    for (var each of this.grid){
      each.render(renderAstronomicalObject,settings);
    }
  }
}
