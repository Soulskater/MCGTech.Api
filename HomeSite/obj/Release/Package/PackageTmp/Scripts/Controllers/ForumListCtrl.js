AppModule.controller('ForumListCtrl', ['$scope', 'forumService', 'dialogService',
    function ($scope, $service, $dialog) {
        $scope.model = null;

        $scope.clickItem = function (forum) {
            window.location.href = "/Forum?ID=" + forum.Identifier;
        };

        $scope.addNew = function (forum) {
            $dialog.openDialog("NewForumCtrl").then(function (data) {
                $scope.model = data;
            });
        };

        $scope.init = function (model) {
            $scope.model = model;
        };

        $scope.posts = function () {
            
        };
    }]);