angular.module('app')
.directive('flow', function (TermCtrl) {
  return {
    restrict: 'E',
    template: '<div class="form-control" contenteditable="true" ng-model="flow.text" ng-keyup="updateSearch($event)" id="flowbox"></div>{{flow.text}}',
    controller: function ($scope) {

      TermCtrl.addTerm('twitter', 'fa fa-twitter-square fa-lg');
      TermCtrl.addTerm('facebook', 'fa fa-facebook-square fa-lg');
      TermCtrl.addTerm('dropbox', 'fa fa-dropbox fa-lg');

      $scope.flow = {
        text: '',
        terms: TermCtrl.getTerms()
      };

      function setEndOfContenteditable(contentEditableElement){
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
          range = document.createRange();//Create a range (a range is a like the selection but invisible)
          range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
          range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
          selection = window.getSelection();//get the selection object (allows you to change selection)
          selection.removeAllRanges();//remove any selections already made
          selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        {
          range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
          range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
          range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
          range.select();//Select the range (make it the visible selection
        }
      }

      $scope.updateSearch = function($event){
        if ($event.keyCode === 32){
          var newText = $scope.flow.text;

          for (var i = 0; i < $scope.flow.terms.length; i++) {
            var term = $scope.flow.terms[i];
            newText = term.inject(newText);
          }

          if (newText !== $scope.flow.text){
            $scope.flow.text = newText;
            setTimeout(function () {
              setEndOfContenteditable(document.getElementById('flowbox'));
            },10);
          }
        }
      }
    }
  }
});
