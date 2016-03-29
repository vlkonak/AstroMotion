/*
* Here should be functions for rendering
* objects and whole space, depending on settings
*
* Objects should have orbits (and traces),
* arrow-drawned vectors for velocity and acceleration
*
* Rendering net on the background
* (to visualize moving camera and scaling)
*
* NOTE: these functions should have no dependencies from global variables
* They will be passed to objects' render funcs as callbacks
*/

function renderAstronomicalObject(astronimaclObject,options){
  var rx = p5.Vector.div(astronimaclObject.position,options.scale).x;
  var ry = p5.Vector.div(astronimaclObject.position,options.scale).y;
  if(!astronimaclObject.isActive()){
      noFill();
      if(astronimaclObject.position){
        stroke(55);
        ellipse(rx,ry,astronimaclObject.radius/options.scale,astronimaclObject.radius/options.scale);
        line(rx,ry,mouseX-options.offset.x,mouseY-options.offset.y);
      }else{
        console.debug('rendering failed');
      }
  }else{
    // TODO: get sure it has coordinates and activated
    // > TODO: simple circle of definite colour and radius
    fill(color(200,200,200));
    stroke(40);
    ellipse(rx,ry,astronimaclObject.radius/options.scale,astronimaclObject.radius/options.scale);
    // TODO: check if to show orbit
    // TODO: check if to show spin

    if (options.show_direction_for_acceleration){
      // GREEN - acc
      stroke(color(0,100,0));
      var temp = sqrt(astronimaclObject.prev_acc.mag());
      astronimaclObject.prev_acc.normalize().mult(temp);
      line(rx,ry,rx+astronimaclObject.prev_acc.x,ry+astronimaclObject.prev_acc.y);
      text('  acc:'+astronimaclObject.prev_acc.mag().toFixed(3),rx+20,ry+35);
    }
    if (options.show_direction_for_velocity){
      //BLUE - speed
      stroke(color(0,0,100));
      line(rx,ry,rx+astronimaclObject.velocity.x/options.scale,ry+astronimaclObject.velocity.y/options.scale);
      text('speed:'+astronimaclObject.velocity.mag().toFixed(3),rx+20,ry+20);
    }
  }
}
