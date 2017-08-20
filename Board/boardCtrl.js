angular.module("postBoard")
  .controller("boardCtrl", function ($scope, $mdDialog, $sce, $filter) {
    let posts = [
      {
        author: "eran",
        content: "<p>lorem Ipsum is simply dummy text of the printing and typesetting industry. lorem Ipsum is simply dummy text of the printing and typesetting industry</p><p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>",
        createdAt: '2016-04-12 03:12:11', uploadedImage: ''
      },
      { author: "eran 1", content: "lorem ipsum 1", createdAt: '1998-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/1/' },
      { author: "eran 2", content: "lorem ipsum 1", createdAt: '2003-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/2/' },
      { author: "eran 3", content: "lorem ipsum 1", createdAt: '2007-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/3/' },
      { author: "eran 4", content: "lorem ipsum 1", createdAt: '2006-04-12 03:12:11', uploadedImage: '' },
      { author: "eran 5", content: "lorem ipsum 1", createdAt: '2005-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/5/' },
      { author: "eran 6", content: "lorem ipsum 1", createdAt: '2013-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/6/' },
      { author: "eran 7", content: "lorem ipsum 1", createdAt: '1999-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/7/' },
      { author: "eran 8", content: "lorem ipsum 1", createdAt: '2001-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/8/' },
      { author: "eran 9", content: "lorem ipsum 1", createdAt: '2011-04-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/9/' },
      { author: "eran 10", content: "lorem ipsum 1", createdAt: '2011-05-12 03:12:11', uploadedImage: 'http://lorempixel.com/400/200/sports/10/' },
      { author: "eran 11", content: "lorem ipsum 1", createdAt: '2012-04-12 03:12:11', uploadedImage: '' }];

      //sort by date the most new post will be the first to show
    $scope.posts = posts.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    let excerptLength = 200;

    $scope.getExerpt = function (content) {
      const excerpt = (content.length > excerptLength) ? '...' : '';
      return $sce.trustAsHtml($filter('limitTo')(content, excerptLength) + excerpt);
    }

    function dialog(templateUrl, post) {
      $scope.post = post || null;
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        targetEvent: null,
        templateUrl: templateUrl,
        scope: $scope,
        preserveScope: true,
        locals: {
          post: $scope.post
        },
        controller: function DialogController($scope, $mdDialog, $sce, post) {
          $scope.post = post;
          $scope.closeDialog = function () {
            $mdDialog.hide();
          }
          $scope.submitPost = function (post) {
            post.uploadImage = $scope.fileInput[0].name;
            post.createdAt = Date.now();
            $scope.posts.unshift(post);
            $mdDialog.hide();
          }

          $scope.sanitaize = function (content) {
            return $sce.trustAsHtml(content);
          }
          $scope.fileInput = [{ name: '' }]
          $scope.$watch('fileInput', function () { });
          $scope.uploadImage = function () {
            document.getElementById('fileInput').click();
          }
        }
      });
    }

    $scope.readPost = function (post) {
      const url = '../Post/postDialog.html';
      dialog(url, post);
    }

    $scope.addPost = function () {
      const url = '../Post/addPostDialog.html';
      dialog(url);
    }
  })