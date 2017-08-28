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
      p.fill(non_target_r, non_target_g, non_target_b);
      p.triangle(x - 0.5 * shapeSize, y, x + 0.5 * shapeSize, y, x, y - 0.8 * shapeSize);
      
      // return the target creation coordinates - important!
      return [x, y];
    }

    function nonTargetCreationFunction(x, y, shapeSize) {
      p.fill(non_target_r, non_target_g, non_target_b);
      p.ellipse(x, y, shapeSize, shapeSize);
    }

    var targetCoordinates = p.generateShapes(targetCreationFunction, nonTargetCreationFunction, object_relative_size, object_relative_size * 0.7, p.windowWidth, p.windowHeight);

    target_x = targetCoordinates[0];
    target_y = targetCoordinates[1];

    start_datetime = new Date();
  }

  // generateShapes : generate shapes througout the screen with 1 target (in a central area)
  // returns targetArea = [target_x, target_y]
  // targetCreationFunction(x, y, size) - must return creation coordinates
  // nonTargetCreationFunction(x, y, size)
  // shapeSize - required for spacing (shapeSize == size)
  // spacingSize - how far objects will be place between another
  // screenWidth - p.windowWidth
  // screenHeight - p.windowHeight

  p.generateShapes = function (targetCreationFunction, nonTargetCreationFunction, shapeSize, spacingSize, screenWidth, screenHeight) {
    p.strokeWeight(0);

    var step = shapeSize + spacingSize,
      targetGenerated = false,
      targetCoordinates = [0,0],
      targetArea = [
        screenWidth / 4 + Math.random() * screenWidth / 2,
        screenHeight / 4 + Math.random() * screenHeight / 2
      ];

    for (var x = 0; x < screenWidth; x+= step) {
      for (var y = 0; y < screenHeight; y+= step) {
        rand_x = x + shapeSize / 2 + Math.random() * spacingSize;
        rand_y = y + shapeSize / 2 + Math.random() * spacingSize;
        
        if (!targetGenerated && Math.abs(x - targetArea[0]) < shapeSize && Math.abs(y - targetArea[1]) < shapeSize) {
          targetCoordinates = targetCreationFunction(rand_x, rand_y, shapeSize);
          targetGenerated = true;
          continue;
        }
        
        nonTargetCreationFunction(rand_x, rand_y, shapeSize);
      }
    }

    // Safety, always generate 1 target!
    if (!targetGenerated) {
      targetCreationFunction(targetArea[0], targetArea[1], shapeSize);
      targetCoordinates = targetArea;
      targetGenerated = true;
    }

    return targetCoordinates;
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
