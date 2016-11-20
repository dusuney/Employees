(function(ng) {
    'use strict';

    ng.module('employees.departmentsList')
        .controller('departmentsListCtrl', DepartmentsListCtrl);

    DepartmentsListCtrl.$inject = ['$scope', '$http'];

    function DepartmentsListCtrl($scope, $http) {

        $scope.test = 'some text';
        //var self = this;

        $http.get('data/data.json').then(function(response) {
            $scope.departments = response.data.departments;
        });
    }

})(angular);
