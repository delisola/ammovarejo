angular.module('ammovarejo').controller('loginCtrl', function($scope, $location, users){
    $scope.singIn = function(){
        var wrongInput = 1;
        users.data.forEach(function(value, index){
            if(value.user == $scope.user &&
               value.password == $scope.pass){
                $location.path('/listUser');
                wrongInput = 0;   
            }
        });

        if(wrongInput === 1) {
            $('.alert').removeClass('hide');
        }
    }

    $scope.lostPassword = function(){
        $(".lost-password").hide();
        $(".the-password").removeClass("hide");
    }
});