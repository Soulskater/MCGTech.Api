//
//DIRECTIVES
//
angular.module('homesite.directive', []).directive('popup', function () {
    return function (scope, elm, attrs) {
        //var item = scope.$eval(attrs.transitionMe);
        //var list = scope.$eval(attrs.list);

        $(elm).hide().slideDown();
    };
});