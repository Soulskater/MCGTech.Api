/**
 * Created by MCG on 2014.10.25..
 */
angular.module("MCGTech.Controls", [])
    .directive('menu', [function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            scope: {
                items: "="
            },
            template: '<span ng-repeat="item in items" class="font-s space l right" ng-class="{selected:selectedItem === item}"><a href={{item.url}}>{{item.name}}</a></span>',
            link: function ($scope, element, attrs) {
            }
        }
    }]);