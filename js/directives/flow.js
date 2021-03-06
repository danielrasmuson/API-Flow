angular.module('app')
.directive('flow', function (TermCtrl, $compile, successData) {
  return {
    restrict: 'E',
    templateUrl: '../../partials/flow.html',
    controller: function ($scope) {

      var twitter =  TermCtrl.addTerm('twitter', 'fa fa-twitter-square fa-lg');
      var facebook =  TermCtrl.addTerm('facebook', 'fa fa-facebook-square fa-lg');
      var dropbox =  TermCtrl.addTerm('dropbox', 'fa fa-dropbox fa-lg');
      var wordle =  TermCtrl.addTerm('wordle', 'fa fa-cloud fa-lg');
      var bestbuy =  TermCtrl.addTerm('best buy', 'fa fa-tag fa-lg');
      var bestbuy =  TermCtrl.addTerm('coinbase', 'fa fa-bitcoin fa-lg');

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

      $scope.flow = {
        text:'',
        terms: TermCtrl.getTerms(),
        suggestions: [
          {
            text: 'purchase best buy item with coinbase',
            type: 'append',
            suggestions: []
          },
          {
            text: 'order uber to next calendar event',
            type: 'append',
            suggestions: []
          },
          {
            text: 'upload facebook photo to dropbox',
            type: 'append',
            suggestions: []
          }],
        status: 'starting'
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
          if ($scope.flow.text.indexOf('Dropbox') !== -1 || $scope.flow.text.indexOf('launch') !== -1 || $scope.flow.text.indexOf('Best Buy') !== -1){
            $scope.flow.status = 'valid';
          }
        } else{
          $scope.flow.suggestions = [];
          $scope.flow.status = 'loading';
        }
      };


      $scope.openSuccess = function(){
        var data = successData.getData();
        if ($scope.flow.text.indexOf('Twitter') !== -1){
          data.url = 'TweetToWordle.html';
          data.visualUrl = 'http://www.apiflow.com/user/23423423/flow/98878897';
          data.show = true;
          setTimeout(function(){
            window.scrollBy(0, 10000)
          }, 100);
        } else if ($scope.flow.text.indexOf('Facebook') !== -1){
          data.url = 'FacebookToDropbox.html';
          data.visualUrl = 'http://www.apiflow.com/user/23423423/flow/238423423';
          data.show = true;
          setTimeout(function(){
            window.scrollBy(0, 10000)
          }, 100);
        } else if ($scope.flow.text.indexOf('Best Buy') !== -1){
          data.url = 'BestBuy.html';
          data.visualUrl = 'http://www.apiflow.com/user/23423423/flow/8346827678';
          data.show = true;
          setTimeout(function(){
            window.scrollBy(0, 10000)
          }, 100);
        }
      }
    }
  }
});

//angular.module('app').controller('ModalDemoCtrl', function ($scope, $modal, $log) {
//
//  $scope.items = ['item1', 'item2', 'item3'];
//
//  $scope.open = function () {
//    swal({
//      title: "Success!",
//      text: "",
//      type: "success",
//      showCancelButton: false,
//      timer: 1000
//    });
//    setTimeout(function(){
//      var modalInstance = $modal.open({
//      templateUrl: 'myModalContent.html',
//      controller: 'ModalInstanceCtrl',
//      resolve: {
//        items: function () {
//          return $scope.items;
//        }
//      }
//    });
//
//      modalInstance.result.then(function (selectedItem) {
//        $scope.selected = selectedItem;
//      }, function () {
//        $log.info('Modal dismissed at: ' + new Date());
//      });
//    }, 1300);
//
//  };
//});
//
//// Please note that $modalInstance represents a modal window (instance) dependency.
//// It is not the same as the $modal service used above.
//
//angular.module('app').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
//
//  $scope.items = items;
//  $scope.selected = {
//    item: $scope.items[0]
//  };
//
//  $scope.ok = function () {
//    $modalInstance.close($scope.selected.item);
//  };
//
//  $scope.cancel = function () {
//    $modalInstance.dismiss('cancel');
//  };
//});
