'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider)  {
    $routeProvider.
          when('/members', {templateUrl: '/app/partials/member-list.html', controller: 'MemberListCtrl'}).
          when('/members/:id', {templateUrl: '/app/partials/member-details.html', controller: 'MemberDetailCtrl'}).
          when('/members/:id/edit', {templateUrl: '/app/partials/member-edit.html', controller: 'MemberEditCtrl'}).
          when('/members/new', {templateUrl: '/app/partials/member-new.html', controller: 'MemberNewCtrl'})
          .otherwise({redirectTo: '/app/index.html'});
    $locationProvider.html5Mode(true);
  }]);
