angular.module('app')
.service('successData', function () {
  var data = {
    visualUrl: '',
    url: '',
    show: false
  };

  var getData = function(){
    return data;
  };
  return {
    getData: getData
  }

});