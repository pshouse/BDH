'use strict';

/* Controllers */

function MemberListCtrl($scope, $http) {
    $http.get('/api/members').success(function(data) {
    $scope.members = data;
    
  });
 
  $scope.orderProp = 'name';
}

function MemberDetailCtrl($scope, $routeParams, $http) {
    $scope.id =  $routeParams.id;
    $http.get('/api/members/'+$scope.id).success(function(data) {
    $scope.member_details = data;
    });
}

/* remove template's controller defs
angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function($scope, $http) {

  }])
  .controller('MyCtrl2', [function() {

  }]);
  */
