(function(ng) {
    'use strict';

    ng.module('employees.employeesList')
        .controller('employeesListCtrl', EmployeesListCtrl);

    EmployeesListCtrl.$inject = ['$scope', '$http', '$routeParams'];

    function EmployeesListCtrl($scope, $http, $routeParams) {

        $scope.test = 'some text';
        //var self = this;

        $http.get('http://localhost:9000/data/data.json').then(function(response) {
            $scope.employeesList = response.data.employees.filter(function(employee) {
              return employee.department === $routeParams.departmentId;
            });
        });
    }

})(angular);
