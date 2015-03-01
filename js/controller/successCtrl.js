angular.module('app')
.controller('successCtrl', function ($scope, successData) {
  $scope.data = successData.getData();
  function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }
  $scope.openFlow = function () {
    OpenInNewTab($scope.data.url);
  }
});