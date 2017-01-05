angular.module('ammovarejo').factory('usersAPI', function($http){
	var _getUsers = function(){
		return $http.get('http://localhost:3412/users');
	}

	return {
		getUsers: _getUsers
	}
});