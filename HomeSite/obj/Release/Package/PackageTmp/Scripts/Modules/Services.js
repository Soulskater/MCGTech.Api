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

    $provide.service('userService', function () {
        var loggedUser = null;

        return {
            getUser: function () { return loggedUser; },
            initUser: function (email) { loggedUser = email; }
        };
    });

    $provide.service('forumService', ['$http', '$q', function ($http, $q) {

        var getPosts = function (forumIdentifier, skip, top, callback) {
            $http({
                method: 'POST',
                url: '/Forum/GetPosts',
                data: { ForumIdentifier: forumIdentifier, Skip: skip, Top: top }
            }).success(function (data) {
                if (callback) callback(data);
            }).error(function () {
                //or reject it if there's a problem.
            });
        }

        var createPost = function (text, userIdentifier, forumIdentifier, callback) {
            var post = {
                Created: moment().toDate(),
                PostText: text,
                UserIdentifier: userIdentifier,
                ForumIdentifier: forumIdentifier
            }
            $http({
                method: 'POST',
                url: '/Forum/CreatePost',
                data: post
            }).success(function (data) {
                if (callback) callback();
            }).error(function () {
                //or reject it if there's a problem.
            });
        }

        return {
            getPosts: getPosts,
            createPost: createPost
        };
    }]);
});