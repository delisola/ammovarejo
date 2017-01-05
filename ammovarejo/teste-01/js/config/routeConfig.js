angular.module('ammovarejo').config(function($routeProvider){
    $routeProvider.when("/login", {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        resolve: {
            users: function(usersAPI){
                return usersAPI.getUsers();
            }
        }
    });

    $routeProvider.when('/listUser',{
        templateUrl: 'views/listUser.html',
        controller: 'listUserCtrl',
        resolve: {
            users: function(usersAPI){
                return usersAPI.getUsers();
            }
        }
    });

    $routeProvider.otherwise({
        templateUrl: 'views/login.html',
        controller: 'loginCtrl',
        resolve: {
            users: function(usersAPI){
                return usersAPI.getUsers();
            }
        }
    });
});