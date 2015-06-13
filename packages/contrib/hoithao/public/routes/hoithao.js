'use strict';

angular.module('mean.hoithao').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('hoithao example page', {
      url: '/hoithao',
      templateUrl: 'hoithao/views/index.html'
    });
  }
]);
