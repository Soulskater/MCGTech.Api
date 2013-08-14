AppModule.controller('ForumListCtrl', ['$scope', 'forumService', 'dialogService',
    function ($scope, $service, $dialog) {
        $scope.model = null;

        $scope.clickItem = function (forum) {
            //window.location.href = "/Forum?ID=" + forum.Identifier;
            $dialog.openDialog("NewForumCtrl");
        };

        $scope.init = function (model) {
            $scope.model = model;
        };

        $scope.posts = function () {
            
        };
    }]);