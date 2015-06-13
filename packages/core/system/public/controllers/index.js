'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
  function($scope, Global) {
    $scope.global = Global;

    $scope.dangnhap = function(system) {
      if (!$scope.global.user._id) return false;
      return $scope.global.user._id;
    };
    $scope.sites = {
      'pducoder':{
        'name':'pdu Coder',
        'text':'Trang web ứng dụng cho việc giảng dạy, học hỏi và trao đổi kiến thức, giao lưu giữa các giảng viên, sinh viên khoa công nghệ thông tin.',
        'author':'Mr.Quang Bão',
        'link':'http://pducoder.net',
        'image':'/theme/assets/img/pducoder.png'
      }
    };

    $scope.$watch(function () {
      for (var i = 0; i < $scope.sites.length; i+=1) {
        if ($scope.sites[i].active) {
          return $scope.sites[i];
        }
      }
    }, function (currentSlide, previousSlide) {
      if (currentSlide !== previousSlide) {
        console.log('currentSlide:', currentSlide);
      }
    });
  }
]);
