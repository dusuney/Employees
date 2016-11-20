(function(ng) {
    'use strict';

    ng.module('employees.employeesList')
        .controller('employeesListCtrl', EmployeesListCtrl);

    EmployeesListCtrl.$inject = ['$scope', '$http', '$routeParams'];

    function EmployeesListCtrl($scope, $http, $routeParams) {

      var employees = ng.fromJson(localStorage.employees);
      
      $scope.employeesList = employees.filter(function(employee) {
        return employee.department === $routeParams.departmentId;
      });
    }

})(angular);
