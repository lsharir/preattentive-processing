// generateShapes : generate shapes througout the screen with 1 target (in a central area)
// returns targetArea = [target_x, target_y]
// targetCreationFunction(x, y, size) - must return creation coordinates
// nonTargetCreationFunction(x, y, size)
// shapeSize - required for spacing (shapeSize == size)
// spacingSize - how far objects will be place between another
// screenWidth - p.windowWidth
// screenHeight - p.windowHeight

var generateShapes = function (targetCreationFunction, nonTargetCreationFunction, shapeSize, spacingSize, screenWidth, screenHeight) {
  var step = shapeSize + spacingSize,
    targetGenerated = false,
    targetCoordinates = [0, 0],
    targetArea = [
      screenWidth / 4 + Math.random() * screenWidth / 2,
      screenHeight / 4 + Math.random() * screenHeight / 2
    ];

  for (var x = 0; x < screenWidth; x += step) {
    for (var y = 0; y < screenHeight; y += step) {
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
    targetCoordinates = targetCreationFunction(targetArea[0], targetArea[1], shapeSize);
    targetGenerated = true;
  }

  return targetCoordinates;
}
