(function(ng) {
    'use strict';

    ng.module('employees.employeeCart')
        .controller('employeeCartCtrl', EmployeeCartCtrl);

    EmployeeCartCtrl.$inject = ['$scope', '$http', '$routeParams', 'employee'];

    function EmployeeCartCtrl($scope, $http, $routeParams, employee) {

        employee.getEmployee().then(function(result) {
            //console.log(result);
            $scope.employeeCart = result;
        });

        employee.getDefaultPhoto().then(function(result) {
            //console.log(result);
            $scope.photos = result;
        });

        employee.changePhoto();
        employee.getPhoto();


    }

})(angular);
