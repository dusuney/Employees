(function(ng) {
    'use strict';

    ng.module('employees.employeeCart')
        .controller('employeeCartCtrl', EmployeeCartCtrl);

    EmployeeCartCtrl.$inject = ['$scope', '$http', '$routeParams', 'employee'];

    function EmployeeCartCtrl($scope, $http, $routeParams, employee) {

        $scope.employeeCart = employee.getEmployee();
        if (!$scope.employeeCart.photoFile) {
            $scope.employeeCart.photoFile = employee.getDefaultPhoto().data;
        }

        $scope.changePhoto = function() {
            $scope.isSelectPhoto = true;
        };

        $scope.loadedPhoto = {
            file: null
        };

        $scope.loadPhoto = function() {
            if (!$scope.loadedPhoto.file) {
                alert('Выберете фото');
                return;
            }

            $scope.employeeCart.photoFile = $scope.loadedPhoto.file;
            employee.changePhoto($scope.employeeCart.id, $scope.loadedPhoto.file);
        }
    }

})(angular);
