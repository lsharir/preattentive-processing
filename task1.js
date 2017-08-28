var task1 = function (p) {
  // Setup Parameters
  var object_relative_size = 70;
  var target_relative_position = 0.1;
  var num_shapes = 30;
  var rand_x, rand_y, target_idx, target_x, target_y;
  var start_datetime, stop_datetime, time_delta;
  var listeners = [];

  // Experiment Parameters
  var target_r = 0, target_g = 0, target_b = 250; // target color
  var non_target_r = 0, non_target_g = 0, non_target_b = 250; // non-target color
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

    function targetCreationFunction(x, y, shapeSize) {
      // Added a manual correction to the target placement
      y += shapeSize / 4;
      p.strokeWeight(0);      
      p.fill(non_target_r, non_target_g, non_target_b);
      p.triangle(x - 0.5 * shapeSize, y, x + 0.5 * shapeSize, y, x, y - 0.8 * shapeSize);
      
      // return the target creation coordinates - important!
      return [x, y];
    }

    function nonTargetCreationFunction(x, y, shapeSize) {
      p.strokeWeight(0);      
      p.fill(non_target_r, non_target_g, non_target_b);
      p.ellipse(x, y, shapeSize, shapeSize);
    }

    var targetCoordinates = generateShapes(targetCreationFunction, nonTargetCreationFunction, object_relative_size, object_relative_size * 0.7, p.windowWidth, p.windowHeight);

    target_x = targetCoordinates[0];
    target_y = targetCoordinates[1];

    start_datetime = new Date();
  }


  p.draw = function () {
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
