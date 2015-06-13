'use strict';

/* jshint -W098 */
angular.module('mean.hoithao').controller('HoithaoController', ['$scope', 'Global', 'Hoithao',
  function($scope, Global, Hoithao) {
    $scope.global = Global;
    $scope.package = {
      name: 'hoithao'
    };
  }
]);
