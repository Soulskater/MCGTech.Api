AppModule.controller('ForumListCtrl', ['$scope', 'forumService',
    function ($scope, $service) {
        $scope.model = null;

        $scope.clickItem = function (forum) {
            window.location.href = "/Forum?ID=" + forum.Identifier;
        };

        $scope.init = function (model) {
            $scope.model = model;
        };

        $scope.posts = function () {
            
        };
    }]);