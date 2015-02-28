angular.module('app')
.directive('flow', function () {
  return {
    restrict: 'E',
    template: '<div class="form-control" contenteditable="true" ng-model="flow.text"></div>{{flow.text}}',
    controller: function ($scope) {
      $scope.flow = {
        text: '<span class="underline"><i class="fa fa-twitter-square fa-lg"></i> twitter</span>'
      };
      var terms = [
        {
          listenFor: 'twitter',
          iconClass: 'fa fa-twitter-square'
        }
      ]
    }
  }
});
