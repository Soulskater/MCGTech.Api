AppModule.controller('ForumCtrl', ['$scope', 'forumService', 'userService',
    function ($scope, $service, $user) {
        $scope.model = null;
        $scope.newPostText = "";

        $scope.init = function (model) {
            $scope.model = model;
        };

        $scope.clickPost = function () {
            $service.createPost($scope.newPostText, $user.getUser(), $scope.model.Identifier, function () {
                $service.getPosts($scope.model.Identifier, 0, 0, function (result) {
                    $scope.model.Posts = result;
                });
            });
        };
    }]);