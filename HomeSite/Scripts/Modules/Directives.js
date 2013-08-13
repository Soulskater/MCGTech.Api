//
//DIRECTIVES
//
angular.module('homesite.directive', []).directive('slideIn', function () {
    return function (scope, elm, attrs) {
        //var item = scope.$eval(attrs.transitionMe);
        //var list = scope.$eval(attrs.list);

        $(elm).hide().slideDown();
    };
});