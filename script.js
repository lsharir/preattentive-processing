var NUM_OF_QUESTIONS = 4;

var app = angular.module("experimentApp", ["firebase"])
  .constant('PHASES', {
    'SHOW_INSTRUCTIONS': 'SHOW_INSTRUCTIONS',
    'SHOW_TASK': 'SHOW_TASK',
    'TIMEOUT': 'TIMEOUT',
    'ANSWERED': 'ANSWERED'
  })
  .constant('QUESTIONS', [
    { instructions: 'Touch the triangle', task : task1 },
    { instructions: 'Touch the blue circle', task: task2  },
    { instructions: 'Touch the blue triangle', task: task3  },
    { instructions: 'Touch the blue triangle', task: task4  }
  ])
  .controller('experimentCtrl', function ($scope, $timeout, $firebaseArray, PHASES, QUESTIONS) {
    var ref = firebase.database().ref().child('results'),
      resultsDatabaseRef = $firebaseArray(ref),
      startTime,
      questionTimeout,
      responses = [];

    $scope.QUESTIONS = QUESTIONS;
    $scope.began = false;

    // Starts the questionnaire
    $scope.beginQuestionnaire = function() {
      $scope.began = true;
      startTime = Date.now();
      nextQuestion();
    };

    function nextQuestion() {
      // Question navigation logic
      if (isNaN($scope.currentQuestion)) {
        $scope.currentQuestion = 0;
      } else {
        if ($scope.currentQuestion >= NUM_OF_QUESTIONS - 1) {
          return completed();
        }

        $scope.currentQuestion++;
      }

      // Start with instruction phase
      $scope.questionPhase = PHASES.SHOW_INSTRUCTIONS;

      // Go to task phase after 5 seconds
      $timeout(function () {
        // Actually call the task
        var task = new p5(QUESTIONS[$scope.currentQuestion].task);

        // Updated the question phase
        $scope.questionPhase = PHASES.SHOW_TASK;

        // Handle task responses
        task.addListener(function (response) {
          answerQuestion($scope.currentQuestion, { valid : response.valid, delta: response.delta });
        });

        // Task phase timeout
        questionTimeout = $timeout(function () {
          $scope.questionPhase = PHASES.TIMEOUT;
          task.answer({ valid : false, delta : -1 });
        }, 10 * 1000);
      }, 5 * 1000);
    }

    function answerQuestion(qIndex, response) {
      // Update question phase
      $scope.questionPhase = PHASES.ANSWERED;
      // Cancel task timeout
      $timeout.cancel(questionTimeout);
      // Record response
      responses[qIndex] = response;
      // Call nextQuestion (wrapped in $apply - answerQuestion is called outside angular)
      $scope.$apply(nextQuestion);
    }

    function completed() {
      $scope.totalTime = Date.now() - startTime;
      $scope.completed = true;

      resultsDatabaseRef.$add({
        responses: responses,
        duration: $scope.totalTime
      });
    }
  })
  ;
