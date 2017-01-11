angular.module('ammovarejo').controller('listUserCtrl', function($scope, users, $location){
    $scope.users = users.data;

    $scope.orderListBy = function( field ){
        $scope.objectOrder = field;
        $scope.objectOrderUp = !$scope.objectOrderUp;
    }

    $scope.exit = function(){
         $location.path('');
    }
});