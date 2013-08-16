AppModule.controller('NewForumCtrl',['$scope','dialog', 'forumService',
function ($scope, dialog, $service) {
    $scope.name = "";
    $scope.description = "";

    $scope.close = function () {
        dialog.close();
    };

    $scope.createForum = function () {
        $service.createForum($scope.name, $scope.description).then(function (data) {
            dialog.close(data);
        });
    };

}]);