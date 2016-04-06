const G_SI = 0.0000000000667408;//meter^3*second^-2*kilogramm^-1
const G    = .06 ;

const default_settings = {
    scale:500000,
    paused: false,
    show_object_properties:false,
    show_direction_for_acceleration:false,
    show_direction_for_velocity:false,
    show_layout: false,
    show_trace: false,
    show_orbits:false,
    bind_offset_id: null,
    offset:{
      x:0,
      y:0
    },

  create_object: {
    mass: 50000000,
    spin: 0,
  }
};

settings = default_settings;
