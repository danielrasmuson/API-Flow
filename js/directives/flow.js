angular.module('app')
.directive('flow', function () {
  return {
    restrict: 'E',
    template: '<div class="form-control" contenteditable="true" ng-model="flow.text" ng-keyup="updateSearch($event)"></div>{{flow.text}}',
    controller: function ($scope) {
      $scope.flow = {
        //text: '<span class="underline"><i class="fa fa-twitter-square fa-lg"></i> twitter</span> '
        text: ''
      };
      var terms = [
        {
          listenFor: 'twitter',
          iconClass: 'fa fa-twitter-square fa-lg',
          _getTemplate: function(innerHtml, iconClass){
            return '<span class="underline"><i class="'+iconClass+'"></i> '+innerHtml+'</span>'
          },
          _contains: function (text, term) {
            return text.indexOf(term) != -1;
          },
          _shouldIconBeAdded: function (text) {
            // todo you can only have 1 identifified facebook
            return this._contains(text, this.listenFor) && !this._contains(text, this.iconClass)
          },
          inject: function (text) {
            if (this._shouldIconBeAdded(text)){
              var start = text.indexOf(this.listenFor);
              var end = start+this.listenFor.length;
              return text.slice(0, start) + this._getTemplate(this.listenFor, this.iconClass) + text.slice(end);
            } else{
              return text;
            }
          }
        }
      ];

      $scope.updateSearch = function($event){
        if ($event.keyCode === 32){
          $scope.flow.text = terms[0].inject($scope.flow.text);
        }
      }
    }
  }
});
