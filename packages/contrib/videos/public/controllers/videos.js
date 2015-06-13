'use strict';

angular.module('mean.videos', ['angularUtils.directives.dirPagination']).controller('VideosController', ['$scope', '$stateParams', '$location', 'Global', 'Videos', '$state',
  function($scope, $stateParams, $location, Global, Videos, $state) {
    $scope.global = Global;
    $scope.hasAuthorization = function(video) {
      if (!video && !video.user) return false;
      return $scope.global.isAdmin || video.user._id === $scope.global.user._id;
    };
    $scope.createVideo = function() {
      $state.go('create video');
    };
    $scope.Youtube = function(video) {
      return  video.linkYoutube === 'true';
    };
    $scope.nonYoutube = function(video) {
      return  video.linkYoutube === 'false';
    };
    $scope.reqFile = function(video) {
      return  video.reqFile === 'true';
    };
    $scope.create = function(isValid) {
      if (this.url.split('/watch?v=')[0] === 'https://www.youtube.com'){
        this.linkYoutube = 'true'; 
        this.url= 'https://www.youtube.com/embed/'+ this.url.split('/watch?v=')[1] + '?modestbranding=1&cc_load_policy=1&theme=light&color=white&autohide=1';
      }
      else this.linkYoutube = 'false';
       
      if (isValid) {
        var video = new Videos({
          title: this.title,
          url: this.url,
          linkYoutube: this.linkYoutube,
          reqFile: this.reqFile,
          content: this.content
        });
        video.$save(function(response) {
          $location.path('videos/' + response._id);
        });

        this.title = '';
        this.url = '';
        this.linkYoutube = '';
        this.reqFile = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(video) {
      if (video) {
        video.$remove(function(response) {
          for (var i in $scope.videos) {
            if ($scope.videos[i] === video) {
	      $scope.videos.splice(i,1);
            }
          }
          $location.path('videos');
        });
      } else {
        $scope.video.$remove(function(response) {
          $location.path('videos');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var video = $scope.video;
        if(!video.updated) {
          video.updated = [];
	       }
        video.updated.push(new Date().getTime());

        video.$update(function() {
          $location.path('videos/' + video._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Videos.query(function(videos) {

        $scope.currentPage = 1;
        $scope.pageSize = 4;

        $scope.videos = videos;
      });
    };

    $scope.findOne = function() {
      Videos.get({
        videoId: $stateParams.videoId
      }, function(video) {
        $scope.video = video;
      });
    };
  }
])
.filter("trustAsHtml", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}])
.filter("trustAsResourceUrl", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsResourceUrl(htmlCode);
  }
}])
.directive('ckEditor', [function () {
        return {
            require: '?ngModel',
            restrict: 'C',
            link: function (scope, elm, attr, model) {
                var isReady = false;
                var data = [];
                var ck = CKEDITOR.replace(elm[0]);

                function setData() {
                    if (!data.length) { return; }

                    var d = data.splice(0, 1);
                    ck.setData(d[0] || '<span></span>', function () {
                        setData();
                        isReady = true;
                    });
                }

                ck.on('instanceReady', function (e) {
                    if (model) { setData(); }
                });

                elm.bind('$destroy', function () {
                    ck.destroy(false);
                });

                if (model) {
                    ck.on('change', function () {
                        scope.$apply(function () {
                            var data = ck.getData();
                            if (data == '<span></span>') {
                                data = null;
                            }
                            model.$setViewValue(data);
                        });
                    });

                    model.$render = function (value) {
                        if (model.$viewValue === undefined) {
                            model.$setViewValue(null);
                            model.$viewValue = null;
                        }

                        data.push(model.$viewValue);

                        if (isReady) {
                            isReady = false;
                            setData();
                        }
                    };
                }

            }
        };
    }])
    ;
