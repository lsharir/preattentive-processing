
// for red, green, and blue color values
var r, g, b;
var object_relative_size = 100;
var target_relative_position = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  // Pick colors randomly
  r = random(10);
  g = random(255);
  b = random(10);

  var rand_x, rand_y;
  for (var i = 0; i < 50  ; i ++) {
    rand_x = Math.random();
    rand_y = Math.random();
    strokeWeight(2);
    stroke(0, 0, 0);
    fill(255, 255, 255, 127);
    ellipse(rand_x*windowWidth, rand_y*windowHeight, object_relative_size, object_relative_size);
  }
}

function draw() {

  // Draw a target circle
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(target_relative_position*windowWidth, target_relative_position*windowHeight, object_relative_size, object_relative_size);

  // Draw a circle
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(255, 255, 255, 127);
  ellipse(0.2*windowWidth, 0.2*windowHeight, object_relative_size, object_relative_size);

  // Draw a circle
  strokeWeight(2);
  stroke(0, 0, 0);
  fill(255, 255, 255, 127);
  ellipse(0.6*windowWidth, 0.8*windowHeight, object_relative_size, object_relative_size);


}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle
  var d = dist(mouseX, mouseY, target_relative_position*windowWidth, target_relative_position*windowHeight);
  if (d < object_relative_size) {
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
