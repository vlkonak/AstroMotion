function initAddingNewObject(){
  if (userState.busy){
    return false;
  }else{
    userState.setBusy();
    userState.currentAction = 'adding_object';
  }
}

// TODO: CHANGE THESE TWO FUNCS
// DRAWING LOOP SHOULD NOT STOP.
// USE SOME IS_TIME_STOPPED GLOBAL VAR
function pauseRender(){
  noLoop();
  settings.paused = true;
}

function resumeRender(){
  loop();
  settings.paused = false;
}


function updateScale(value){
  settings.scale = value;
}

function toggleLayout(){
  settings.show_layout = !settings.show_layout;
}

function toggleTraces(){
  settings.show_trace = !settings.show_trace;
}

function toggleOrbits(){
  settings.show_orbits = !settings.show_orbits;
}


function toggleDetails(){
  settings.show_object_properties = !settings.show_object_properties;
  settings.show_direction_for_acceleration = !settings.show_direction_for_acceleration;
  settings.show_direction_for_velocity = !settings.show_direction_for_velocity;
}

function updateDetailsTable(objects_array){
  $('#details-table').html('');
  for (var i in objects_array){
    var obj = objects_array[i];
    if (obj){
      $('#details-table').append(
        '<li id="'+obj.id+'" onclick="selectObject('+obj.id+');">'
         + obj.name
         +'</li>'
      );
    }
  }
};

function selectObject(id){
  updateDetailsTable(grid.grid);
  if (settings.bind_offset_id == parseInt(id)){
    settings.bind_offset_id = null;
  }else{
    settings.bind_offset_id = parseInt(id);
    $('#'+id).addClass('selected');
  }
}

function initDemo(){
  $.get('demos/demo1.js')
    .done(function(data){
        alert('true')
    });
  // grid = new Grid(demo);
}

$('.collapsed').mouseover(function(){
  $(this).removeClass('collapsed');
})

$('.collapsed').mouseout(function(){
  $(this).addClass('collapsed');
})
