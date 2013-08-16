AppModule.controller('ForumCtrl', ['$scope', 'forumService', 'userService',
    function ($scope, $service, $user) {
        $scope.model = null;
        $scope.newPostText = "";

        $scope.init = function (model) {
            $scope.model = model;
        };

        $scope.clickPost = function () {
            $service.createPost($scope.newPostText, $scope.model.Identifier).then(function (data) {
                $scope.model.Posts = data;
                $scope.newPostText = "";
            });
        };
    }]);