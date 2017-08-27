var app = angular.module("resultsApp", ["firebase"])
  .controller('resultsCtrl', function ($scope, $timeout, $firebaseArray) {
    var ref = firebase.database().ref().child('results'),
      resultsDatabaseRef = $firebaseArray(ref);

      resultsDatabaseRef.$watch(function () {
        var parsedData = [
          [],[],[],[]
        ];

        resultsDatabaseRef.forEach(function (entry) {
          entry.responses.forEach(function (taskResponse, index) {
            if (taskResponse.delta >= 0 && taskResponse.delta <= 3000) {
              parsedData[index].push(taskResponse.delta);
            }
          });

          refreshData(parsedData);
        });

        $scope.parsedData = parsedData;
      });
  })
  ;