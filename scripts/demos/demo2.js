var demo = {
  objects:[
    {
      id:10,
      name:'Sun',
      mass:1.9885e20,//e30
      position: new p5.Vector(0,0),
      velocity: new p5.Vector(0,0),
    },
    {
      id:11,
      name:'Mercury',
      mass:3.33022e13,//e23
      position: new p5.Vector(58e6,0),//58e6
      velocity: new p5.Vector(0,-47e4),
    },
    {
      id:12,
      name:'Venus',
      mass:4.8675e14,//e24
      position: new p5.Vector(108e6,0),//108e6
      velocity: new p5.Vector(0,-35e4),
    },
    {
      id:13,
      name:'Earth',
      mass:5.9726e14,//e24
      position: new p5.Vector(150e6,0),//150e6
      velocity: new p5.Vector(0,-29e4),
    },
    {
      id:1301,
      name:'Moon',
      mass:7.3477e12,//e22
      // position: new p5.Vector(150e4+363e1,0),
      position: new p5.Vector(150e6,380e3),
      // velocity: new p5.Vector(0,-29e3+0.8e3),
      velocity: new p5.Vector(-1e4,-29e4),
    },
    {
      id:14,
      name:'Mars',
      mass:6.4185e13,//e23
      position: new p5.Vector(227e6,0),//
      velocity: new p5.Vector(0,-24.13e4),
    },
    {
      id:15,
      name:'Jupiter',
      mass:1.8986e17,//e27
      position: new p5.Vector(740.5e6,0),//
      velocity: new p5.Vector(0,-13.07e4),
    },
    {
      id:16,
      name:'Saturn',
      mass:5.6846e16,//e26
      position: new p5.Vector(1433.5e6,0),//
      velocity: new p5.Vector(0,-9.69e4),
    },
    {
      id:17,
      name:'Uranus',
      mass:8.6832e15,//e25
      position: new p5.Vector(2846.67e6,0),//
      velocity: new p5.Vector(0,-6.81e4),
    },
    {
      id:18,
      name:'Neptune',
      mass:1.0243e16,//e26
      position: new p5.Vector(4503.4e6,0),//
      velocity: new p5.Vector(0,-5.4349e4),
    },


    {
      id:1501,
      name:'Io',
      mass:8.9e12,//e22
      position: new p5.Vector(740.5e6,421e3),//
      velocity: new p5.Vector(17.33e4,-13.07e4),
    },
    {
      id:1502,
      name:'Europa',
      mass:4.8e12,//e22
      position: new p5.Vector(740.5e6,671e3),//
      velocity: new p5.Vector(13.74e4,-13.07e4),
    },
    {
      id:1503,
      name:'Ganymede',
      mass:1.5e13,//e23
      position: new p5.Vector(740.5e6,1.07e6),//
      velocity: new p5.Vector(10.8e4,-13.07e4),
    },
    {
      id:1504,
      name:'Callisto',
      mass:1.1e13,//e23
      position: new p5.Vector(740.5e6,1.882e6),//
      velocity: new p5.Vector(8.2e4,-13.07e4),
    },
  ]
}
