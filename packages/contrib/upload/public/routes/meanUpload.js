'use strict';

angular.module('mean.upload').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('Mean upload help page', {
            url: '/upload',
            templateUrl: 'upload/views/index.html'
        });
    }
]);
