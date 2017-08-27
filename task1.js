var task1 = function(p) {
  // for red, green, and blue color values
  var r, g, b;
  var object_relative_size = 100;
  var target_relative_position = 0.1;
  var listeners = [];

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255, 255, 255);
    // Pick colors randomly
    r = p.random(10);
    g = p.random(255);
    b = p.random(10);

    var rand_x, rand_y;
    for (var i = 0; i < 50; i++) {
      rand_x = Math.random();
      rand_y = Math.random();
      p.strokeWeight(2);
      p.stroke(0, 0, 0);
      p.fill(255, 255, 255, 127);
      p.ellipse(rand_x * p.windowWidth, rand_y * p.windowHeight, object_relative_size, object_relative_size);
    }
  }

  p.draw = function() {

    // Draw a target circle
    p.strokeWeight(2);
    p.stroke(r, g, b);
    p.fill(r, g, b, 127);
    p.ellipse(target_relative_position * p.windowWidth, target_relative_position * p.windowHeight, object_relative_size, object_relative_size);

    // Draw a circle
    p.strokeWeight(2);
    p.stroke(0, 0, 0);
    p.fill(255, 255, 255, 127);
    p.ellipse(0.2 * p.windowWidth, 0.2 * p.windowHeight, object_relative_size, object_relative_size);

    // Draw a circle
    p.strokeWeight(2);
    p.stroke(0, 0, 0);
    p.fill(255, 255, 255, 127);
    p.ellipse(0.6 * p.windowWidth, 0.8 * p.windowHeight, object_relative_size, object_relative_size);


  }

  p.addListener = function(fn) {
    listeners.push(fn);
  }

  p.answer = function (response) {
    listeners.forEach(function (fn) {
      fn(response);
    })
    p.remove();
  }

  // When the user clicks the mouse
  p.mousePressed = function() {
    // Check if mouse is inside the circle
    var d = p.dist(p.mouseX, p.mouseY, target_relative_position * p.windowWidth, target_relative_position * p.windowHeight);
    if (d < object_relative_size) {
      // Pick new random color values
      r = p.random(255);
      g = p.random(255);
      b = p.random(255);

      p.answer({ valid : true, delta : 100 });
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}