angular.module('app')
.service('TermCtrl', function () {
  var data = {
    terms: []
  };

  var addTerm = function(term, iconClass){
    var term = {
      listenFor: term,
      iconClass: iconClass,
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
      //addSuggestion: function (triggerKeywords, suggestions, ){

      //}
    };
    data.terms.push(term);
  };


  var getTerms = function(){
    return data.terms;
  };

  return {
    getTerms: getTerms,
    addTerm: addTerm
  }
});
