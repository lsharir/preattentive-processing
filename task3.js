var task3 = function (p) {
  // Setup Parameters
  var object_relative_size = 70;
  var target_relative_position = 0.1;
  var num_shapes = 30;
  var rand_x, rand_y, target_idx, target_x, target_y;
  var start_datetime, stop_datetime, time_delta;
  var listeners = [];

  // Experiment Parameters
  var target_r=86, target_g=105, target_b=172; // target color
  var non_target_r=206, non_target_g=72, non_target_b=42; // non-target color
  var target_shape = "triangle", non_target_shape = "ellipse"; // shape definitions (ellipse or triangle only)

  p.addListener = function (fn) {
    listeners.push(fn);
  }

  p.answer = function (response) {
    listeners.forEach(function (fn) {
      fn(response);
    })
    p.remove();
  };

  p.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);

    target_idx = p.getRandomInt(0, num_shapes);
    for (var i = 0; i < num_shapes; i++) {
      rand_x = Math.random();
      rand_y = Math.random();
      p.strokeWeight(0);
      p.stroke(0, 0, 0);
      if (i == target_idx) {
        // Ensuring target has padding in canvas
        target_x = Math.max(Math.min(rand_x*p.windowWidth, p.windowWidth-(2*object_relative_size)), 2*object_relative_size);
        target_y = Math.max(Math.min(rand_y*p.windowHeight, p.windowHeight-(2*object_relative_size)), 2*object_relative_size);
      } else {
        p.fill(non_target_r, non_target_g, non_target_b);
        if (non_target_shape == "ellipse") {
          p.ellipse(rand_x * p.windowWidth, rand_y * p.windowHeight, object_relative_size, object_relative_size);
        } else if (non_target_shape == "triangle") {
          p.triangle((rand_x * p.windowWidth) - 0.5 * object_relative_size, (rand_y * p.windowHeight), (rand_x * p.windowWidth) + 0.5 * object_relative_size, (rand_y * p.windowHeight), (rand_x * p.windowWidth), (rand_y * p.windowHeight) - 0.8 * object_relative_size);
        } else {
          p.remove()
        }
      }
    }
    start_datetime = new Date();
  }
  p.draw = function () {

    //// Draw a target circle
    p.strokeWeight(0);
    p.stroke(0, 0, 0);
    p.fill(target_r, target_g, target_b);
    if (target_shape == "ellipse") {
      p.ellipse(target_x, target_y, object_relative_size, object_relative_size);
    } else if (target_shape == "triangle") {
      p.triangle((target_x) - 0.5 * object_relative_size, (target_y), (target_x) + 0.5 * object_relative_size, (target_y), (target_x), (target_y) - 0.8 * object_relative_size);
    } else {
      p.remove()
    }
  }

  // When the user clicks the mouse
  p.mousePressed = function () {
    // Check if mouse is inside the circle
    //var d = dist(p.mouseX, p.mouseY, target_relative_position*p.windowWidth, target_relative_position*p.windowHeight);
    var d = p.dist(p.mouseX, p.mouseY, target_x, target_y);
    if (d < object_relative_size) {
      // Measure time interval
      stop_datetime = new Date();
      time_delta = (stop_datetime.getTime() - start_datetime.getTime());
      p.answer({ valid: true, delta: time_delta });

      // Pick new random color values
      target_r = p.random(255);
      target_g = p.random(255);
      target_b = p.random(255);
    }
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}
