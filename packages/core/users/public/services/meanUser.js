'use strict';

angular.module('mean.users').factory('MeanUser', [
	function($resource) {
	return $resource('users/:userId', {
	  userId: '@_id'
	});
	}

]);
