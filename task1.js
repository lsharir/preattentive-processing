var task1 = function(p) {
  // Setup Parameters
  var object_relative_size = 100;
  var target_relative_position = 0.1;
  var num_shapes = 20;
  var rand_x, rand_y, target_idx, target_x, target_y;
  var start_datetime, stop_datetime, time_delta;

  // Experiment Parameters
  var target_r=0, target_g=190, target_b=0; // target color
  var non_target_r=155, non_target_g=155, non_target_b=155; // non-target color
  var target_shape = "ellipse", non_target_shape="triangle"; // shape definitions (ellipse or triangle only)


  p.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  p.setup = function() {
    p.createCanvas(windowWidth, windowHeight);
    p.background(255, 255, 255);

    target_idx = p.getRandomInt(0, num_shapes);
    for (var i = 0; i < num_shapes; i ++) {
      rand_x = Math.random();
      rand_y = Math.random();
      p.strokeWeight(2);
      p.stroke(0, 0, 0);
      if (i == target_idx) {
        target_x = rand_x*windowWidth;
        target_y = rand_y*windowHeight;
      } else {
        p.fill(non_target_r, non_target_g, non_target_b, 127);
        if (non_target_shape == "ellipse") {
          p.ellipse(rand_x*windowWidth, rand_y*windowHeight, object_relative_size, object_relative_size);
        } else if (non_target_shape == "triangle") {
          p.triangle((rand_x*windowWidth)-0.5*object_relative_size, (rand_y*windowHeight), (rand_x*windowWidth)+0.5*object_relative_size, (rand_y*windowHeight), (rand_x*windowWidth), (rand_y*windowHeight)-0.8*object_relative_size);
        } else {
          p.remove()
        }
      }
    }
     start_datetime = new Date();
  }
  p.draw = function() {

    //// Draw a target circle
    p.strokeWeight(2);
    p.stroke(0, 0, 0);
    p.fill(target_r, target_g, target_b, 127);
    if (target_shape == "ellipse") {
      p.ellipse(target_x, target_y, object_relative_size, object_relative_size);
    } else if (target_shape == "triangle") {
      p.triangle((target_x)-0.5*object_relative_size, (target_y), (target_x)+0.5*object_relative_size, (target_y), (target_x), (target_y)-0.8*object_relative_size);
    } else {
      p.remove()
    }
  }

  // When the user clicks the mouse
  p.mousePressed = function() {
    // Check if mouse is inside the circle
    //var d = dist(mouseX, mouseY, target_relative_position*windowWidth, target_relative_position*windowHeight);
    var d = p.dist(mouseX, mouseY, target_x, target_y);
    if (d < object_relative_size) {
      // Measure time interval
      stop_datetime = new Date();
      time_delta = (stop_datetime.getTime() - start_datetime.getTime()) / 1000;
      console.log(time_delta);

      // Pick new random color values
      target_r = p.random(255);
      target_g = p.random(255);
      target_b = p.random(255);
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(windowWidth, windowHeight);
  }

}
