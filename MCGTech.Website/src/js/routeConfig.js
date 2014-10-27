/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/projects', {
                    templateUrl: 'features/projects/projects.html',
                    controller: 'ProjectsCtrl'
                }).
                when('/blog', {
                    templateUrl: 'features/blog/blog.html',
                    controller: 'AboutCtrl'
                }).
                when('/about', {
                    templateUrl: 'features/about/about.html',
                    controller: 'AboutCtrl'
                }).
                when('/home', {
                    templateUrl: 'features/home/home.html',
                    controller: 'HomeCtrl'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]);