var userState = {
  busy:false,
  currentAction:'idle',
  data:{},
  setBusy:function(){
    this.busy = true;
  },
  setFree:function(){
    this.busy = false;
  },
  saveData:function(param){
    if (typeof param == 'object'){
      for (var name in param){
        this.data[name] = param[name];
      }
    }
  },
  getData:function(name){
    if (this.data.hasOwnProperty(name)){
      return this.data[name];
    }else{
      return null;
    }
  },
  resetData:function(){
    this.data = {};
  }
}

var availableHandlers = {
  idle:{
    pressedEventHandler: function(state){
      state.saveData({
        startX:mouseX,
        startY:mouseY,
        origOffsetX:settings.offset.x,
        origOffsetY:settings.offset.y,
      })
    },
    releasedEventHandler: function(state){
      state.resetData();
    },
    draggedEventHandler: function(state){
      settings.offset.x = state.getData('origOffsetX')+(mouseX - state.getData('startX'));
      settings.offset.y = state.getData('origOffsetY')+(mouseY - state.getData('startY'));
    },
    wheelEventHandler: function(state,wheelEvent){
      if (settings.scale + wheelEvent.delta >0){
        var temp_x = (mouseX-settings.offset.x)*settings.scale;
        var temp_y = (mouseY-settings.offset.y)*settings.scale;
        settings.scale *= pow(2,round(wheelEvent.delta/Math.abs(wheelEvent.delta)));
        settings.offset.x = mouseX-temp_x/settings.scale;
        settings.offset.y = mouseY-temp_y/settings.scale;
      }
      document.getElementById('scale').value = settings.scale;
    },
  },
  adding_object:{
    pressedEventHandler: function(state){
          var identifier = millis();
          grid.create_object({
            id:identifier,
            position: (new p5.Vector(mouseX-settings.offset.x,mouseY-settings.offset.y)).mult(settings.scale)
          },default_settings.create_object);
          state.saveData({id:identifier});
    },
    releasedEventHandler: function(state){
      return this.finishAddingNewObject(state);
    },
    draggedEventHandler: function(state){
      // line(state.getData('start_point').x,state.getData('start_point').y,mouseX,mouseY);
    },
    wheelEventHandler: function(state,wheelEvent){
      var obj = grid.findById(state.getData('id'));
      if (obj){
        obj.setMass(obj.getMass()*pow(10,wheelEvent.delta/-100));
      }
    },
    abortAddingNewObject:function(state){
        //TODO: delete from the grid that temp obj
        state.setFree();
        state.currentAction = 'idle';
        state.resetData();
        console.debug('creating object aborted');
        return state;
    },
    finishAddingNewObject:function(state){
        console.debug('creating object finished');
        grid.findById(state.getData('id')).generateVelocity((mouseX-settings.offset.x)*settings.scale,(mouseY-settings.offset.y)*settings.scale);
        grid.findById(state.getData('id')).setActive();
        state.setFree();
        state.currentAction = 'idle';
        state.resetData();
        return state;
    },
  }
}

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

function mousePressed(){
  availableHandlers[userState.currentAction].pressedEventHandler(userState);
}

function mouseReleased(){
  availableHandlers[userState.currentAction].releasedEventHandler(userState);
}

function mouseDragged(){
  availableHandlers[userState.currentAction].draggedEventHandler(userState);
}

function mouseWheel(event){
  availableHandlers[userState.currentAction].wheelEventHandler(userState,event);
}

function updateScale(value){
  settings.scale = value;
}

function toggleLayout(){
  settings.show_layout = !settings.show_layout;
}

function initDemo(){
  $.get('demos/demo1.js')
    .done(function(data){
        alert('true')
    });
  // grid = new Grid(demo);
}
