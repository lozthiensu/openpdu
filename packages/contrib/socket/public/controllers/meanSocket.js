'use strict';

angular.module('mean.socket').controller('MeanSocketController', ['$scope', '$state', 'Global', 'MeanSocket',
	function($scope, $state, Global, MeanSocket) {
		$scope.global = Global;
	    $scope.hasAuthorization = function(message) {
	      if (!message || !message.user) return false;
	      return message.user._id === $scope.global.user._id;
	    };
		$scope.package = {
			name: 'socket'
		};
	    $scope.ifAdmin = function(message) {
	      return $scope.global.isAdmin;
	    };
		$scope.socketAfterSend = function(message) {
			$scope.message.title = '';
		};

		$scope.socketAfterJoin = function(channel, messages) {
			$scope.activeChannel = channel;
			$scope.messages = messages;
		};

		$scope.socketAfterGet = function(message) {
			$scope.messages.push(message);
		};

		$scope.socketAfterGetChannels = function(channels) {
			$scope.channels = channels;
		};

		$scope.createNewChannel = function(channel) {
			$scope.activeChannel = channel;
			$scope.newChannel = '';
		};
  var trigger = $('button');
  
  function showTip() {
    if (! $('#tip').is(':visible')) {
      trigger.click();
    }
  }
  
  function hideTip() {
    if ($('#tip').is(':visible')) {
      trigger.click();
    }
  }
  
  trigger.mouseenter(showTip);
  
  $(document).on('mouseleave', '#tip', hideTip);
	}
])
.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
});
