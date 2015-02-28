angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  //$urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl: "partials/home.html"
  })
  .state('explore', {
    url: "/explore",
    templateUrl: "partials/explore.html"
  })
  .state('add', {
    url: "/add",
    templateUrl: "partials/add.html"
  })
  .state('about', {
    url: "/about",
    templateUrl: "partials/about.html"
  })
  .state('account', {
    url: "/account",
    templateUrl: "partials/account.html"
  });
});
