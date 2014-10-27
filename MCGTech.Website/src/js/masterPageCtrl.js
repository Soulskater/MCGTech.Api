/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .controller("MasterPageCtrl", ['$scope', '$location', function ($scope, $location) {
        $scope.menuList=[
            { name: "Projects", url:"#/projects"},
            { name: "Blog", url:"#/blog"},
            { name: "About", url:"#/about"}
        ];

        $scope.go = function ( path ) {
            $location.path( path );
        };
    }]);