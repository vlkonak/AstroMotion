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
}

function resumeRender(){
  loop();
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

function toggleDetails(){
  settings.show_object_properties = !settings.show_object_properties;
  settings.show_direction_for_acceleration = !settings.show_direction_for_acceleration;
  settings.show_direction_for_velocity = !settings.show_direction_for_velocity;
}

function updateDetailsTable(objects_array){
  $('#details-table').html('');
  for (var i in objects_array){
    var obj = objects_array[i];
    $('#details-table').append(
      '<li id="'+obj.id+'" \
          onclick="\
            selectObject('+obj.id+');\
            updateDetailsTable(grid.grid);\
            $(\'#'+obj.id+'\').addClass(\'selected\');\
            ">'
       + obj.name
       +'</li>'
    );
  }
};

function selectObject(id){
  settings.bind_offset_id = parseInt(id);
}

function initDemo(){
  $.get('demos/demo1.js')
    .done(function(data){
        alert('true')
    });
  // grid = new Grid(demo);
}
