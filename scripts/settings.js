const G_SI = 0.0000000000667408;//meter^3*second^-2*kilogramm^-1
const G    = .06 ;

const default_settings = {
  // appearance:{
    scale:500000,
    // show_object_properties:true,
    show_object_properties:false,
    // show_direction_for_acceleration:true,
    show_direction_for_acceleration:false,
    // show_direction_for_velocity:true,
    show_direction_for_velocity:false,
    show_layout: false,
    offset:{
      x:0,
      y:0
    },
  // },

  create_object: {
    mass: 50000000,
    spin: 0,
  }
};

var settings = default_settings;
