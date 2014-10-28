/**
 * Created by MCG on 2014.10.24..
 */
angular.module("MCGTech")
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/projects', {
                    templateUrl: 'src/features/projects/projects.html',
                    controller: 'ProjectsCtrl'
                }).
                when('/blog', {
                    templateUrl: 'src/features/blog/blog.html',
                    controller: 'AboutCtrl'
                }).
                when('/about', {
                    templateUrl: 'src/features/about/about.html',
                    controller: 'AboutCtrl'
                }).
                when('/home', {
                    templateUrl: 'src/features/home/home.html',
                    controller: 'HomeCtrl'
                }).
                otherwise({
                    redirectTo: '/home'
                });
        }]);