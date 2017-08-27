var NUM_OF_QUESTIONS = 4;

var app = angular.module("experimentApp", ["firebase"])
  .constant('FIREBASE_CONFIG', {})
  .controller('experimentCtrl', function ($scope, $timeout, $interval, $firebaseArray, FIREBASE_CONFIG) {
    var ref = firebase.database().ref().child('results'),
      results = $firebaseArray(ref);

    var startTime = Date.now();

    $scope.currentQuestion = 0;

    $scope.selectAnswer = function () {
      if ($scope.currentQuestion >= NUM_OF_QUESTIONS - 1) {
        return completed();
      }

      $scope.currentQuestion++;
    };

    function completed() {
      $scope.totalTime = Date.now() - startTime;
      $scope.completed = true;
      results.$add({
        deltas: ['100','100'],
        duration: $scope.totalTime
      });
    }
  })
  ;