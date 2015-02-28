angular.module('app')
.controller('navCtrl', function($scope, $state){
  //$scope.hello = "hello";
  //$scope.active =
  $scope.testState = function () {
    alert($state.is('home'));
  };
  $scope.state = $state;
});
