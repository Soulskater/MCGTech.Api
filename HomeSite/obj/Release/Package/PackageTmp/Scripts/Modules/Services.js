//
//SERVICES
//
angular.module('homesite.service', [], function ($provide) {

    $provide.service('timerService', function () {
        return {
            start: new Date().getTime(),
            end: new Date().getTime(),
            reset: function () {
                this.start = new Date().getTime();
                this.end = new Date().getTime();
            },
            elapsed: function () {
                return this.end - this.start;
            },
            addListener: function (listener) {
                this.listeners.push(listener);
            },
            listeners: [],
            finish: function () {
                this.end = new Date().getTime();
                this.listeners.foreach(function (listener) {
                    listener();
                });
            }
        };
    });

    $provide.service('dialogService', ['$dialog', '$q', function ($dialog, $q) {
        var opts = {
            backdrop: true,
            keyboard: true,
            dialogFade: true,
            backdropFade: true,
            backdropClick: true,
            templateUrl: '/Content/Templates/Dialog.html',
            controller: ''
        };

        var openDialog = function (controller) {
            opts.controller = controller;
            var d = $dialog.dialog(opts);
            var deferred = $q.defer();
            d.open().then(function (result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        };
        return {
            openDialog: openDialog
        }
    }]);

    $provide.service('userService', function () {
        var loggedUser = null;

        return {
            getUser: function () { return loggedUser; },
            initUser: function (email) { loggedUser = email; }
        };
    });

    $provide.service('forumService', ['$http', '$q', function ($http, $q) {

        var getPosts = function (forumIdentifier, skip, top, callback) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/Forum/GetPosts',
                data: { ForumIdentifier: forumIdentifier, Skip: skip, Top: top }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (ex) {
                deferred.reject(ex);
            });
            return deferred.promise;
        }

        var createPost = function (text, forumIdentifier) {
            var post = {
                Created: moment().toDate(),
                PostText: text,
                ForumIdentifier: forumIdentifier
            }

            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/Forum/CreatePost',
                data: post
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (ex) {
                //or reject it if there's a problem.
                deferred.reject(ex);
            });
            return deferred.promise;
        }
        var createForum = function (name, description) {
            var post = {
                Created: moment().toDate(),
                Name: name,
                Description: description
            }
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/Forum/CreateForum',
                data: post
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                //or reject it if there's a problem.
                deferred.reject();
            });
            return deferred.promise;
        }

        return {
            getPosts: getPosts,
            createPost: createPost,
            createForum: createForum
        };
    }]);
});