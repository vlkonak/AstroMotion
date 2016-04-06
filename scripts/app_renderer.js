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

function renderAstronomicalObject(astronomicalObject,options){
  var rx = p5.Vector.div(astronomicalObject.position,options.scale).x;
  var ry = p5.Vector.div(astronomicalObject.position,options.scale).y;
  if(!astronomicalObject.isActive()){
      noFill();
      if(astronomicalObject.position){
        stroke(55);
        ellipse(rx,ry,astronomicalObject.radius/options.scale,astronomicalObject.radius/options.scale);
        line(rx,ry,mouseX-options.offset.x,mouseY-options.offset.y);
      }else{
        console.debug('rendering failed');
      }
  }else{
    fill(color(200,200,200));
    stroke(40);
    ellipse(rx,ry,astronomicalObject.radius/options.scale,astronomicalObject.radius/options.scale);
    // TODO: check if to show spin

    if (options.show_direction_for_acceleration){
      // GREEN - acc
      stroke(color(0,100,0));
      var temp = sqrt(astronomicalObject.prev_acc.mag());
      astronomicalObject.prev_acc.normalize().mult(temp);
      line(rx,ry,rx+astronomicalObject.prev_acc.x,ry+astronomicalObject.prev_acc.y);
      text('  acc:'+astronomicalObject.prev_acc.mag().toFixed(3),rx+20,ry+35);
    }
    if (options.show_direction_for_velocity){
      //BLUE - speed
      stroke(color(0,0,100));
      line(rx,ry,rx+astronomicalObject.velocity.x/options.scale,ry+astronomicalObject.velocity.y/options.scale);
      text('speed:'+astronomicalObject.velocity.mag().toFixed(3),rx+20,ry+20);
    }
    text('  '+astronomicalObject.name,rx+5,ry);
  }
}
