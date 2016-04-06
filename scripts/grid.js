function Grid(demo_json){
  this.grid = [];
  this.map = {};

  this.create_object = function(params,default_params){
    var id = params.id;
    if(!params.hasOwnProperty('position'))params.position = default_params.position;
    if(!params.hasOwnProperty('mass'))params.mass = default_params.mass;
    if(typeof params.velocity == 'string')params.velocity = exec(params.velocity);
    if(typeof params.position == 'string')params.position = exec(params.position);
    if (params.orbit_center_id){params.orbit_center = this.findById(params.orbit_center_id)}
    this.grid.push(new AstronomicObject(params));
    this.map[id] = this.grid.length - 1;
    updateDetailsTable(this.grid);
    return id;
  }

  this.destroy_object = function(object){
    if(settings.bind_offset_id == object.id){
      settings.bind_offset_id = null;
    }
    var position_in_grid_array = this.map[object.id];
    for (var record_id in this.map){
      if (this.map[record_id]>position_in_grid_array){
        this.map[record_id]--;
      }
    }
    delete(this.map[object.id]);

    // this.grid[position_in_grid_array] = null;
    this.grid.splice(position_in_grid_array,1);
    updateDetailsTable(this.grid);
  }

  this.findById = function(id){
    if (this.map.hasOwnProperty(id) && this.map[id] in this.grid){
      return this.grid[this.map[id]];
    }else{
      return null;
    }
  }

  if(typeof demo_json != 'undefined'){
    for(var id in demo_json.objects){
      var current_obj = demo_json.objects[id];
      var identifier = this.create_object(current_obj,default_settings);
      this.findById(identifier).setActive();
    }
    for (var property in demo_json.app_settings){
        if (settings.hasOwnProperty(property)){
          settings[property] = demo_json.app_settings[property];
        }
    }
  }

  this.computeNextState = function(settings){
    var array = this.grid;
    if (array.length >= 1){
    for (var i = 0; i < array.length -1 ; i++) {
        for (var j = i+1; j < array.length; j++) {
            if (!array[i] || !array[j]){continue;}
            if (!array[i].isActive() || !array[j].isActive()){continue;}
            var temp_vector = p5.Vector.sub(array[i].position, array[j].position);
            var distance = temp_vector.magSq();

            var is_open_angle = 3/4*PI < p5.Vector.angleBetween(array[j].velocity,array[i].velocity) && 5/4*PI > p5.Vector.angleBetween(array[j].velocity,array[i].velocity) ;
            var probably_hit = is_open_angle&&(array[j].velocity.mag()+array[i].velocity.mag())>temp_vector.mag();
            if(probably_hit){
              //detailed analysis required
              console.warn('something strange happened here');
            }
            var surfaces_contacted = temp_vector.mag() <= (array[i].radius+array[j].radius)/2;
            if (surfaces_contacted || probably_hit){
              // impact happened
              // TODO: process collisions, explosions or merge

              if(array[i].getMass()>array[j].getMass()){
                 array[i].velocity.add(array[j].velocity.mult(array[j].getMass()).div(array[i].getMass()));
                 array[i].setMass(array[i].getMass()+array[j].getMass());
                 this.destroy_object(array[j]);
               }else{
                 array[j].velocity.add(array[i].velocity.mult(array[i].getMass()).div(array[j].getMass()));
                 array[j].setMass(array[i].getMass()+array[j].getMass());
                 this.destroy_object(array[i]);
               }

            }else{
              //impact didn't happened - process as usual
              array[i].acceleration.add(temp_vector.mult(-1).normalize().mult(G*array[j].getMass()/distance));
              array[j].acceleration.add(temp_vector.mult(-1).normalize().mult(G*array[i].getMass()/distance));
            }
        }
    }
  }
  if(array.indexOf(null)>=0){array.splice(array.indexOf(null),1);};
    for (var i = 0; i < array.length; i++) {
      array[i].applyNextState(settings);
    }

  }

  this.render = function(settings){
    function showLayout(settings){
        var da = 1;
        var inc = 10;
        do{
          inc*=10;
          var da = inc/(settings.scale);
        }while(da<200);

        var d = da;

        stroke(color(250,100,100));
        strokeWeight(0.02);
        for (var i=settings.offset.x%(.04*d);i<windowWidth;i+=d*.04){
          line(i,0,i,windowHeight);
        }
        for (var j=settings.offset.y%(.04*d);j<windowHeight;j+=d*.04){
          line(0,j,windowWidth,j);
        }
        strokeWeight(0.1);
        for (var i=settings.offset.x%(.2*d);i<windowWidth;i+=d*.2){
          line(i,0,i,windowHeight);
        }
        for (var j=settings.offset.y%(.2*d);j<windowHeight;j+=d*.2){
          line(0,j,windowWidth,j);
        }
        strokeWeight(0.5);
        for (var i=settings.offset.x%d;i<windowWidth;i+=d){
          line(i,0,i,windowHeight);
        }
        for (var j=settings.offset.y%d;j<windowHeight;j+=d){
          line(0,j,windowWidth,j);
        }
    }
    if (settings.show_layout){
      showLayout(settings);
    }
    if(settings.bind_offset_id){
      var bound_obj = this.findById(settings.bind_offset_id);
      settings.offset.x = -bound_obj.position.x/settings.scale + windowWidth/2;
      settings.offset.y = -bound_obj.position.y/settings.scale + windowHeight/2;
    }
    strokeWeight(0.8);
    translate(settings.offset.x, settings.offset.y);
    for (var each of this.grid){
      each.render(renderAstronomicalObject,settings);
    }
  }
}
