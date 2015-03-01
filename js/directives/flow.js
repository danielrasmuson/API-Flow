angular.module('app')
.directive('flow', function (TermCtrl, $compile) {
  return {
    restrict: 'E',
    templateUrl: '../../partials/flow.html',
    controller: function ($scope) {

      var twitter =  TermCtrl.addTerm('twitter', 'fa fa-twitter-square fa-lg');
      var facebook =  TermCtrl.addTerm('facebook', 'fa fa-facebook-square fa-lg');
      var dropbox =  TermCtrl.addTerm('dropbox', 'fa fa-dropbox fa-lg');
      var wordle =  TermCtrl.addTerm('wordle', 'fa fa-cloud fa-lg');

      var dummySuggestions = [
        {
          text: 'test1'
        },
        {
          text: 'test2'
        }
      ];

      twitter.setSuggestions([
        {
          text: 'tweets',
          type: 'append',
          suggestions: [
            {
              text: 'containing',
              type: 'append',
              suggestions: [
                {
                  text: '#',
                  type: 'append',
                  suggestions: []
                }
              ]
            },
            {
              text: 'from',
              type: 'append'
            },
            {
              text: 'to',
              type: 'append'
            }
          ]
        },
        {
          text: 'users',
          type: 'append',
          suggestions: []
        },
        {
          text: 'trends',
          type: 'append',
          suggestions: []
        }
      ]);
      wordle.setSuggestions(dummySuggestions);
      facebook.setSuggestions([
        {
          text: 'photos',
          type: 'append',
          suggestions: []
        },
        {
          text: 'posts',
          type: 'append',
          suggestions: []
        },
        {
          text: 'uploads',
          type: 'append',
          suggestions: []
        },
        {
          text: 'photos',
          type: 'append',
          suggestions: []
        }
      ]);
      dropbox.setSuggestions(dummySuggestions);



      $scope.flow = {
        text:'',
        terms: TermCtrl.getTerms(),
        suggestions: [],
        status: 'starting'
      };

      $scope.toggleFlow = function () {
        if ($scope.flow.status === 'valid'){
          $scope.flow.status = 'invalid';
        } else{
          $scope.flow.status = 'valid';
        }
      };

      $scope.append = function (text) {
        $scope.flow.text += text+' ';
        //document.getElementById('flowbox').focus();
        refreshTerms();
        setTimeout(function (){
          setEndOfContenteditable(document.getElementById('flowbox'));
        }, 10)
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

      function refreshTerms(){
        var newText = $scope.flow.text;

        for (var i = 0; i < $scope.flow.terms.length; i++) {
          var term = $scope.flow.terms[i];
          if (term.shouldInject(newText)){
            newText = term.inject(newText);
            $scope.flow.suggestions = term.getSuggestions();
          }
        }

        if (newText !== $scope.flow.text){
          $scope.flow.text = newText;
          setTimeout(function () {
            setEndOfContenteditable(document.getElementById('flowbox'));
          },10);
        }
      }

      $scope.updateSearch = function($event){
        if ($event.keyCode === 32){
          refreshTerms();
          $scope.flow.status = 'valid';
        } else{
          $scope.flow.suggestions = [];
          $scope.flow.status = 'loading';
        }
      }
    }
  }
});
