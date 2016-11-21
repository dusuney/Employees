(function(ng) {
    'use strict';

    ng.module('employees.departmentsList')
        .controller('departmentsListCtrl', DepartmentsListCtrl);

    DepartmentsListCtrl.$inject = ['$scope', '$http'];

    function DepartmentsListCtrl($scope, $http) {

         $scope.departments = ng.fromJson(localStorage.departments);
    }

})(angular);
