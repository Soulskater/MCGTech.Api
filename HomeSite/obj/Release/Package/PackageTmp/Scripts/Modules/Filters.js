//
//Filters
//
angular.module('homesite.filter', [])
    .filter('html', function ($exceptionHandler) {
        return function (htmltext) {
            if (!angular.isString(htmltext)) {
                $exceptionHandler(null, "The parameter for html filter is invalid, it must be a string!");
            }
            return $('<div>').html(htmltext).text();
        };
    }).filter('convertToDate', function ($exceptionHandler) {
        return function (input) {
            if (!moment(input).isValid()) {
                $exceptionHandler(null, "Invalid date format!");
            }
            return moment(input).toDate();
        };
    });