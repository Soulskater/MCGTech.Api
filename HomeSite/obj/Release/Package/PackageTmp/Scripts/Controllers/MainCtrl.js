AppModule.controller('MainCtrl', ['$scope', 'userService',
    function ($scope, $user) {
        $scope.init = function (userIdentifier) {
            $user.initUser(userIdentifier);
        };

        $scope.clickPost = function () {
            console.log($user.getUser());
            //$service.createPost($scope.newPostText, );
        };
    }]);