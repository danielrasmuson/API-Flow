angular.module('app')
.controller('successCtrl', function ($scope, successData) {
  $scope.data = successData.getData();
});