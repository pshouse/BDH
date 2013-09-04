'use strict';

/* Controllers */

function MyCtrl1($scope, $http) {
      $http.get('http://localhost:3001/members').success(function(data) {
    $scope.members = data;
  });
 
  $scope.orderProp = 'name';
}

function MyCtrl2() {};

/* remove template's controller defs
angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function($scope, $http) {

  }])
  .controller('MyCtrl2', [function() {

  }]);
  */
