var app = angular.module("resultsApp", ["firebase"])
  .controller('resultsCtrl', function ($scope, $timeout, $firebaseArray) {
    var ref = firebase.database().ref().child('results'),
      resultsDatabaseRef = $firebaseArray(ref);

      resultsDatabaseRef.$watch(function () {
        var parsedData = {
          0 : [],
          1 : [],
          2 : [],
          3 : []
        };

        resultsDatabaseRef.forEach(function (entry) {
          entry.responses.forEach(function (taskResponse, index) {
            if (taskResponse.delta >= 0) {
              parsedData[index].push(taskResponse.delta);
            }
          });
        });

        $scope.parsedData = parsedData;
      });
  })
  ;